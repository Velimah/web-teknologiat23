//map test
mapboxgl.accessToken = 'pk.eyJ1IjoiaWxra2FtdGsiLCJhIjoiY2szZ2Z3ZGtzMDFkZTNpcDh2aGFndmg2dyJ9.CjPq5lceUKhfdWD3oqhjwg';

const map0 = new mapboxgl.Map({
  container: 'map', // container id
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

const addMarker = (coords, i) => {
  const map = `map${i}`;
  map.setCenter(coords);
  const marker = new mapboxgl.Marker().setLngLat(coords).addTo(map);

};

const loadMap = () => {
  map0.on('load', function () {
    map0.resize();
  });
  map1.on('load', function () {
    map0.resize();
  });
  map2.on('load', function () {
    map0.resize();
  });
  map3.on('load', function () {
    map0.resize();
  });
};

const currentPosition = () => {
  navigator.geolocation.getCurrentPosition(AddCurrentPositionMarker);
};

const AddCurrentPositionMarker = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const coords = [longitude, latitude];

  const marker = new mapboxgl.Marker({
    color: '#ff0000',
    scale: '0.5',
  }).setLngLat(coords).addTo(map);
};


export {addMarker, loadMap, currentPosition};
