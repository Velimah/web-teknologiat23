'use strict';

import {renderMenuSodexo} from './modules/render-sodexo';
import {renderMenuFazer} from './modules/render-fazer';
import {renderHSLData} from "./modules/render-hsl";
import {darkTheme, lightTheme} from './modules/dark-mode';
import {search} from './modules/search';
import {mouseParallax} from './modules/mouse-parallax';
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
import {myyrmakiSettings, karamalmiSettings, myllypuroSettings, arabiaSettings} from "./modules/restaurant-settings";
import {doFetch} from "./modules/network";

const myyrmakiButton = document.getElementById('restaurant-sodexo');
const karamalmiButton = document.getElementById('restaurant-fazer');
const myllypuroButton = document.getElementById('restaurant-sodexo2');
const arabiaButton = document.getElementById('restaurant-fazer2');
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
const intervalTimeCarousel = 1000 * 3;
const intervalTimeBusData = 1000 * 60;
const intervalTimeFetchMenus = 1000 * 60 * 60;

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
  } else {
    languageButton.innerHTML = 'English';
  }

  // chooses theme based on localstorage settings
  if (darkMode === true) {
    darkModeButton.innerHTML = 'Dark mode';
    darkTheme();
  } else {
    darkModeButton.innerHTML = 'Light mode';
    lightTheme();
  }
};

const getCurrentCoordinates = (position) => {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  calculateNearestCampus(lat, lon);
  renderHSLData(lat, lon);
  saveSettingsToLocalStorage();
};

//chooses the correct menu renderer through object properties
const renderLunchMenu = (menu) => {
  if ('RestaurantName' in menu) {
    renderMenuFazer(finnish, menu);
  } else {
    renderMenuSodexo(finnish, menu);
  }
};

//carousel
const container = document.querySelector('#carousel');
const images = container.querySelectorAll('img');
let index = 0;

const carousel = () => {
  images[index].classList.remove('active');
  index = (index + 1) % images.length;
  images[index].classList.add('active');
};

myyrmakiButton.addEventListener('click', () => {
  menu = sodexoDataMyyrmaki;
  lat = myyrmakiSettings.lat;
  lon = myyrmakiSettings.lon;
  renderMenuSodexo(finnish, menu);
  renderHSLData(myyrmakiSettings.lat, myyrmakiSettings.lon);
  saveSettingsToLocalStorage();
});

myllypuroButton.addEventListener('click', () => {
  menu = sodexoDataMyllypuro;
  lat = myllypuroSettings.lat;
  lon = myllypuroSettings.lon;
  renderMenuSodexo(finnish, menu);
  renderHSLData(myllypuroSettings.lat, myllypuroSettings.lon);
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
  renderMenuFazer(finnish, menu);
  renderHSLData(karamalmiSettings.lat, karamalmiSettings.lon);
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
  renderMenuFazer(finnish, menu);
  renderHSLData(arabiaSettings.lat, arabiaSettings.lon);
  saveSettingsToLocalStorage();
});

// changes language and saves boolean into local storage
/*
languageButton.onclick = () => {
  if (finnish === true) {
    languageButton.innerHTML = 'English';
    finnish = false;
  } else {
    languageButton.innerHTML = 'Suomi';
    finnish = true;
  }
  saveSettings();
  showMenu(menu);
};
*/

// changes dark mode and saves boolean into local storage
darkModeButton.addEventListener('click', () => {
  if (darkMode === true) {
    darkModeButton.innerHTML = 'Light mode';
    lightTheme();
    darkMode = false;
  } else {
    darkModeButton.innerHTML = 'Dark mode';
    darkTheme();
    darkMode = true;
  }
  saveSettingsToLocalStorage();
});

// search, takes value from input and searches course names for a match
searchInput.addEventListener('keypress', (event) => {
  search(finnish, event);
});

//parallax mouse effect
background.addEventListener('mousemove', (evt) => {
  mouseParallax(evt);
});

//saves settings to localstorage
const saveSettingsToLocalStorage = () => {
  const settings = {};
  settings.finnish = finnish;
  settings.darkmode = darkMode;
  settings.lat = lat;
  settings.lon = lon;
  localStorage.setItem('settings', JSON.stringify(settings));
};

//starts the application
const init = () => {

  // loads localstorage settings
  loadSettingsFromLocalStorage();

  // loads bust stop map
  loadHSLMap();

  // gets current coordinates and loads bus stop data
  navigator.geolocation.getCurrentPosition(getCurrentCoordinates);

  //fetches lunch menus and then loads the nearest restaurant's menu
  getLunchMenus().then(() => {
    renderLunchMenu(getNearestRestaurantMenu());
  });

  // starts the info-carousel
  setInterval(carousel, intervalTimeCarousel);

  // refreshes the menu data every hour
  setInterval(doFetch, renderLunchMenu, intervalTimeFetchMenus);

  // refreshes bus stop data and map every minute
  setInterval(async () => {
    await renderHSLData(lat, lon);
  }, intervalTimeBusData);

};
init();
