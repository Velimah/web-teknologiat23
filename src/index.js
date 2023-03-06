'use strict';

import {renderMenuSodexo} from './modules/render-sodexo';
import {renderMenuFazer} from './modules/render-fazer';
import {renderHSLData} from "./modules/render-hsl";
import {darkTheme, lightTheme} from './modules/dark-mode';

import {loadHSLMap, map1} from './modules/map';
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
const settingsButton = document.querySelector('html');


// fix to resize map in fullscreen mode, works sometimes?
document.addEventListener('webkitfullscreenchange', () => setTimeout(() => map1.resize(), 0));


//toggles showing settings on clicking the webpage
let visible;
settingsButton.addEventListener('click', () => {
  if (visible) {
    visible = false;
    console.log(visible);
    document.querySelector('.nav').style.display = 'flex';
  } else {
    visible = true;
    console.log(visible);
    document.querySelector('.nav').style.display = 'none';
  }
});

//initialization of variables to save data from functions
let finnish;
let darkMode;
let menu;
let lat;
let lon;

// interval timers
const intervalTimeBusData = 60000;
const intervalTimeBTC = 60000;
const intervalTimeWeather = 60000;
const intervalTimeFetchMenus = 3600000;
const intervalTimeCarousel = 3000;
const intervalTimeCarouselSlide = 10000;

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
    document.getElementById('carousel-fi').style.display = 'block';
    document.getElementById('carousel-en').style.display = 'none';
  } else {
    languageButton.innerHTML = 'English';
    document.getElementById('carousel-fi').style.display = 'none';
    document.getElementById('carousel-en').style.display = 'block';
  }

  // chooses theme based on localstorage settings
  if (darkMode === true) {
    if (finnish === true) {
      darkModeButton.innerHTML = 'Tumma';
    } else {
      darkModeButton.innerHTML = 'Dark';
    }
    darkTheme();
  } else {
    if (finnish === true) {
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

//carousel variables
const containerFi = document.getElementById('carousel-fi');
const containerEn = document.getElementById('carousel-en');
const imagesFi = containerFi.querySelectorAll('img');
const imagesEn = containerEn.querySelectorAll('img');
let index = 0;

//cycles the finnish version of slides
const carouselFi = () => {
  imagesFi[index].classList.remove('active');
  index = (index + 1) % imagesFi.length;
  imagesFi[index].classList.add('active');
};

//cycles the english version of slides
const carouselEn = () => {
  imagesEn[index].classList.remove('active');
  index = (index + 1) % imagesEn.length;
  imagesEn[index].classList.add('active');
};

//cycles the main information screens
let index2 = 0;
const carouselSignage = () => {
  if (index2 === 0) {
    document.getElementById('lunch-container').style.display = "none";
    document.getElementById('hsl-container').style.display = "flex";
    document.getElementById('carousel-container').style.display = "none";
    loadHSLMap();
  } else if (index2 === 1) {
    document.getElementById('lunch-container').style.display = "grid";
    document.getElementById('hsl-container').style.display = "none";
    document.getElementById('carousel-container').style.display = "none";
  } else if (index2 === 2) {
    document.getElementById('lunch-container').style.display = "none";
    document.getElementById('hsl-container').style.display = "none";
    document.getElementById('carousel-container').style.display = "flex";
  } else {
    index2=-1;
  }
  index2++;
};

//button listeners for each campus
myyrmakiButton.addEventListener('click', () => {
  //saves correct campus data to variables
  menu = sodexoDataMyyrmaki;
  lat = myyrmakiSettings.lat;
  lon = myyrmakiSettings.lon;
  // changes display name and picture to correct campus
  document.getElementById('logo').innerHTML = 'Myyrmäki';
  document.getElementById('header-picture').setAttribute("src", "assets/Images/myyrmaen-kampus-ilmakuva.jpg");
  //renders correct campus information
  renderMenuSodexo(finnish, menu);
  renderHSLData(myyrmakiSettings.lat, myyrmakiSettings.lon, finnish);
  getWeatherData(myyrmakiSettings.lat, myyrmakiSettings.lon, finnish);
  //saves data to localstorage
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
  //chooses correct menu language based on settings
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
    menu = fazerDataFiArabia;
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

//gives correct campus information based on current location
currentPositionButton.addEventListener('click', () => {
  currentPosition();
  renderLunchMenu(getNearestRestaurantMenu(finnish));
});

// changes language
languageButton.addEventListener('click', () => {
  //checks for correct menu when changing language as food&co has 2 menus
  if (finnish === true && menu.RestaurantName === "Luova") {
    menu = fazerDataFiArabia;
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
  //changes to correct slide carousel and button text based on language
  if (finnish === true) {
    document.getElementById('carousel-fi').style.display = 'block';
    document.getElementById('carousel-en').style.display = 'none';
    languageButton.innerHTML = 'Suomi';
    if (darkMode === true) {
      darkModeButton.innerHTML = 'Tumma';
    } else {
      darkModeButton.innerHTML = 'Vaalea';
    }
  } else {
    document.getElementById('carousel-fi').style.display = 'none';
    document.getElementById('carousel-en').style.display = 'block';
    languageButton.innerHTML = 'English';
    if (darkMode === true) {
      darkModeButton.innerHTML = 'Dark';
    } else {
      darkModeButton.innerHTML = 'Light';
    }
  }
  //renders data with new language and saves to localstorage
  renderHSLData(lat, lon, finnish);
  getWeatherData(lat, lon, finnish);
  getBitcoinData(finnish);
  saveSettingsToLocalStorage();
});


// changes dark mode and saves boolean into local storage
darkModeButton.addEventListener('click', () => {

  if (darkMode === true) {
    if (finnish === true) {
      darkModeButton.innerHTML = 'Vaalea';
    } else {
      darkModeButton.innerHTML = 'Light';
    }
    lightTheme();
    darkMode = false;
  } else {
    if (finnish === true) {
      darkModeButton.innerHTML = 'Tumma';
    } else {
      darkModeButton.innerHTML = 'Dark';
    }
    darkTheme();
    darkMode = true;
  }
  saveSettingsToLocalStorage();
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

//gets current coordinates
const currentPosition = () => {
  navigator.geolocation.getCurrentPosition(getCurrentCoordinates);
};


//starts the application
const init = () => {

  // loads localstorage settings
  loadSettingsFromLocalStorage();

  //loads settings from server, gets position, gets lunchmenus and renders the nearest lunch menu
  getCampusSettings()
    .then(() => currentPosition())
    .then(() => getLunchMenus())
    .then(() => {
      renderLunchMenu(getNearestRestaurantMenu(finnish));
    });

  // resizes HSL map
  loadHSLMap();

  //fetches bitcoin data and renders it
  getBitcoinData(finnish);

  // starts the carousels
  setInterval(carouselFi, intervalTimeCarouselSlide);
  setInterval(carouselEn, intervalTimeCarouselSlide);
  setInterval(carouselSignage, intervalTimeCarousel);

  // refreshes weather data every minute
  setInterval(async () => {
    await getWeatherData(lat, lon, finnish);
  }, intervalTimeWeather);

  // refreshes bitcoin data every minute
  setInterval(getBitcoinData, intervalTimeBTC);

  // refreshes HSL data every minute
  setInterval(async () => {
    await renderHSLData(lat, lon, finnish);
  }, intervalTimeBusData);

  // refreshes lunch menu data every hour
  setInterval(getLunchMenus, intervalTimeFetchMenus);
  setInterval(renderLunchMenu, intervalTimeFetchMenus);


};
init();

export {saveSettingsToLocalStorage};
