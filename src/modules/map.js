//map test
mapboxgl.accessToken = 'pk.eyJ1IjoiaWxra2FtdGsiLCJhIjoiY2szZ2Z3ZGtzMDFkZTNpcDh2aGFndmg2dyJ9.CjPq5lceUKhfdWD3oqhjwg';

const map1 = new mapboxgl.Map({
  container: 'map1', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [24, 60], // starting position [lng, lat]
  zoom: 16, // starting zoom
});

const addMarker = (coords, i, latitude, longitude) => {
  if (i === 1) {
    map1.setCenter([longitude, latitude]);
    const marker = new mapboxgl.Marker({
      color: '#ff7700',
      scale: '1.2',
    }).setLngLat(coords).addTo(map1);
    const marker2 = new mapboxgl.Marker({
      color: '#ff0000',
      scale: '1.2',
    }).setLngLat([longitude, latitude]).addTo(map1);
  } else if (i === 2) {
    const marker = new mapboxgl.Marker({
      color: '#36ff00',
      scale: '1.2',
    }).setLngLat(coords).addTo(map1);
  } else if (i === 3) {
    const marker = new mapboxgl.Marker({
      color: '#0029ff',
      scale: '1.2',
    }).setLngLat(coords).addTo(map1);
  } else if (i === 4) {
    const marker = new mapboxgl.Marker({
      color: '#c600ff',
      scale: '1.2',
    }).setLngLat(coords).addTo(map1);
  }
};

const loadMap = () => {
  map1.on('load', function () {
    map1.resize();
  });
};


export {addMarker, loadMap};
