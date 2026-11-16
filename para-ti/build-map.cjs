// Preparation only: no network, API key or runtime map dependency.
const fs=require('node:fs');
const path=require('node:path');
const geometry=JSON.parse(fs.readFileSync(path.join(__dirname,'assets/colombia-outline.json'),'utf8'));
const polygons=geometry.type==='Polygon'?[geometry.coordinates]:geometry.coordinates;
const outline=polygons.map(polygon=>polygon.map(ring=>ring.map(([lon,lat],i)=>(i?'L':'M')+((lon+79)*6.2).toFixed(2)+' '+((13-lat)*6.2).toFixed(2)).join(' ')+'Z').join(' ')).join(' ');
fs.writeFileSync(path.join(__dirname,'assets/colombia-map.js'),'// Mainland silhouette from Natural Earth (public domain).\nwindow.COLOMBIA_OUTLINE='+JSON.stringify(outline)+';\n');
console.log('Prepared local Colombia silhouette.');
