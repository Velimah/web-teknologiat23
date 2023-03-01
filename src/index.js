'use strict';

import {showMenuSodexo} from './modules/sodexo-data';
import {showMenuFazer} from './modules/fazer-data';
import {darkTheme, lightTheme} from './modules/dark-mode';
import {search} from './modules/search';
import {mouseParallax} from './modules/mouse-parallax';
import {getRoutesByStopId, getNearestStops} from './modules/hsl';
import {loadMap, addMarker, addCurrentPosition} from './modules/map';
import {loadMenus} from './modules/menu-fetch';

const myyrmakiButton = document.getElementById('restaurant-sodexo');
const karamalmiButton = document.getElementById('restaurant-fazer');
const myllypuroButton = document.getElementById('restaurant-sodexo2');
const arabiaButton = document.getElementById('restaurant-fazer2');

const languageButton = document.getElementById('language-button');
const darkModeButton = document.getElementById('darkmode-button');
const searchInput = document.getElementById('search-input');
const background = document.querySelector('.header-picture-area');

//booleans for choosing restaurant, language and dark mode
let sodexo = true;
let finnish;
let darkMode;

// pwa
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').
      then(registration => {
        console.log('SW registered: ', registration);
      }).
      catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

myyrmakiButton.onclick = () => {
  sodexo = true;
  showMenu();
};
karamalmiButton.onclick = () => {
  sodexo = false;
  showMenu();
};
arabiaButton.onclick = () => {
  sodexo = false;
  showMenu();
};
myllypuroButton.onclick = () => {
  sodexo = true;
  showMenu();
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
  showMenu();
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
//chooses the correct menu and changes the pressed buttons color
const showMenu = () => {
  if (sodexo === true) {
    showMenuSodexo(finnish);
    myyrmakiButton.style.backgroundColor = 'var(--main-color-green)';
    karamalmiButton.style.backgroundColor = 'var(--supp-color-lgreen)';
  } else {
    showMenuFazer(finnish);
    myyrmakiButton.style.backgroundColor = 'var(--supp-color-lgreen)';
    karamalmiButton.style.backgroundColor = 'var(--main-color-green)';
  }
};

//saves settings to localstorage
const saveSettings = () => {
  const settings = {};
  settings.finnish = finnish;
  settings.darkmode = darkMode;
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
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  renderHSLData(latitude, longitude);
};

const renderHSLData = async (latitude, longitude) => {

  const stops = await getNearestStops(latitude, longitude);
  console.log(stops);
  const target = document.querySelector('#container4');

  const dataBox = document.createElement('div');
  dataBox.setAttribute('class', 'hsl-data');
  target.append(dataBox);

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
  loadMenus().then(() => showMenu());
  navigator.geolocation.getCurrentPosition(CurrentPos);
  setInterval(carousel, intervalTime);
};
init();
