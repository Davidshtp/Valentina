# Para Valentina — divertido y colorido

## Música incorporada

El reproductor incluye cuatro MP3 proporcionados por el autor, en este orden: Sparks (Coldplay), Alguien Como Tú (Jósean Log), Enamorado tuyo y K. (Cigarettes After Sex). Las copias web están en `assets/musica`; los originales permanecen en la carpeta raíz `musica`. `integrate-music.cjs` copia los archivos y genera `music-config.js`.

La página intenta iniciar la música al cargar, con volumen inicial de 28 %. Si el navegador bloquea el sonido automático, arranca con la primera interacción, incluido tocar «Abre tu regalo», sin buscar el botón de música. Una pausa manual se respeta y otros clics no vuelven a activarla. Sigue al recorrer las secciones y la lista se repite al terminar. Tiene pausa, volumen y siguiente canción. Se pausa mientras se reproduce un video y se reanuda al pausarlo o cerrarlo; si el navegador bloquea la reanudación, pide tocar el botón. En algunos teléfonos el volumen se controla desde los botones físicos.

Verificado en Edge: decodificación de las cuatro pistas, reproducción al tocar, continuidad al desplazarse, pausa/reanudación con video, cambio de pista, repetición, volumen y controles a 320/390/1440 px. Falta una prueba física en el teléfono final.

## Textos personales del mapa

Los 17 textos p?blicos del archivo ra?z `textos-del-mapa-valentina.json` se incorporaron sin reescribirlos. `journey-content.js` centraliza presentaci?n, mensajes del recorrido, llegada y regreso a Mocoa. Las notas privadas no se publican. El editor temporal y su enlace fueron retirados. `integrate-map-texts.cjs` permite regenerar el contenido validando sus campos.

## Textos personales incorporados

Se incorporaron los títulos y descripciones de los 32 recuerdos desde `../textos-para-valentina.json`, respetando exactamente las palabras del autor. El JSON original permanece en la raíz como respaldo; no se incluye en la carpeta publicable. Las notas `context` no se muestran ni se incorporan al JavaScript de la página.

Se retiraron el editor temporal y su enlace. `integrate-memories.cjs` valida IDs, rutas y tipos, e importa únicamente `title` y `description` al regenerar el álbum para evitar perder estos textos.


El motivo central es su cumpleaños: bienvenida «Feliz cumpleaños, Valentina», dedicatorias para celebrar su vida y un pastel ilustrado al final. Tocar la vela la apaga y revela el saludo final; puede volver a encenderse. No se asume su edad ni una fecha de cumpleaños. La carta principal ya contiene la versión revisada del texto del autor: se corrigió la ortografía, se conectaron las ideas y se amplió moderadamente el contexto. El original y `carta principal revisada.txt` permanecen en la raíz. `integrate-main-letter.cjs` actualiza la carta y su firma desde la versión revisada.

## Reestructuración del cuento

El recorrido ahora pasa por portada y paisaje, recuerdos, viajes desde Mocoa, carta larga, cartas cortas y pequeños juegos. La estética de acuarela se extiende al mapa, fondos de papel y cierre. En móvil, los controles de viaje se sitúan debajo del mapa.

`journey.js` anima por separado Mocoa–Popayán y Mocoa–Medellín, permite interrumpir/repetir el recorrido, regresar a Mocoa y respeta movimiento reducido. Los caminos son simbólicos: no se inventan carreteras ni escalas. Coordenadas, procedencia de la silueta y prompt de la nueva ilustración en `assets/MAPA-Y-FUENTES.md`.

Ambientación actual: cuaderno de cuento con paleta de bosque y papel crema. Portada ilustrada con Totoro, Snoopy y un castillo ambulante; dibujos SVG locales de Totoro, Snoopy, gatita con lazo, osito y corazones en sobres y cartas. `cuento.css` contiene esta capa visual y `decorations.js` los dibujos. La portada usa un JPEG de aproximadamente 497 KB; el original y el prompt de generación están en `assets/`.

Abre `index.html` en un navegador. Funciona sin instalar paquetes ni compilar. Fuentes externas opcionales; hay fuentes locales alternativas.

## Qué puedes hacer

- Deslizar recuerdos horizontalmente o usar las flechas.
- Tocar imágenes para ampliarlas y reproducir videos configurados con controles.
- Abrir tres sobres con cartas.
- Descubrir mensajes en la flor, el tiquete y la nota verde.
- Dibujar con el dedo o ratón, borrar y descargar el dibujo como PNG.
- Lanzar una lluvia de corazones.

## Fotos y videos incorporados

Incluye los 32 archivos de la carpeta raíz `fotos`: 25 fotografías y 7 videos. Los originales permanecen intactos. `assets/recuerdos` contiene copias JPG, miniaturas y videos MP4 H.264/AAC; `manifest.json` relaciona cada copia con su archivo original. Las copias suman aproximadamente 32 MB frente a 119 MB de originales y se cargan según se necesitan. Los videos conservan su duración; no se recortaron las fotos ni se cambiaron sus contenidos.

`memories.js` contiene el orden, textos personales y rutas del álbum real y se carga después de `content.js`. `content.js` conserva la carta principal revisada, las cartas cortas y los secretos. Las cartas cortas siguen siendo borradores. No incluye música ni publicación remota.

Puedes filtrar por fotos o videos y recorrer los recuerdos desde el visor con flechas o teclado. Las fotos se muestran completas. Comprobado en Edge a 320/390 px y 1440 px: todas las imágenes cargan, los siete videos decodifican un fotograma y funcionan filtros, visor, cartas, mapa y vela. Queda pendiente probarlo en el teléfono físico de Valentina.

Para regenerar los archivos, `prepare-memories.py` e `integrate-memories.cjs` viven en la raíz. Las herramientas de conversión están en `.media-tools` y no son necesarias para abrir ni publicar la carpeta `para-ti`. El procesamiento fue local; no se enviaron las fotos a un servicio externo.
