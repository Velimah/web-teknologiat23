'use strict';

import FazerMenuFi from './assets/fazer-week-example.json';
import FazerMenuEn from './assets/fazer-week-example-en.json';
import {validator} from "../../index";

const fazerTextBox = document.getElementById('container');

const showFazerMenu = (finnish, veg) => {
  fazerTextBox.innerHTML = '';

  let menu;
  if (finnish === true) {
    menu = FazerMenuFi.MenusForDays;
  } else {
    menu = FazerMenuEn.MenusForDays;
  }

  for (const MenusForDays of menu) {

    const fazerCell = document.createElement('div');
    fazerCell.setAttribute('class', 'item');
    fazerTextBox.appendChild(fazerCell);

    const fazerDate = document.createElement('div');
    fazerDate.setAttribute('class', 'date');
    fazerDate.innerHTML = MenusForDays.Date.substring(0, 10);
    fazerCell.appendChild(fazerDate);

    for (const SetMenus of MenusForDays.SetMenus) {
      const fazerCourseNumber = document.createElement('div');
      fazerCourseNumber.setAttribute('class', 'course-number');
      fazerCourseNumber.innerHTML = "Annos:";
      fazerCell.appendChild(fazerCourseNumber);

      for (const component of SetMenus.Components) {
        if (veg === true) {
          if (validator(component) === true && component.includes(', G' || 'G,')) {
            const fazerCourseName = document.createElement('div');
            fazerCourseName.innerHTML = component;
            fazerCourseNumber.appendChild(fazerCourseName);
          }
        } else {
          if (validator(component) === true) {
            const fazerCourseName = document.createElement('div');
            fazerCourseName.innerHTML = component;
            fazerCourseNumber.appendChild(fazerCourseName);
          }
        }
      }
    }
  }
};

export {showFazerMenu};

