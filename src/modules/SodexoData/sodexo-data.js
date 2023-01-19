'use strict';

import LunchMenu from './assets/example.json';

const coursesFi = Object.values(LunchMenu.courses).
map(course => course.title_fi);
const coursesEn = Object.values(LunchMenu.courses).
map(course => course.title_en);

const textBox = document.getElementById('menu');
const randomCourseBox = document.getElementById('random-course');
const sodexoLanguageButton = document.getElementById('language-button');
const sodexoSortButton = document.getElementById('sort-button');
const sodexoRandomButton = document.getElementById('random-button');

let sodexoFi = true;
let sodexoAsc = true;

const showMenu = () => {
  textBox.innerHTML = '';
  if (sodexoFi === true) {
    for (const course of coursesFi) {
      let courseText = document.createElement('div');
      courseText.innerHTML = course;
      textBox.appendChild(courseText);
    }
  } else {
    for (const course of coursesEn) {
      let courseText = document.createElement('div');
      courseText.innerHTML = course;
      textBox.appendChild(courseText);
    }
  }
};

const sortCourses = (menu, order) => {
  if (order === 'asc') {
    menu.sort();
  } else {
    menu.reverse();
  }
};

const randomCourse = () => {
  if (sodexoFi === true) {
    randomCourseBox.innerHTML = coursesFi[Math.floor(
      Math.random() * coursesFi.length)];
  } else {
    randomCourseBox.innerHTML = coursesEn[Math.floor(
      Math.random() * coursesEn.length)];
  }
};

sodexoLanguageButton.onclick = () => {
  sodexoFi = sodexoFi !== true;
  showMenu();
};

sodexoSortButton.onclick = () => {
  if (sodexoFi === true && sodexoAsc === true) {
    sortCourses(coursesFi, 'asc');
  } else if (sodexoFi === true && sodexoAsc === false) {
    sortCourses(coursesFi, 'desc');
  } else if (sodexoFi === false && sodexoAsc === true) {
    sortCourses(coursesEn, 'asc');
  } else {
    sortCourses(coursesEn, 'desc');
  }
  sodexoAsc = sodexoAsc !== true;
  showMenu();
};

sodexoRandomButton.onclick = () => {
  randomCourse();
};

export {showMenu};
