'use strict';

import SodexoMenu from './assets/sodexo-week-data.json';
import {validator} from "../../index";

const sodexoTextBox = document.getElementById('container');
//const randomCourseBox = document.getElementById('random-course');
//const sodexoSortButton = document.getElementById('sort-button');
//const sodexoRandomButton = document.getElementById('random-button');

const showMenu = (finnish, veg) => {
  sodexoTextBox.innerHTML = '';

    for (const mealdates of SodexoMenu.mealdates) {
      const sodexCell = document.createElement('div');
      sodexCell.setAttribute('class', 'item');
      sodexoTextBox.appendChild(sodexCell);

      const sodexoDate = document.createElement('div');
      sodexoDate.setAttribute('class', 'date');
      sodexoDate.innerHTML = mealdates.date;
      sodexCell.appendChild(sodexoDate);

      for (const index in mealdates.courses) {
        const course = mealdates.courses[index];

        const sodexoCourseNumber = document.createElement('div');
        sodexoCourseNumber.setAttribute('class', 'course-number');
        sodexoCourseNumber.innerHTML = "Annos:";
        sodexCell.appendChild(sodexoCourseNumber);

        let menu;
        if (finnish === true) {
          menu = course.title_fi;
        } else {
          menu = course.title_en;
        }

        if (veg === true) {
          if (validator(course.title_fi) === true && course.properties.includes('G')) {
            const sodexoCourseName = document.createElement('div');
            sodexoCourseName.innerHTML = `${menu} (${course.properties})`;
            sodexoCourseNumber.appendChild(sodexoCourseName);
          }
        } else {
          if (validator(course.title_fi) === true) {
            const sodexoCourseName = document.createElement('div');
            sodexoCourseName.innerHTML = `${menu} (${course.properties})`;
            sodexoCourseNumber.appendChild(sodexoCourseName);
          }
        }
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

