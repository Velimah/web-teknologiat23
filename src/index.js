'use strict';

import {showMenu} from './modules/SodexoData/sodexo-data';
import {showFazerMenu} from "./modules/FazerData/fazer-data";

const restaurantSodexo = document.getElementById('restaurant-sodexo');
const restaurantFazer = document.getElementById('restaurant-fazer');
const languageButton = document.getElementById('language-button');
const glutenButton = document.getElementById('vegan-button');

let sodexo = true;
let finnish = true;
let veg = false;

//let ascending = true;

let validator = (string) => {
  const regexp = /^[A-ZÄÖÅ][A-ZÄÖÅa-zäöå0-9-/,()*\s]{3,100}$/;
  return regexp.test(string);
};

showMenu(finnish);

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
    languageButton.innerHTML='English';
    glutenButton.innerHTML='Gluten free';
    showMenus();
  } else {
    finnish = true;
    languageButton.innerHTML='Suomi';
    glutenButton.innerHTML='Gluteiiniton';
    showMenus();
  }
};

glutenButton.onclick = () => {
  if (veg === true) {
    veg = false;
    glutenButton.style.backgroundColor='#95db92';
    showMenus();
  } else {
    veg = true;
    glutenButton.style.backgroundColor='#1AE312FF';
    showMenus();
  }
};

const showMenus = () => {
  if (sodexo === true) {
    showMenu(finnish, veg);
  } else {
    showFazerMenu(finnish, veg);
  }
};

export {validator};
