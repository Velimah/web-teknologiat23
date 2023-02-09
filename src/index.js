'use strict';

import {showMenu, randomCourse} from './modules/SodexoData/sodexo-data';
import {showFazerMenu, randomCourseFazer} from "./modules/FazerData/fazer-data";
import {doFetch} from './modules/network';

const restaurantSodexo = document.getElementById('restaurant-sodexo');
const restaurantFazer = document.getElementById('restaurant-fazer');
const languageButton = document.getElementById('language-button');
const glutenButton = document.getElementById('gluten-button');
const randomButton = document.getElementById('random-button');
const input = document.getElementById("search-input");
const background = document.querySelector('.header-picture-area');

//boleans for choosing restaurant, language and gluten-free meals
let sodexo = true;
let finnish = true;
let glutenFree = false;

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

languageButton.onclick = () => {
  if (finnish === true) {
    finnish = false;
    languageButton.innerHTML = 'English';
    glutenButton.innerHTML = 'Gluten-free';
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
    showMenu(finnish, glutenFree);
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
        elem.style.backgroundColor = '#E0437C';
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

  let mouseX = evt.clientX;
  let mouseY = evt.clientY;

  let cx = window.innerWidth / 2;
  let cy = window.innerHeight / 2;

  let fromCenterX = cx - mouseX;
  let fromCenterY = cy - mouseY;

  const layerOne = document.querySelector('.picture-text');
  layerOne.style.transform = 'translateX(' + fromCenterX / 200 + '%) translateY(' + fromCenterY / 200 + '%)';

});

export {validator, sodexoData, fazerDataFi, fazerDataEn};

