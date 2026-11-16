const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'para-ti');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'assets/recuerdos/manifest.json'),'utf8'));
const titles={
 'foto-01':['Hasta entrenar es mejor contigo.','Foto de ustedes sentados juntos frente a un espejo del gimnasio.'],
 'foto-02':['Nosotros, así de cerquita.','Foto de ustedes juntos frente a un espejo.'],
 'foto-03':['Esa carita tuya.','Retrato de Valentina al aire libre, rodeada de vegetación.'],
 'foto-04':['Un ratito juntos.','Selfie de ustedes recostados juntos.'],
 'foto-05':['Las pequeñas cosas saben mejor.','Una mesa con desayuno frente a un paisaje verde.'],
 'foto-06':['Mi equipo favorito.','Foto de ustedes posando juntos frente al espejo del gimnasio.'],
 'foto-07':['De tu mano.','Sus manos juntas con pequeños anillos de colores.'],
 'foto-08':['Guardarnos en una foto.','Un abrazo frente al espejo.'],
 'foto-09':['Donde quiero estar.','Ustedes abrazados frente al espejo.'],
 'foto-10':['Un beso más.','Un beso frente al espejo.'],
 'foto-11':['También en los días tranquilos.','Un momento de descanso abrazando un peluche.'],
 'foto-12':['Pequeñas promesas.','Una mano con un anillo y Valentina al fondo, entre árboles.'],
 'foto-13':['Una noche para guardar.','Un abrazo de noche junto a pequeñas luces encendidas.'],
 'foto-14':['Mi parte favorita.','Un beso durante una salida juntos.'],
 'foto-15':['Flores para ti.','Valentina recibiendo un ramo de flores.'],
 'foto-16':['Un beso y una foto.','Ustedes frente al espejo, compartiendo un beso.'],
 'foto-17':['Que el mundo espere un poquito.','Selfie de ustedes recostados al aire libre.'],
 'foto-18':['Siempre me acercaría a ti.','Un abrazo y un beso junto a una cancha.'],
 'foto-19':['Parar a mirar.','Un paisaje de montañas verdes desde un mirador.'],
 'foto-20':['Tú, yo y otra aventura.','Selfie de ustedes al aire libre.'],
 'foto-21':['Muy nosotros.','Selfie juguetona de ustedes frente al espejo.'],
 'foto-22':['Mi lugar favorito.','Un abrazo de ustedes frente al espejo.'],
 'foto-23':['Otra foto para el corazón.','Foto de ustedes juntos frente a un espejo iluminado.'],
 'foto-24':['Listos para salir.','Foto juntos sobre una moto, con cascos.'],
 'foto-25':['Contigo, vamos.','Otra foto de ustedes sobre una moto, con cascos.'],
 'video-01':['Un detalle para recordar.','Un momento en video con una mesa preparada y globos.'],
 'video-02':['Un pedacito de nosotros.','Un video de un momento juntos.'],
 'video-03':['A esto siempre le daría replay.','Un video de ustedes juntos frente al espejo.'],
 'video-04':['Y seguimos sumando aventuras.','Un video juntos usando cascos.'],
 'video-05':['El mundo también tiene estas vistas.','Un paisaje de agua, montañas y cielo.'],
 'video-06':['Guardar también el camino.','Un paisaje de montañas al atardecer durante un recorrido.'],
 'video-07':['De paseo.','Un video de un paseo al aire libre.']
};
const order=['foto-22','foto-15','foto-14','video-03','foto-23','foto-06','foto-07','foto-13','video-01','foto-02','foto-03','foto-21','foto-01','video-02','foto-08','foto-09','foto-10','foto-16','foto-18','video-04','foto-24','foto-25','foto-20','foto-12','foto-17','foto-04','foto-05','foto-19','video-05','video-06','video-07','foto-11'];
if(new Set(order).size!==manifest.length)throw Error('Missing or repeated memories');
const records=order.map(id=>{const original=manifest.find(item=>item.id===id);if(!original)throw Error('Missing '+id);const {original:filename,...record}=original;return {...record,title:titles[id][0],alt:titles[id][1],description:'',tag:original.type==='video'?'DALE PLAY':'UN RECUERDO NUESTRO',color:'green',art:original.type==='video'?'video':'flowers'};});
// Only public fields are imported. Context and all other JSON fields stay private.
const notesPath=path.join(__dirname,'textos-para-valentina.json');
if(fs.existsSync(notesPath)){
 const notes=JSON.parse(fs.readFileSync(notesPath,'utf8').replace(/^\uFEFF/,''));
 if(notes.project!=='cumpleanos-valentina'||notes.version!==1||!Array.isArray(notes.memories))throw Error('Invalid notes format');
 const seen=new Set();
 for(const note of notes.memories){
  const record=records.find(item=>item.id===note.id);
  if(!record||seen.has(note.id)||record.src!==note.src||record.type!==note.type||typeof note.title!=='string'||typeof note.description!=='string')throw Error('Invalid or duplicated note: '+note.id);
  seen.add(note.id);record.title=note.title;record.description=note.description;
 }
 console.log('Applied '+seen.size+' personal texts; private context excluded.');
}
for(const record of records)for(const key of ['src','thumbnail','poster'])if(record[key]&&!fs.existsSync(path.join(root,record[key])))throw Error('Missing '+record[key]);
fs.writeFileSync(path.join(root,'memories.js'),'// Copias web locales. Originales intactos en /fotos.\nwindow.GIFT.memories = '+JSON.stringify(records,null,2)+';\n');
console.log('Integrated '+records.length+' real memories.');
