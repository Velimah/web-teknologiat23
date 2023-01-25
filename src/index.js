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

//let ascending = true;

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
    glutenButton.innerHTML = 'Gluteiiniton';
    showMenus();
  }
};

glutenButton.onclick = () => {
  if (gluten === true) {
    gluten = false;
    glutenButton.style.backgroundColor = '#95db92';
    showMenus();
  } else {
    gluten = true;
    glutenButton.style.backgroundColor = '#1AE312FF';
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
  } else {
    showFazerMenu(finnish, gluten);
  }
};

export {validator};
