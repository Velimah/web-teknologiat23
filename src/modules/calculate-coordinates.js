import {
  arabiaSettings,
  karamalmiSettings,
  myllypuroSettings,
  myyrmakiSettings,
  campuses
} from "./campus-settings";
import {
  fazerDataEnArabia,
  fazerDataEnKaramalmi,
  fazerDataFiArabia,
  fazerDataFiKaramalmi,
  sodexoDataMyllypuro,
  sodexoDataMyyrmaki
} from "./fetch-lunchmenu";


/**
 * Calculates distance between 2 coordinates with Haversine formula
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 * @returns {number}
 */
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

/**
 * takes current lat, lon and compares them to campus coordinates and returns the nearest campus object
 * @param lat
 * @param lon
 */
const calculateNearestCampus = (lat, lon) => {
  for (const coord of campuses) {
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

/**
 * compares the nearest campus object id to campus id's nad return the correct menu
 * changes the webpage header name and picture to corresponging campus
 * @param finnish language boolean
 * @returns {*} returns lunch menu .json
 */
const getNearestRestaurantMenu = (finnish) => {
  if (nearestRestaurant.id === karamalmiSettings.id) {
    document.getElementById('logo').innerHTML = 'Karamalmi';
    document.getElementById('header-picture').setAttribute("src", "assets/Images/karamalmin-kampus.jpg");
    if (finnish === true) {
      return fazerDataFiKaramalmi;
    } else {
      return fazerDataEnKaramalmi;
    }
  } else if (nearestRestaurant.id === myllypuroSettings.id) {
    document.getElementById('logo').innerHTML = 'Myllypuro';
    document.getElementById('header-picture').setAttribute("src", "assets/Images/myllypuron-kampus-ilmakuva.jpg");
    return sodexoDataMyllypuro;
  } else if (nearestRestaurant.id === arabiaSettings.id) {
    document.getElementById('logo').innerHTML = 'Arabia';
    document.getElementById('header-picture').setAttribute("src", "assets/Images/arabian-kampus-sisaankaynti.jpg");
    if (finnish === true) {
      return fazerDataFiArabia;
    } else {
      return fazerDataEnArabia;
    }
  } else if (nearestRestaurant.id === myyrmakiSettings.id) {
    document.getElementById('logo').innerHTML = 'Myyrmäki';
    document.getElementById('header-picture').setAttribute("src", "assets/Images/myyrmaen-kampus-ilmakuva.jpg");
    return sodexoDataMyyrmaki;
  }
};

export {calculateNearestCampus, getNearestRestaurantMenu};
