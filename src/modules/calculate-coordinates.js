import {
  arabiaSettings,
  karamalmiSettings,
  myllypuroSettings,
  myyrmakiSettings,
  restaurants
} from "./restaurant-settings";
import {fazerDataFiArabia, fazerDataFiKaramalmi, sodexoDataMyllypuro, sodexoDataMyyrmaki} from "./fetch-lunchmenu";


// distance calculator for coordinates, from the wise people in internet
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Distance in km
  return earthRadius * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

let nearestRestaurant;
let nearestCoordinate = null;
let smallestDistance = Infinity;

const calculateNearestCampus = (lat, lon) => {
  console.log(lat, lon);
  for (const coord of restaurants) {
    const distance = getDistanceFromLatLonInKm(
      lat, lon,
      coord.lat, coord.lon
    );
    if (distance < smallestDistance) {
      smallestDistance = distance;
      nearestCoordinate = coord;
    }
  }
  nearestRestaurant = nearestCoordinate;
};

const getNearestRestaurantMenu = () => {
  if (nearestRestaurant.id === karamalmiSettings.id) {
    return fazerDataFiKaramalmi;
  } else if (nearestRestaurant.id === myllypuroSettings.id) {
    return sodexoDataMyllypuro;
  } else if (nearestRestaurant.id === arabiaSettings.id) {
    return fazerDataFiArabia;
  } else if (nearestRestaurant.id === myyrmakiSettings.id) {
    return sodexoDataMyyrmaki;
  }
};

export {calculateNearestCampus, getNearestRestaurantMenu};
