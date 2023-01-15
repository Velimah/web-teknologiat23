'use strict';

const coursesEn = ["Hamburger, cream sauce and poiled potates",
  "Goan style fish curry and whole grain rice",
  "Vegan Chili sin carne and whole grain rice",
  "Broccoli puree soup, side salad with two napas",
  "Lunch baguette with BBQ-turkey filling",
  "Cheese / Chicken / Vege / Halloum burger and french fries"];

const coursesFi = ["Jauhelihapihvi, ruskeaa kermakastiketta ja keitettyä perunaa",
  "Goalaista kalacurrya ja täysjyväriisiä",
  "vegaani Chili sin carne ja täysjyväriisi",
  "Parsakeittoa,lisäkesalaatti kahdella napaksella",
  "Lunch baguette with BBQ-turkey filling",
  "Juusto / Kana / Kasvis / Halloumi burgeri ja ranskalaiset"];

const textBox = document.getElementById("menu");
const randomCourseBox = document.getElementById("random-course");
const languageButton = document.getElementById("language-button");
const sortButton = document.getElementById("sort-button");
const randomButton = document.getElementById("random-button");
let fi = true;
let asc = true;

const showMenu = () => {

  textBox.innerHTML = '';
  if (fi === true) {
    for (const course of coursesFi) {
      let courseText = document.createElement('p');
      courseText.innerHTML = course;
      textBox.appendChild(courseText);
    }

  } else {
    for (const course of coursesEn) {
      let courseText = document.createElement('p');
      courseText.innerHTML = course;
      textBox.appendChild(courseText);
    }
  }

};

languageButton.onclick = () => {
  fi = fi !== true;
  showMenu();
};

const sortCourses = (menu, order) => {
  if (order === "asc") {
    menu.sort();
  } else {
    menu.reverse();
  }
};

sortButton.onclick = () => {
  if (fi === true && asc === true) {
    sortCourses(coursesFi, "asc");
  } else if (fi === true && asc === false) {
    sortCourses(coursesFi, "desc");
  } else if (fi === false && asc === true) {
    sortCourses(coursesEn, "asc");
  } else {
    sortCourses(coursesEn, "desc");
  }

  asc = asc !== true;
  showMenu();

};

const RandomCourse = () => {
  if (fi === true) {
    randomCourseBox.innerHTML = coursesFi[Math.floor(Math.random() * coursesFi.length)];
  } else {
    randomCourseBox.innerHTML = coursesEn[Math.floor(Math.random() * coursesEn.length)];
  }
};

randomButton.onclick = () => {
  RandomCourse();
};

showMenu();
