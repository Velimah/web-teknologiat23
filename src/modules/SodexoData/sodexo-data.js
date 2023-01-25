'use strict';

import SodexoMenu from './assets/sodexo-week-data.json';
import {validator} from "../../index";

const sodexoTextBox = document.getElementById('container');
const randomCourseBox = document.getElementById('random-course');
//const sodexoSortButton = document.getElementById('sort-button');

const showMenu = (finnish, gluten) => {
  sodexoTextBox.innerHTML = '';

  for (const mealdates of SodexoMenu.mealdates) {
    const sodexoCell = document.createElement('div');
    sodexoCell.setAttribute('class', 'item');
    sodexoTextBox.appendChild(sodexoCell);

    const sodexoDate = document.createElement('div');
    sodexoDate.setAttribute('class', 'date');
    sodexoDate.innerHTML = mealdates.date;
    sodexoCell.appendChild(sodexoDate);

    let i = 1;
    for (const index in mealdates.courses) {
      const course = mealdates.courses[index];

      const sodexoCourseNumber = document.createElement('div');
      sodexoCourseNumber.setAttribute('class', 'course-number');

      if (finnish === true) {
        sodexoCourseNumber.innerHTML = `Annos ${i}`;
      } else {
        sodexoCourseNumber.innerHTML = `Dish ${i}`;
      }
      sodexoCell.appendChild(sodexoCourseNumber);

      let menu;
      if (finnish === true) {
        menu = course.title_fi;
      } else {
        menu = course.title_en;
      }

      sodexoCell.appendChild(sodexoCourseNumber);

      if (gluten === true) {

        if (validator(menu) === true && course.properties.includes('G')) {
          const sodexoCourseName = document.createElement('div');
          sodexoCourseName.innerHTML = `${menu} (${course.properties})`;
          sodexoCourseNumber.appendChild(sodexoCourseName);
        }
      } else {
        if (validator(menu) === true) {
          const sodexoCourseName = document.createElement('div');
          sodexoCourseName.innerHTML = `${menu} (${course.properties})`;
          sodexoCourseNumber.appendChild(sodexoCourseName);
        }
      }
      const sodexoPrice = document.createElement('div');
      sodexoPrice.innerHTML = `${course.price}`;
      sodexoCell.appendChild(sodexoPrice);

      i++;
    }
  }
};

const randomCourse = (finnish) => {

  const courses = SodexoMenu.mealdates.map(day => {

    if (finnish === true) {
      return Object.values(day.courses).map(course => course.title_fi);
    } else {
      return Object.values(day.courses).map(course => course.title_en);
    }
  }).flat();
  randomCourseBox.innerHTML = courses[Math.floor(Math.random() * courses.length)];
};

export {showMenu, randomCourse};

