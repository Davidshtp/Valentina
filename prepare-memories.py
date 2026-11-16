"""Create browser-friendly derivatives; never modify the original fotos folder."""
from pathlib import Path
import sys, json, subprocess
ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT / '.media-tools'))
from PIL import Image, ImageOps, ImageDraw
import pillow_heif, imageio_ffmpeg
pillow_heif.register_heif_opener()
DEST = ROOT / 'para-ti/assets/recuerdos'
DEST.mkdir(parents=True, exist_ok=True)
QA = ROOT / '.qa-cuento'
QA.mkdir(exist_ok=True)
records=[]
files=sorted((ROOT/'fotos').iterdir(), key=lambda p:p.name.lower())
images=[p for p in files if p.suffix.lower() in ('.jpg','.jpeg','.heic','.png')]
videos=[p for p in files if p.suffix.lower() in ('.mp4','.mov')]
for i, source in enumerate(images,1):
    name=f'foto-{i:02d}'
    with Image.open(source) as opened:
        img=ImageOps.exif_transpose(opened).convert('RGB')
        dimensions=img.size
        img.thumbnail((1600,1600),Image.Resampling.LANCZOS)
        img.save(DEST/(name+'.jpg'),quality=86,optimize=True)
        img.thumbnail((600,600),Image.Resampling.LANCZOS)
        img.save(DEST/(name+'-mini.jpg'),quality=80,optimize=True)
    records.append(dict(id=name,type='image',original=source.name,src=f'assets/recuerdos/{name}.jpg',thumbnail=f'assets/recuerdos/{name}-mini.jpg',width=dimensions[0],height=dimensions[1]))
    print('PHOTO',name,dimensions,flush=True)
sheet=Image.new('RGB',(1000,((len(images)+4)//5)*245),'#faf5e6')
draw=ImageDraw.Draw(sheet)
for i,record in enumerate(records):
    with Image.open(ROOT/'para-ti'/record['thumbnail']) as img:
        img.thumbnail((190,215));x=(i%5)*200+(200-img.width)//2;y=(i//5)*245
        sheet.paste(img,(x,y))
    draw.text(((i%5)*200+8,(i//5)*245+219),record['id'],fill='#333333')
sheet.save(QA/'fotos-contacto.jpg',quality=88)
print('PHOTO CONTACT SHEET READY',flush=True)
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
for i,source in enumerate(videos,1):
    name=f'video-{i:02d}'
    probe=subprocess.run([ffmpeg,'-hide_banner','-i',str(source)],capture_output=True,text=True,encoding='utf-8',errors='replace')
    (QA/(name+'-info.txt')).write_text(probe.stderr,encoding='utf-8')
    filters="scale=w='min(1280,iw)':h='min(1280,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2,setsar=1"
    # Apple HDR clips need tone mapping for consistent browser SDR display.
    if 'bt2020' in probe.stderr and ('arib-std-b67' in probe.stderr or 'smpte2084' in probe.stderr):
        filters="zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,"+filters
    command=[ffmpeg,'-y','-hide_banner','-loglevel','error','-i',str(source),'-map','0:v:0','-map','0:a:0?','-vf',filters,'-c:v','libx264','-preset','fast','-crf','24','-pix_fmt','yuv420p','-r','30','-c:a','aac','-b:a','128k','-movflags','+faststart','-map_metadata','-1',str(DEST/(name+'.mp4'))]
    result=subprocess.run(command,capture_output=True,text=True,encoding='utf-8',errors='replace')
    if result.returncode:raise RuntimeError(source.name+': '+result.stderr)
    poster=DEST/(name+'-poster.jpg')
    subprocess.run([ffmpeg,'-y','-hide_banner','-loglevel','error','-ss','0.1','-i',str(DEST/(name+'.mp4')),'-frames:v','1','-vf',"scale=w='min(700,iw)':h='min(700,ih)':force_original_aspect_ratio=decrease",str(poster)],check=True)
    with Image.open(poster) as img: dimensions=img.size
    records.append(dict(id=name,type='video',original=source.name,src=f'assets/recuerdos/{name}.mp4',poster=f'assets/recuerdos/{name}-poster.jpg',width=dimensions[0],height=dimensions[1]))
    print('VIDEO',name,round((DEST/(name+'.mp4')).stat().st_size/1048576,2),'MB',flush=True)
video_records=[r for r in records if r['type']=='video']
sheet=Image.new('RGB',(1000,490),'#faf5e6');draw=ImageDraw.Draw(sheet)
for i,record in enumerate(video_records):
    with Image.open(ROOT/'para-ti'/record['poster']) as img:
        img.thumbnail((190,215));sheet.paste(img,((i%5)*200+(200-img.width)//2,(i//5)*245))
    draw.text(((i%5)*200+8,(i//5)*245+219),record['id'],fill='#333333')
sheet.save(QA/'videos-contacto.jpg',quality=88)
(DEST/'manifest.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
print('DONE',len(records),'memories',flush=True)
