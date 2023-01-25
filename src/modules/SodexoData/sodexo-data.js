'use strict';

import SodexoMenu from './assets/sodexo-week-data.json';
import {validator} from "../../index";

const sodexoTextBox = document.getElementById('container');
//const randomCourseBox = document.getElementById('random-course');
//const sodexoSortButton = document.getElementById('sort-button');
//const sodexoRandomButton = document.getElementById('random-button');

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


/*
const sortCourses = (menu, order) => {
  if (order === 'asc') {
    menu.sort();
  } else {
    menu.reverse();
  }
};

const randomCourse = (finnish) => {
  if (finnish === true) {
    randomCourseBox.innerHTML = coursesFi[Math.floor(
      Math.random() * coursesFi.length)];
  } else {
    randomCourseBox.innerHTML = coursesEn[Math.floor(
      Math.random() * coursesEn.length)];
  }
};

sodexoSortButton.onclick = (ascending) => {
  if (finnish === true && ascending === true) {
    sortCourses(coursesFi, 'asc');
  } else if (finnish === true && ascending === false) {
    sortCourses(coursesFi, 'desc');
  } else if (finnish === false && ascending === true) {
    sortCourses(coursesEn, 'asc');
  } else {
    sortCourses(coursesEn, 'desc');
  }
  ascending = ascending !== true;
  showMenu();
};

sodexoRandomButton.onclick = () => {
  randomCourse();
};
*/

export {showMenu};

