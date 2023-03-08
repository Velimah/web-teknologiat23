
mapboxgl.accessToken = 'pk.eyJ1IjoiaWxra2FtdGsiLCJhIjoiY2szZ2Z3ZGtzMDFkZTNpcDh2aGFndmg2dyJ9.CjPq5lceUKhfdWD3oqhjwg';

//loads map
let map1 = new mapboxgl.Map({
  container: 'map1', // container id
  style: 'mapbox://styles/mapbox/streets-v12', // stylesheet location
  center: [24, 60], // starting position [lng, lat]
  zoom: 16, // starting zoom
});

/**
 * loads a fresh map to remove old markers
 */
const newMap = () => {
  //renders map with settings
  map1 = new mapboxgl.Map({
    container: 'map1', // container id
    style: 'mapbox://styles/mapbox/streets-v12', // stylesheet location
    center: [24, 60], // starting position [lng, lat]
    zoom: 16, // starting zoom
  });
};

//marker for current position
const addCurrentPositionMarker = (latitude, longitude) => {

  map1.setCenter([longitude, latitude]);

  const marker = new mapboxgl.Marker({
    color: '#000000',
    scale: '1.2',
  }).setLngLat([longitude, latitude]).addTo(map1);
};

// markers for hsl stops
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

//resizes map
const loadHSLMap = () => {
  map1.resize();
  map1.on('load', function () {
    map1.resize();
  });
};

export {addStopMarker, addCurrentPositionMarker, loadHSLMap, map1, newMap};
