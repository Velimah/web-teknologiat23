'use strict';

import {showMenuSodexo, randomCourse} from './modules/sodexo-data';
import {showMenuFazer, randomCourseFazer} from "./modules/fazer-data";
import {doFetch} from './modules/network';
import {darkTheme, lightTheme} from "./modules/dark-mode";
import {search} from "./modules/search";
import {mouseParallax} from "./modules/mouse-parallax";
import {getRoutesByStopId, getNearestStops} from './modules/hsl';
import {loadMap, addMarker, currentPosition} from "./modules/map";

const sodexoButton = document.getElementById('restaurant-sodexo');
const fazerButton = document.getElementById('restaurant-fazer');
const languageButton = document.getElementById('language-button');
const glutenButton = document.getElementById('gluten-button');
const randomButton = document.getElementById('random-button');
const darkModeButton = document.getElementById('darkmode-button');
const searchInput = document.getElementById("search-input");
const background = document.querySelector('.header-picture-area');


//booleans for choosing restaurant, language, gluten-free meals and dark mode
let sodexo = true;
let glutenFree = false;
let finnish;
let darkMode;

//variables for .json data from fetches
let sodexoData;
let fazerDataFi;
let fazerDataEn;

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

sodexoButton.onclick = () => {
  sodexo = true;
  showMenu();
};

fazerButton.onclick = () => {
  sodexo = false;
  showMenu();
};

// changes language and saves boolean into local storage
languageButton.onclick = () => {
  if (finnish === true) {
    languageButton.innerHTML = 'English';
    glutenButton.innerHTML = 'Gluten-free';
    finnish = false;
  } else {
    languageButton.innerHTML = 'Suomi';
    glutenButton.innerHTML = 'Gluteeniton';
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

glutenButton.onclick = () => {
  if (glutenFree === true) {
    glutenFree = false;
    glutenButton.style.backgroundColor = 'var(--supp-color-lgreen)';
    showMenu();
  } else {
    glutenFree = true;
    glutenButton.style.backgroundColor = 'var(--main-color-green)';
    showMenu();
  }
};

randomButton.onclick = () => {
  if (sodexo === true) {
    randomCourse(finnish);
  } else {
    randomCourseFazer(finnish);
  }
};

// search, takes value from input and searches course names for a match
searchInput.addEventListener("keypress", (event) => {
  search(finnish, event);
});

//parallax mouse effect
background.addEventListener('mousemove', (evt) => {
  mouseParallax(evt);
});

// validator for dish names
let validator = (string) => {
  const regexp = /^[A-ZÄÖÅ][A-ZÄÖÅa-zäöåêü0-9-/,()*\s]{3,100}$/;
  return regexp.test(string);
};

// fetches the menus from sodexo and foodco
const loadMenus = async () => {
  // fetches sodexo menu
  try {
    sodexoData = await doFetch(
      'https://www.sodexo.fi/ruokalistat/output/weekly_json/152',
      false
    );
    console.log('sodexo menu', sodexoData);
  } catch (error) {
    console.log('menu ei saatavilla');
  }
  // fetches finnish foodco menu
  try {
    fazerDataFi = await doFetch(
      'https://www.compass-group.fi/menuapi/feed/json?costNumber=3208&language=fi',
      true
    );
    console.log('foodco menu finnish', fazerDataFi);
  } catch (error) {
    console.log('menu ei saatavilla');
  }

  // fetches english foodco menu
  try {
    fazerDataEn = await doFetch(
      'https://www.compass-group.fi/menuapi/feed/json?costNumber=3208&language=en',
      true
    );
    console.log('foodco menu english', fazerDataEn);
  } catch (error) {
    console.log('menu ei saatavilla');
  }
};

//chooses the correct menu and changes the pressed buttons color
const showMenu = () => {
  if (sodexo === true) {
    showMenuSodexo(finnish, glutenFree);
    sodexoButton.style.backgroundColor = 'var(--main-color-green)';
    fazerButton.style.backgroundColor = 'var(--supp-color-lgreen)';
  } else {
    showMenuFazer(finnish, glutenFree);
    sodexoButton.style.backgroundColor = 'var(--supp-color-lgreen)';
    fazerButton.style.backgroundColor = 'var(--main-color-green)';
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
    glutenButton.innerHTML = 'Gluteeniton';
  } else {
    languageButton.innerHTML = 'English';
    glutenButton.innerHTML = 'Gluten-free';
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

  let i = 1;
  for (const id of stops) {

    const routes = await getRoutesByStopId(id.substring(4));

    const target = document.querySelector('#container4');

    const dataBox = document.createElement('div');
    dataBox.setAttribute('class', 'hsl-data');
    target.append(dataBox);

    const lineContainer = document.createElement('div');
    lineContainer.setAttribute('class', 'line-container');

    const stopName = document.createElement('div');
    stopName.setAttribute('class', 'stop-name');
    stopName.innerHTML = `${routes.stopName}`;
    lineContainer.appendChild(stopName);

    addMarker(routes.coords, i, latitude, longitude);

    for (const route of routes.routes) {
      const routeInfo = document.createElement('div');
      routeInfo.textContent = `${route.name} ${route.headsign}, saapuu ${route.realtimeArrival}, ${route.arrivalDelay}`;
      lineContainer.append(routeInfo);
    }
    dataBox.append(lineContainer);
    dataBox.appendChild(document.getElementById(`map${i}`));

    i++;
  }
};


//starts the application
const init = () => {
  loadSettings();
  loadMap();
  navigator.geolocation.getCurrentPosition(CurrentPos);
  loadMenus().then(() => showMenu());
};
init();


export {validator, sodexoData, fazerDataFi, fazerDataEn};
