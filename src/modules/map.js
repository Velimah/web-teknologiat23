//map test
mapboxgl.accessToken = 'pk.eyJ1IjoiaWxra2FtdGsiLCJhIjoiY2szZ2Z3ZGtzMDFkZTNpcDh2aGFndmg2dyJ9.CjPq5lceUKhfdWD3oqhjwg';

const map1 = new mapboxgl.Map({
  container: 'map1', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [24, 60], // starting position [lng, lat]
  zoom: 13, // starting zoom
});
const map2 = new mapboxgl.Map({
  container: 'map2', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [24, 60], // starting position [lng, lat]
  zoom: 13, // starting zoom
});
const map3 = new mapboxgl.Map({
  container: 'map3', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [24, 60], // starting position [lng, lat]
  zoom: 13, // starting zoom
});
const map4 = new mapboxgl.Map({
  container: 'map4', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [24, 60], // starting position [lng, lat]
  zoom: 13, // starting zoom
});

const addMarker = (coords, i, latitude, longitude) => {
  if (i === 1) {
    map1.setCenter(coords);
    const marker = new mapboxgl.Marker().setLngLat(coords).addTo(map1);
    const marker2 = new mapboxgl.Marker({
      color: '#ff0000',
      scale: '0.5',
    }).setLngLat([longitude, latitude]).addTo(map1);
  } else if (i === 2) {
    map2.setCenter(coords);
    const marker = new mapboxgl.Marker().setLngLat(coords).addTo(map2);
    const marker2 = new mapboxgl.Marker({
      color: '#ff0000',
      scale: '0.5',
    }).setLngLat([longitude, latitude]).addTo(map2);
  } else if (i === 3) {
    map3.setCenter(coords);
    const marker = new mapboxgl.Marker().setLngLat(coords).addTo(map3);
    const marker2 = new mapboxgl.Marker({
      color: '#ff0000',
      scale: '0.5',
    }).setLngLat([longitude, latitude]).addTo(map3);
  } else if (i === 4) {
    map4.setCenter(coords);
    const marker = new mapboxgl.Marker().setLngLat(coords).addTo(map4);
    const marker2 = new mapboxgl.Marker({
      color: '#ff0000',
      scale: '0.5',
    }).setLngLat([longitude, latitude]).addTo(map4);
  }
};

const loadMap = () => {
  map1.on('load', function () {
    map1.resize();
  });
  map2.on('load', function () {
    map2.resize();
  });
  map3.on('load', function () {
    map3.resize();
  });
  map4.on('load', function () {
    map4.resize();
  });
};


export {addMarker, loadMap};
