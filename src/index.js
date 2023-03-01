'use strict';

import {showMenuSodexo} from './modules/sodexo-data';
import {showMenuFazer} from './modules/fazer-data';
import {darkTheme, lightTheme} from './modules/dark-mode';
import {search} from './modules/search';
import {mouseParallax} from './modules/mouse-parallax';
import {getRoutesByStopId, getNearestStops} from './modules/hsl-fetch';
import {loadMap, addMarker, addCurrentPosition} from './modules/map';
import {loadMenus} from './modules/menu-fetch';
import {calcDistance, showNearestRestaurantMenu} from "./modules/coordinate-calc";
import {myyrmakiSettings,karamalmiSettings,myllypuroSettings,arabiaSettings} from "./modules/restaurant-info";
import {
  fazerDataEnArabia,
  fazerDataEnKaramalmi,
  fazerDataFiArabia,
  fazerDataFiKaramalmi,
  sodexoDataMyllypuro,
  sodexoDataMyyrmaki
} from "./modules/menu-fetch";

const myyrmakiButton = document.getElementById('restaurant-sodexo');
const karamalmiButton = document.getElementById('restaurant-fazer');
const myllypuroButton = document.getElementById('restaurant-sodexo2');
const arabiaButton = document.getElementById('restaurant-fazer2');

const languageButton = document.getElementById('language-button');
const darkModeButton = document.getElementById('darkmode-button');
const searchInput = document.getElementById('search-input');
const background = document.querySelector('.header-picture-area');

//booleans for choosing restaurant, language and dark mode
let finnish;
let darkMode;
let menu;
let lat;
let lon;

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

myyrmakiButton.onclick = () => {
  menu = sodexoDataMyyrmaki;
  showMenu(menu);
  renderHSLData(myyrmakiSettings.lat, myyrmakiSettings.lon);
  lat = myyrmakiSettings.lat;
  lon = myyrmakiSettings.lon;
  saveSettings();
};
myllypuroButton.onclick = () => {
  menu = sodexoDataMyllypuro;
  showMenu(menu);
  renderHSLData(myllypuroSettings.lat, myllypuroSettings.lon);
  lat = myllypuroSettings.lat;
  lon = myllypuroSettings.lon;
  saveSettings();
};
karamalmiButton.onclick = () => {
  if (finnish === true) {
    menu = fazerDataFiKaramalmi;
  } else {
    menu = fazerDataEnKaramalmi;
  }
  showMenu(menu);
  renderHSLData(karamalmiSettings.lat, karamalmiSettings.lon);
  lat = karamalmiSettings.lat;
  lon = karamalmiSettings.lon;
  saveSettings();
};
arabiaButton.onclick = () => {
  if (finnish === true) {
    menu = fazerDataFiArabia;
  } else {
    menu = fazerDataEnArabia;
  }
  showMenu(menu);
  renderHSLData(arabiaSettings.lat, arabiaSettings.lon);
  lat = arabiaSettings.lat;
  lon = arabiaSettings.lon;
  saveSettings();
};

// changes language and saves boolean into local storage
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

//chooses the correct menu and changes the pressed buttons color
const showMenu = (menu) => {
  if ('RestaurantName' in menu) {
    showMenuFazer(finnish, menu);
  } else {
    showMenuSodexo(finnish, menu);
  }
};


// changes dark mode and saves boolean into local storage
darkModeButton.onclick = () => {
  if (darkMode === true) {
    darkModeButton.innerHTML = 'Light mode';
    lightTheme();
    darkMode = false;
  } else {
    darkModeButton.innerHTML = 'Dark mode';
    darkTheme();
    darkMode = true;
  }
  saveSettings();
};

// search, takes value from input and searches course names for a match
searchInput.addEventListener('keypress', (event) => {
  search(finnish, event);
});

//parallax mouse effect
background.addEventListener('mousemove', (evt) => {
  mouseParallax(evt);
});

//saves settings to localstorage
const saveSettings = () => {
  const settings = {};
  settings.finnish = finnish;
  settings.darkmode = darkMode;
  settings.lat = lat;
  settings.lon = lon;
  localStorage.setItem('settings', JSON.stringify(settings));
};

// loads data from localstorage and chooses language and color theme
const loadSettings = () => {
  //checks if the localstorage is empty to avoid null error.
  let parsedData;
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

const CurrentPos = (position) => {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  calcDistance(lat, lon);
  renderHSLData(lat, lon);
  saveSettings();
};
const renderHSLData = async (latitude, longitude) => {

  const stops = await getNearestStops(latitude, longitude);

  const dataBox = document.getElementById('hsl-data');
  dataBox.innerHTML= '';

  const marker = document.createElement('div');
  marker.setAttribute('class', 'youre-here');
  marker.innerHTML = 'Olet tässä';
  dataBox.append(marker);

  let i = 1;
  for (const id of stops.routes) {

    const routes = await getRoutesByStopId(id.substring(4));

    const lineContainer = document.createElement('div');
    lineContainer.setAttribute('class', 'line-container');
    if (i === 1) {
      lineContainer.style.borderColor = '#ff7700';
      lineContainer.style.backgroundColor = 'rgba(255,119,0,0.3)';
    } else if (i === 2) {
      lineContainer.style.borderColor = '#36ff00';
      lineContainer.style.backgroundColor = 'rgba(54,255,0,0.3)';
    } else if (i === 3) {
      lineContainer.style.borderColor = '#0029ff';
      lineContainer.style.backgroundColor = 'rgba(0,41,255,0.3)';
    } else if (i === 4) {
      lineContainer.style.borderColor = '#c600ff';
      lineContainer.style.backgroundColor = 'rgba(198,0,255,0.3)';
    }

    const stopName = document.createElement('div');
    stopName.setAttribute('class', 'stop-name');
    stopName.innerHTML = `${routes.stopName}`;
    lineContainer.appendChild(stopName);

    const stopDistance = document.createElement('div');
    stopDistance.setAttribute('class', 'stop-name');
    stopDistance.innerHTML = `${stops.distance[i - 1]} m`;
    lineContainer.appendChild(stopDistance);

    for (const route of routes.routes) {
      const routeInfo = document.createElement('div');
      routeInfo.textContent = `${route.name} ${route.headsign}, saapuu ${route.realtimeArrival} ${route.arrivalDelay}`;
      lineContainer.append(routeInfo);
    }
    dataBox.append(lineContainer);

    addCurrentPosition(latitude, longitude);
    addMarker(routes.coords, i);
    i++;
  }
};

//carousel
const container = document.querySelector('#carousel');
const images = container.querySelectorAll('img');
const intervalTime = 3000;
let index = 0;

const carousel = () => {
  images[index].classList.remove('active');
  index = (index + 1) % images.length;
  images[index].classList.add('active');
};



//starts the application
const init = () => {
  loadSettings();
  loadMap();
  navigator.geolocation.getCurrentPosition(CurrentPos);
  loadMenus().then(() => {
    showMenu(showNearestRestaurantMenu());
  });
  setInterval(carousel, intervalTime);
};
init();
