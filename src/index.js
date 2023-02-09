'use strict';

import {showMenuSodexo, randomCourse} from './modules/sodexo-data';
import {showMenuFazer, randomCourseFazer} from "./modules/fazer-data";
import {doFetch} from './modules/network';
import {darkTheme, lightTheme} from "./modules/dark-mode";
import {mouseParallax} from "./modules/mouse-parallax";

const restaurantSodexo = document.getElementById('restaurant-sodexo');
const restaurantFazer = document.getElementById('restaurant-fazer');
const languageButton = document.getElementById('language-button');
const glutenButton = document.getElementById('gluten-button');
const randomButton = document.getElementById('random-button');
const darkModeButton = document.getElementById('darkmode-button');
const input = document.getElementById("search-input");
const background = document.querySelector('.header-picture-area');

//boleans for choosing restaurant, language, gluten-free meals and dark mode
let sodexo = true;
let glutenFree = false;
let finnish = JSON.parse(localStorage.getItem('settings')).finnish;
let darkMode = JSON.parse(localStorage.getItem('settings')).darkmode;

//localstorage settings
const settings = {};

// chooses theme based on localstorage settings
if (darkMode === true) {
  darkTheme();
} else {
  lightTheme();
}

// chooses button texts based on localstorage settings
if (finnish === true) {
  languageButton.innerHTML = 'Suomi';
  glutenButton.innerHTML = 'Gluteeniton';
} else {
  languageButton.innerHTML = 'English';
  glutenButton.innerHTML = 'Gluten-free';
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

let validator = (string) => {
  const regexp = /^[A-ZÄÖÅ][A-ZÄÖÅa-zäöåêü0-9-/,()*\s]{3,100}$/;
  return regexp.test(string);
};

restaurantSodexo.onclick = () => {
  sodexo = true;
  showMenus();
};

restaurantFazer.onclick = () => {
  sodexo = false;
  showMenus();
};

// changes language and saves boolean into local storage
languageButton.onclick = () => {
  if (finnish === true) {
    settings.finnish = false;
    languageButton.innerHTML = 'English';
    glutenButton.innerHTML = 'Gluten-free';
  } else {
    settings.finnish = true;
    languageButton.innerHTML = 'Suomi';
    glutenButton.innerHTML = 'Gluteeniton';
  }
  localStorage.setItem('settings', JSON.stringify(settings));
  finnish = JSON.parse(localStorage.getItem('settings')).finnish;
  showMenus();
};

// changes dark mode and saves boolean into local storage
darkModeButton.onclick = () => {
  if (darkMode === true) {
    settings.darkmode = false;
    lightTheme();
  } else {
    settings.darkmode = true;
    darkTheme();
  }
  localStorage.setItem('settings', JSON.stringify(settings));
  darkMode = JSON.parse(localStorage.getItem('settings')).darkmode;
};

glutenButton.onclick = () => {
  if (glutenFree === true) {
    glutenFree = false;
    glutenButton.style.backgroundColor = 'var(--supp-color-lgreen)';
    showMenus();
  } else {
    glutenFree = true;
    glutenButton.style.backgroundColor = 'var(--main-color-green)';
    showMenus();
  }
};

randomButton.onclick = () => {
  if (sodexo === true) {
    randomCourse(finnish);
  } else {
    randomCourseFazer(finnish);
  }
};

const showMenus = () => {
  if (sodexo === true) {
    showMenuSodexo(finnish, glutenFree);
    restaurantSodexo.style.backgroundColor = 'var(--main-color-green)';
    restaurantFazer.style.backgroundColor = 'var(--supp-color-lgreen)';
  } else {
    showMenuFazer(finnish, glutenFree);
    restaurantSodexo.style.backgroundColor = 'var(--supp-color-lgreen)';
    restaurantFazer.style.backgroundColor = 'var(--main-color-green)';
  }
};

//initializes the variables for .json data from fetch
let sodexoData;
let fazerDataFi;
let fazerDataEn;

// fetches the menus from sodexo and foodco
(async () => {

  // fetches sodexo menu
  try {
    sodexoData = await doFetch(
      'https://www.sodexo.fi/ruokalistat/output/weekly_json/152',
      false
    );
    console.log('sodexo menu', sodexoData);
    showMenuSodexo(finnish, glutenFree);
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
})();


// search, takes value from input and searches course names for a match
input.addEventListener("keypress", (event) => {

  //check for enter press to start search
  if (event.key === "Enter") {
    event.preventDefault();

    const inputValue = document.getElementById("search-input").value;
    const elements = document.querySelectorAll('.course-name');

    //index for number of results
    let i = 0;

    // loops all the course-name elements
    for (let elem of elements) {

      //changes the course name appearance if it matches the search string
      if (elem.textContent.includes(inputValue)) {
        elem.style.backgroundColor = 'var(--main-color-red)';
        elem.style.color = '#FFFFFF';
        elem.style.borderRadius = '5px';
        elem.style.padding = '5px';
        i++;
      }
    }
    //checks for language for correct alert
    if (finnish === true) {
      alert(`Löytyi ${i} annosta.`);
    } else {
      alert(`Found ${i} dishes.`);
    }
  }
});


//parallax mouse effect
background.addEventListener('mousemove', (evt) => {
  mouseParallax(evt);
});

export {validator, sodexoData, fazerDataFi, fazerDataEn};
