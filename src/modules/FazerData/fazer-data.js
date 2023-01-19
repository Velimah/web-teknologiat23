'use strict';

import FazerMenuFi from './assets/fazer-week-example.json';
import FazerMenuEn from './assets/fazer-week-example-en.json';

const fazerTextBox = document.getElementById('container');
const fazerLanguageButton = document.getElementById('fazer-language-button');
const fazerVegButton = document.getElementById('fazer-veg-button');

let fazerFi = true;
let fazerVeg = false;

let validator = (string) => {
  let regexp = /^[A-ZÄÖÅ][A-ZÄÖÅa-zäöå0-9-/,()*\s]{3,63}$/;
  return regexp.test(string);
};

const showFazerMenu = () => {
  fazerTextBox.innerHTML = '';

  if (fazerFi === true) {
    for (const MenusForDays of FazerMenuFi.MenusForDays) {

      let fazerCell = document.createElement('div');
      fazerCell.setAttribute('class', 'item');
      fazerTextBox.appendChild(fazerCell);

      let fazerDate = document.createElement('div');
      fazerDate.setAttribute('class', 'fazer-date');
      fazerDate.innerHTML = MenusForDays.Date.substring(0, 10);
      fazerCell.appendChild(fazerDate);

      for (const SetMenus of MenusForDays.SetMenus) {
        let fazerCourseNumber = document.createElement('div');
        fazerCourseNumber.setAttribute('class', 'course-number');
        fazerCourseNumber.innerHTML = "Annos:";
        fazerCell.appendChild(fazerCourseNumber);

        for (const component of SetMenus.Components) {

          if (fazerVeg === true) {
            if (validator(component) === true && component.includes("Veg")) {
              let fazerCourseName = document.createElement('div');
              fazerCourseName.innerHTML = component;
              fazerCourseNumber.appendChild(fazerCourseName);
            }
          } else {
            if (validator(component) === true) {
              let fazerCourseName = document.createElement('div');
              fazerCourseName.innerHTML = component;
              fazerCourseNumber.appendChild(fazerCourseName);
            }
          }
        }
      }
    }
  } else {
    for (const MenusForDays of FazerMenuEn.MenusForDays) {

      let fazerCell = document.createElement('div');
      fazerCell.setAttribute('class', 'item');
      fazerTextBox.appendChild(fazerCell);

      let fazerDate = document.createElement('div');
      fazerDate.setAttribute('class', 'fazer-date');
      fazerDate.innerHTML = MenusForDays.Date.substring(0, 10);
      fazerCell.appendChild(fazerDate);

      for (const SetMenus of MenusForDays.SetMenus) {
        console.log(SetMenus);
        let fazerCourseNumber = document.createElement('div');
        fazerCourseNumber.setAttribute('class', 'course-number');
        fazerCourseNumber.innerHTML = "Dish:";
        fazerCell.appendChild(fazerCourseNumber);

        for (const component of SetMenus.Components) {
          if (fazerVeg === true) {
            if (validator(component) === true && component.includes("Veg")) {
              let fazerCourseName = document.createElement('div');
              fazerCourseName.innerHTML = component;
              fazerCourseNumber.appendChild(fazerCourseName);
            }
          } else {
            if (validator(component) === true) {
              let fazerCourseName = document.createElement('div');
              fazerCourseName.innerHTML = component;
              fazerCourseNumber.appendChild(fazerCourseName);
            }
          }
        }
      }
    }
  }

};

fazerLanguageButton.onclick = () => {
  fazerFi = fazerFi !== true;
  showFazerMenu();
};

fazerVegButton.onclick = () => {
  fazerVeg = fazerVeg !== true;
  showFazerMenu();
};

export {showFazerMenu};
