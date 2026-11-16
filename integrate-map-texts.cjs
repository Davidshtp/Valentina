const fs=require('node:fs'),path=require('node:path');
const source=JSON.parse(fs.readFileSync(path.join(__dirname,'textos-del-mapa-valentina.json'),'utf8').replace(/^\uFEFF/,''));
const keys=['sectionLabel','heading','headingAccent','introduction','handwritten','originLabel','originTitle','originText','travelTitle','travelText','arrivalLabel','popayanTitle','popayanText','medellinTitle','medellinText','mapDedication','chapterTransition'];
if(source.project!=='cumpleanos-valentina-map'||source.version!==1||!source.texts)throw Error('Unexpected map text format');
const texts={};for(const key of keys){if(typeof source.texts[key]!=='string')throw Error('Missing text: '+key);texts[key]=source.texts[key];}
fs.writeFileSync(path.join(__dirname,'para-ti/journey-content.js'),'// Textos personales del mapa. No incluye contexto privado.\nwindow.JOURNEY_TEXTS = '+JSON.stringify(texts,null,2)+';\n');
console.log('Imported 17 public map texts.');
