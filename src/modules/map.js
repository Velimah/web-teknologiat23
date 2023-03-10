//map test
mapboxgl.accessToken = 'pk.eyJ1IjoiaWxra2FtdGsiLCJhIjoiY2szZ2Z3ZGtzMDFkZTNpcDh2aGFndmg2dyJ9.CjPq5lceUKhfdWD3oqhjwg';

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


/**
 * adds marker to current coordinates in HSL map
 * @param latitude coordinate
 * @param longitude coordinate
 */
const addCurrentPositionMarker = (latitude, longitude) => {
  map1.setCenter([longitude, latitude]);

  const marker = new mapboxgl.Marker({
    color: '#000000',
    scale: '1.2',
  }).setLngLat([longitude, latitude]).addTo(map1);
};

/**
 * adds bus stop markers to HSL map with different colors
 * @param coords [lat,lon] coordinates
 * @param i index number for each stop
 */
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

/**
 * resizes map to fit container
 */
const loadHSLMap = () => {
  map1.on('load', function () {
    map1.resize();
  });
};

export {addStopMarker, addCurrentPositionMarker, loadHSLMap, newMap};
