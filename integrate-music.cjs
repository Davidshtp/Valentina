const fs=require('node:fs'),path=require('node:path');
const source=path.join(__dirname,'musica'),dest=path.join(__dirname,'para-ti/assets/musica');
const tracks=[
 {file:'Sparks.mp3',name:'sparks.mp3',title:'Sparks',artist:'Coldplay'},
 {file:'Jósean Log - Alguien Como Tú.mp3',name:'alguien-como-tu.mp3',title:'Alguien Como Tú',artist:'Jósean Log'},
 {file:'Enamorado tuyo.mp3',name:'enamorado-tuyo.mp3',title:'Enamorado tuyo',artist:''},
 {file:'Cigarettes After Sex - K. (Sub. Español + Lyrics).mp3',name:'k.mp3',title:'K.',artist:'Cigarettes After Sex'}
];
for(const track of tracks)if(!fs.existsSync(path.join(source,track.file)))throw Error('Missing audio: '+track.file);
fs.mkdirSync(dest,{recursive:true});
for(const track of tracks)fs.copyFileSync(path.join(source,track.file),path.join(dest,track.name));
const config={volume:.28,tracks:tracks.map(({name,title,artist})=>({src:'assets/musica/'+name,title,artist}))};
fs.writeFileSync(path.join(__dirname,'para-ti/music-config.js'),'// Archivos proporcionados por el autor. Inicio automático o al primer toque según el navegador.\nwindow.GIFT_MUSIC = '+JSON.stringify(config,null,2)+';\n');
console.log('Connected four local songs. Original files preserved.');
