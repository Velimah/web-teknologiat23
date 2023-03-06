//map test
mapboxgl.accessToken = 'pk.eyJ1IjoiaWxra2FtdGsiLCJhIjoiY2szZ2Z3ZGtzMDFkZTNpcDh2aGFndmg2dyJ9.CjPq5lceUKhfdWD3oqhjwg';

const map1 = new mapboxgl.Map({
  container: 'map1', // container id
  style: 'mapbox://styles/mapbox/streets-v12', // stylesheet location
  center: [24, 60], // starting position [lng, lat]
  zoom: 16, // starting zoom
});

map1.on('render', function () {
  map1.resize();
});
map1.on('load', function () {
  map1.resize();
});

const addCurrentPositionMarker = (latitude, longitude) => {

  map1.setCenter([longitude, latitude]);

  const marker = new mapboxgl.Marker({
    color: '#000000',
    scale: '1.2',
  }).setLngLat([longitude, latitude]).addTo(map1);
};
const addStopMarker = (coords, i) => {
  let color;
  if (i === 0) {
    color = '#ff5000';
  } else if (i === 1) {
    color = '#e384c4';
  } else if (i === 2) {
    color = '#4046a8';
  } else if (i === 3) {
    color = '#3ba88f';
  } else if (i === 4) {
    color = '#fff000';
  } else if (i === 5) {
    color = '#cb2228';
  }
  const marker = new mapboxgl.Marker({
    color: color,
    scale: '1.2',
  }).setLngLat(coords).addTo(map1);
};

const loadHSLMap = () => {
  map1.on('render', function () {
    map1.resize();
  });
};

export {addStopMarker, addCurrentPositionMarker, loadHSLMap};
