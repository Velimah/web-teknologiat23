'use strict';

import {showMenu, randomCourse} from './modules/SodexoData/sodexo-data';
import {showFazerMenu, randomCourseFazer} from "./modules/FazerData/fazer-data";

const restaurantSodexo = document.getElementById('restaurant-sodexo');
const restaurantFazer = document.getElementById('restaurant-fazer');
const languageButton = document.getElementById('language-button');
const glutenButton = document.getElementById('gluten-button');
const randomButton = document.getElementById('random-button');

let sodexo = true;
let finnish = true;
let gluten = false;

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

showMenu(finnish, gluten);

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
  if (gluten === true) {
    gluten = false;
    glutenButton.style.backgroundColor = 'var(--supp-color-lgreen)';
    showMenus();
  } else {
    gluten = true;
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
    showMenu(finnish, gluten);
    restaurantSodexo.style.backgroundColor = 'var(--main-color-green)';
    restaurantFazer.style.backgroundColor = 'var(--supp-color-lgreen)';
  } else {
    showFazerMenu(finnish, gluten);
    restaurantSodexo.style.backgroundColor = 'var(--supp-color-lgreen)';
    restaurantFazer.style.backgroundColor = 'var(--main-color-green)';
  }
};


export {validator};
