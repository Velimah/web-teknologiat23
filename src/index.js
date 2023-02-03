'use strict';

import {showMenu, randomCourse} from './modules/SodexoData/sodexo-data';
import {showFazerMenu, randomCourseFazer} from "./modules/FazerData/fazer-data";
import {doFetch} from './modules/network';

const restaurantSodexo = document.getElementById('restaurant-sodexo');
const restaurantFazer = document.getElementById('restaurant-fazer');
const languageButton = document.getElementById('language-button');
const glutenButton = document.getElementById('gluten-button');
const randomButton = document.getElementById('random-button');

let sodexoData;
let fazerDataFi;
let fazerDataEn;
let sodexo = true;
let finnish = true;
let glutenFree = false;

/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
*/

let validator = (string) => {
  const regexp = /^[A-ZÄÖÅ][A-ZÄÖÅa-zäöå0-9-/,()*\s]{3,100}$/;
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

languageButton.onclick = () => {
  if (finnish === true) {
    finnish = false;
    languageButton.innerHTML = 'English';
    glutenButton.innerHTML = 'Gluten free';
    showMenus();
  } else {
    finnish = true;
    languageButton.innerHTML = 'Suomi';
    glutenButton.innerHTML = 'Gluteeniton';
    showMenus();
  }
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
    showMenu(finnish, glutenFree);
    restaurantSodexo.style.backgroundColor = 'var(--main-color-green)';
    restaurantFazer.style.backgroundColor = 'var(--supp-color-lgreen)';
  } else {
    showFazerMenu(finnish, glutenFree);
    restaurantSodexo.style.backgroundColor = 'var(--supp-color-lgreen)';
    restaurantFazer.style.backgroundColor = 'var(--main-color-green)';
  }
};


(async () => {
  // get sodexo data example (iife)
  try {
    sodexoData = await doFetch(
      'https://www.sodexo.fi/ruokalistat/output/weekly_json/152'
    );
    console.log('myrtsin menu', sodexoData);
    showMenu(finnish, glutenFree);
  } catch (error) {
    // tehdään jotain jos virhe doFethiltä
    console.log('menu ei saatavilla');
  }
  // get foodco menu
  try {
      fazerDataFi = await doFetch(
        'https://www.compass-group.fi/menuapi/feed/json?costNumber=3208&language=fi',
        true
      );

    console.log('karaportin menu', fazerDataFi);
  } catch (error) {
    // do something
  }

  try {
    fazerDataEn = await doFetch(
      'https://www.compass-group.fi/menuapi/feed/json?costNumber=3208&language=en',
      true
    );

    console.log('karaportin menu', fazerDataEn);
  } catch (error) {
    // do something
  }
})();

export {validator, sodexoData, fazerDataFi, fazerDataEn};
