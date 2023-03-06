'use strict';

import {renderMenuSodexo} from './modules/render-sodexo';
import {renderMenuFazer} from './modules/render-fazer';
import {renderHSLData} from "./modules/render-hsl";
import {darkTheme, lightTheme} from './modules/dark-mode';
import {search} from './modules/search';
import {loadHSLMap} from './modules/map';
import {
  getLunchMenus,
  fazerDataEnArabia,
  fazerDataEnKaramalmi,
  fazerDataFiArabia,
  fazerDataFiKaramalmi,
  sodexoDataMyllypuro,
  sodexoDataMyyrmaki
} from './modules/fetch-lunchmenu';
import {calculateNearestCampus, getNearestRestaurantMenu} from "./modules/calculate-coordinates";
import {
  myyrmakiSettings,
  karamalmiSettings,
  myllypuroSettings,
  arabiaSettings,
  getCampusSettings
} from "./modules/campus-settings";
import {getBitcoinData, btcPrice} from "./modules/fetch-bitcoin";
import {getWeatherData} from "./modules/fetch-weather";

const myyrmakiButton = document.getElementById('restaurant-sodexo');
const karamalmiButton = document.getElementById('restaurant-fazer');
const myllypuroButton = document.getElementById('restaurant-sodexo2');
const arabiaButton = document.getElementById('restaurant-fazer2');
const currentPositionButton = document.getElementById('current-position-button');
const languageButton = document.getElementById('language-button');
const darkModeButton = document.getElementById('darkmode-button');
const searchInput = document.getElementById('search-input');
const background = document.querySelector('.header-picture-area');


//initialization of variables to save data from functions
let finnish;
let darkMode;
let menu;
let lat;
let lon;

// interval timers
const intervalTimeCarousel = 3000;
const intervalTimeBusData = 60000;
const intervalTimeBTC = 60000;
const intervalTimeWeather = 60000;
const intervalTimeFetchMenus = 3600000;


// pwa
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

// loads data from localstorage and chooses language and color theme
const loadSettingsFromLocalStorage = () => {
  let parsedData;

  //checks if the localstorage is empty to avoid null error.
  try {
    parsedData = JSON.parse(localStorage.getItem('settings')).finnish;
  } catch (e) {
    parsedData = true;   //set default value if localStorage parsing failed
  }
  finnish = parsedData;
  try {
    parsedData = JSON.parse(localStorage.getItem('settings')).darkmode;
  } catch (e) {
    parsedData = false;   //set default value if localStorage parsing failed
  }
  darkMode = parsedData;

  // chooses button texts based on localstorage settings
  if (finnish === true) {
    languageButton.innerHTML = 'Suomi';
    document.getElementById('carousel-fi').style.display='block';
    document.getElementById('carousel-en').style.display='none';
    searchInput.placeholder = "Etsi ruoka-annosta";
  } else {
    languageButton.innerHTML = 'English';
    document.getElementById('carousel-fi').style.display='none';
    document.getElementById('carousel-en').style.display='block';
    searchInput.placeholder = "Search for a dish";
  }

  // chooses theme based on localstorage settings
  if (darkMode === true) {
    if (finnish===true) {
      darkModeButton.innerHTML = 'Tumma';
    } else {
      darkModeButton.innerHTML = 'Dark';
    }
    darkTheme();
  } else {
    if (finnish===true) {
      darkModeButton.innerHTML = 'Vaalea';
    } else {
      darkModeButton.innerHTML = 'Light';
    }
    lightTheme();
  }
};

//chooses the correct menu renderer through object properties
const renderLunchMenu = (menus) => {
  menu = menus;
  if ('RestaurantName' in menus) {
    renderMenuFazer(finnish, menus);
  } else {
    renderMenuSodexo(finnish, menus);
  }
};

//carousel
const containerFi = document.querySelector('#carousel-fi');
const containerEn = document.querySelector('#carousel-en');
const imagesFi = containerFi.querySelectorAll('img');
const imagesEn = containerEn.querySelectorAll('img');
let index = 0;

const carouselFi = () => {
  imagesFi[index].classList.remove('active');
  index = (index + 1) % imagesFi.length;
  imagesFi[index].classList.add('active');
};
const carouselEn = () => {
  imagesEn[index].classList.remove('active');
  index = (index + 1) % imagesEn.length;
  imagesEn[index].classList.add('active');
};

myyrmakiButton.addEventListener('click', () => {
  menu = sodexoDataMyyrmaki;
  lat = myyrmakiSettings.lat;
  lon = myyrmakiSettings.lon;
  document.getElementById('logo').innerHTML = 'Myyrmäki';
  document.getElementById('header-picture').setAttribute("src", "assets/Images/myyrmaen-kampus-ilmakuva.jpg");
  renderMenuSodexo(finnish, menu);
  renderHSLData(myyrmakiSettings.lat, myyrmakiSettings.lon, finnish);
  getWeatherData(myyrmakiSettings.lat, myyrmakiSettings.lon, finnish);
  saveSettingsToLocalStorage();
});

myllypuroButton.addEventListener('click', () => {
  menu = sodexoDataMyllypuro;
  lat = myllypuroSettings.lat;
  lon = myllypuroSettings.lon;
  document.getElementById('logo').innerHTML = 'Myllypuro';
  document.getElementById('header-picture').setAttribute("src", "assets/Images/myllypuron-kampus-ilmakuva.jpg");
  renderMenuSodexo(finnish, menu);
  renderHSLData(myllypuroSettings.lat, myllypuroSettings.lon, finnish);
  getWeatherData(myllypuroSettings.lat, myllypuroSettings.lon, finnish);
  saveSettingsToLocalStorage();
});

karamalmiButton.addEventListener('click', () => {
  if (finnish === true) {
    menu = fazerDataFiKaramalmi;
  } else {
    menu = fazerDataEnKaramalmi;
  }
  lat = karamalmiSettings.lat;
  lon = karamalmiSettings.lon;
  document.getElementById('logo').innerHTML = 'Karamalmi';
  document.getElementById('header-picture').setAttribute("src", "assets/Images/karamalmin-kampus.jpg");
  renderMenuFazer(finnish, menu);
  renderHSLData(karamalmiSettings.lat, karamalmiSettings.lon, finnish);
  getWeatherData(karamalmiSettings.lat, karamalmiSettings.lon, finnish);
  saveSettingsToLocalStorage();
});

arabiaButton.addEventListener('click', () => {
  if (finnish === true) {
    menu = fazerDataFiArabia;
  } else {
    menu = fazerDataEnArabia;
  }
  lat = arabiaSettings.lat;
  lon = arabiaSettings.lon;
  document.getElementById('logo').innerHTML = 'Arabia';
  document.getElementById('header-picture').setAttribute("src", "assets/Images/arabian-kampus-sisaankaynti.jpg");
  renderMenuFazer(finnish, menu);
  renderHSLData(arabiaSettings.lat, arabiaSettings.lon, finnish);
  getWeatherData(arabiaSettings.lat, arabiaSettings.lon, finnish);
  saveSettingsToLocalStorage();
});

currentPositionButton.addEventListener('click', () => {
  currentPosition();
  renderLunchMenu(getNearestRestaurantMenu(finnish));
});

// changes language and saves boolean into local storage

languageButton.addEventListener('click', () => {
  if (finnish === true && menu.RestaurantName === "Luova") {
    menu = fazerDataEnArabia;
    finnish = false;
    renderMenuFazer(finnish, menu);

  } else if (finnish === true && menu.RestaurantName === "Metropolia") {
    menu = fazerDataEnKaramalmi;
    finnish = false;
    renderMenuFazer(finnish, menu);

  } else if (finnish === false && menu.RestaurantName === "Luova") {
    menu = fazerDataFiArabia;
    finnish = true;
    renderMenuFazer(finnish, menu);

  } else if (finnish === false && menu.RestaurantName === "Metropolia") {
    menu = fazerDataFiKaramalmi;
    finnish = true;
    renderMenuFazer(finnish, menu);

  } else if (finnish === true) {
    finnish = false;
    renderMenuSodexo(finnish, menu);

  } else if (finnish === false) {
    finnish = true;
    renderMenuSodexo(finnish, menu);
  }
  if (finnish===true ){
    document.getElementById('carousel-fi').style.display='block';
    document.getElementById('carousel-en').style.display='none';
    searchInput.placeholder = "Etsi ruoka-annosta";
    languageButton.innerHTML = 'Suomi';
    if (darkMode===true) {
      darkModeButton.innerHTML = 'Tumma';
    } else {
      darkModeButton.innerHTML = 'Vaalea';
    }

  } else {
    document.getElementById('carousel-fi').style.display='none';
    document.getElementById('carousel-en').style.display='block';
    searchInput.placeholder = "Search for a dish";
    languageButton.innerHTML = 'English';
    if (darkMode===true) {
      darkModeButton.innerHTML = 'Dark';
    } else {
      darkModeButton.innerHTML = 'Light';
    }
  }
  renderHSLData(lat, lon, finnish);
  getWeatherData(lat, lon, finnish);
  getBitcoinData(finnish);
  saveSettingsToLocalStorage();
});


// changes dark mode and saves boolean into local storage
darkModeButton.addEventListener('click', () => {

  if (darkMode === true) {
    if (finnish===true) {
      darkModeButton.innerHTML = 'Vaalea';
    } else {
      darkModeButton.innerHTML = 'Light';
    }
    lightTheme();
    darkMode = false;
  } else {
    if (finnish===true) {
      darkModeButton.innerHTML = 'Tumma';
    } else {
      darkModeButton.innerHTML = 'Dark';
    }
    darkTheme();
    darkMode = true;
  }
  saveSettingsToLocalStorage();
});

// search, takes value from input and searches course names for a match
searchInput.addEventListener('keypress', (event) => {
  search(finnish, event);
});

//saves settings to localstorage
const saveSettingsToLocalStorage = () => {
  const settings = {};
  settings.finnish = finnish;
  settings.darkmode = darkMode;
  settings.lat = lat;
  settings.lon = lon;
  settings.btcPrice = btcPrice;
  localStorage.setItem('settings', JSON.stringify(settings));
};

const getCurrentCoordinates = (position) => {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  calculateNearestCampus(lat, lon);
  renderHSLData(lat, lon, finnish);
  getWeatherData(lat, lon, finnish);
  saveSettingsToLocalStorage();
};

const currentPosition = () => {
  navigator.geolocation.getCurrentPosition(getCurrentCoordinates);
};


//starts the application
const init = () => {

  // loads localstorage settings
  loadSettingsFromLocalStorage();

  getCampusSettings()
    .then(() => currentPosition())
    .then(() => getLunchMenus())
    .then(() => {
      renderLunchMenu(getNearestRestaurantMenu(finnish));
    });

  // loads HSL stop map
  loadHSLMap();

  //fetches bitcoin data and renders it
  getBitcoinData(finnish);

  // starts the info-carousel
  setInterval(carouselFi, intervalTimeCarousel);
  setInterval(carouselEn, intervalTimeCarousel);

  setInterval(async () => {
    await getWeatherData(lat, lon, finnish);
  }, intervalTimeWeather);

  // refreshes bitcoin data every minute
  setInterval(getBitcoinData, intervalTimeBTC);

  // refreshes lunch menu data every hour
  setInterval(getLunchMenus, intervalTimeFetchMenus);
  setInterval(renderLunchMenu, intervalTimeFetchMenus);

  // refreshes HSL data every minute
  setInterval(async () => {
    await renderHSLData(lat, lon, finnish);
  }, intervalTimeBusData);

};
init();

export {saveSettingsToLocalStorage};
