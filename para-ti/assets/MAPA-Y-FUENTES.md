# Mapa ilustrado

El mapa muestra dos conexiones independientes: Mocoa–Popayán y Mocoa–Medellín. No afirma un trayecto continuo entre las tres ciudades, carreteras, escalas, fechas, medio de transporte ni distancias. El paisaje es una ilustración de ambiente, no una representación topográfica. Las posiciones relativas aproximadas siguen latitud/longitud; la silueta de Colombia se muestra en un recuadro de contexto.

Coordenadas aproximadas: Mocoa 1.153, -76.652; Popayán 2.444, -76.614; Medellín 6.252, -75.564.

Fuentes de contexto geográfico:
- Mocoa: https://www.geodatos.net/coordenadas/colombia/mocoa
- Popayán: https://www.geonames.org/3671916/popayan.html
- Medellín: https://es.wikipedia.org/wiki/Medell%C3%ADn
- Silueta: Natural Earth, https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson
- Dominio público del mapa: https://www.naturalearthdata.com/about/terms-of-use/

La silueta está integrada localmente, sin mapas de terceros ni claves durante la visita. `build-map.cjs` genera su versión JS a partir del GeoJSON guardado.

Paisaje: herramienta integrada image_gen, con picnic-de-cuento.png como referencia de estilo. Original: paisaje-andino.png. Versión web: paisaje-andino-web.jpg.

Prompt:

Use case: illustration-story. Create a new portrait 2:3 watercolor illustrated map background matching the attached reference's warm gouache, paper grain, soft anime countryside, detailed painterly vegetation and pastel sunlight. This is a background for an interactive romantic travel map in Colombia; no characters needed. Birds-eye illustrated Andean landscape: narrow mountain ridges, little terracotta-roof houses, eucalyptus and tropical forests, rivers, pale green meadows, tiny pink and cream flowers at the outer corners. Quiet pale parchment and light sage area covering central 60% for SVG geographic paths and city labels to be added by code. Mountains and tiny houses distributed around the outer edges, not across center. Elegant hand-painted field journal map, warm cream paper at edges blending into #f5f0df. No text, no labels, no drawn routes, no pins, no compass, no typography, no borders, no infographic. Full bleed richly illustrated dreamy landscape viewed from high above, keep contrast low in central area.
