//map test
mapboxgl.accessToken = 'pk.eyJ1IjoiaWxra2FtdGsiLCJhIjoiY2szZ2Z3ZGtzMDFkZTNpcDh2aGFndmg2dyJ9.CjPq5lceUKhfdWD3oqhjwg';

const map1 = new mapboxgl.Map({
  container: 'map1', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [24, 60], // starting position [lng, lat]
  zoom: 15, // starting zoom
});

const addCurrentPosition = (latitude, longitude) => {
  map1.setCenter([longitude, latitude]);
  const marker2 = new mapboxgl.Marker({
    color: '#ff0000',
    scale: '1.2',
  }).setLngLat([longitude, latitude]).addTo(map1);
};
const addMarker = (coords, i) => {
  let color;
  if (i === 1) {
    color = '#ff7700';
  } else if (i === 2) {
    color = '#36ff00';
  } else if (i === 3) {
    color = '#0029ff';
  } else if (i === 4) {
    color = '#c600ff';
  }
  const marker = new mapboxgl.Marker({
    color: color,
    scale: '1.2',
  }).setLngLat(coords).addTo(map1);
};

const loadMap = () => {
  map1.on('load', function () {
    map1.resize();
  });
};


export {addMarker, addCurrentPosition, loadMap};
