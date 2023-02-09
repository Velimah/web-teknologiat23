'use strict';

import {validator, sodexoData} from "../../index";

const restaurantBox = document.querySelector('.main');
const randomCourseBox = document.getElementById('random-course');

const showMenu = (finnish, glutenFree) => {
  restaurantBox.innerHTML = '';

  for (const mealdates of sodexoData.mealdates) {

    //makes div container for the daily menu
    const restaurantCard = document.createElement('div');
    restaurantCard.setAttribute('class', 'restaurant-card');
    restaurantBox.appendChild(restaurantCard);

    const date = document.createElement('div');
    date.setAttribute('class', 'date');
    date.innerHTML = mealdates.date;
    restaurantCard.appendChild(date);

    //index for dish numbers
    let i = 1;
    for (const index in mealdates.courses) {
      const course = mealdates.courses[index];

      const courseNumber = document.createElement('div');
      courseNumber.setAttribute('class', 'course-number');

      //chooses the correct naming for dish depending on language
      if (finnish === true) {
        courseNumber.innerHTML = `Annos ${i}`;
      } else {
        courseNumber.innerHTML = `Dish ${i}`;
      }
      restaurantCard.appendChild(courseNumber);

      //chooses the correct dish name depending on language
      let menu;
      if (finnish === true) {
        menu = course.title_fi;
      } else {
        menu = course.title_en;
      }

      restaurantCard.appendChild(courseNumber);

      //checks if user wants to see only gluten-free dishes
      if (glutenFree === true) {

        // a cluster.f pyramid because some dish objects don't have 'dietcodes' key at all instead of value being empty
        if (course.dietcodes !== undefined) {

          //validates dish name and searches for 'G' marker for gluten-free
          if (validator(menu) === true && course.dietcodes.includes('G')) {
            const courseName = document.createElement('div');
            courseName.setAttribute('class', 'course-name');
            courseName.innerHTML = `${menu} (${course.dietcodes})`;
            courseNumber.appendChild(courseName);

            const price = document.createElement('div');
            price.setAttribute('class', 'course-price');
            price.innerHTML = `${course.price}`;
            courseNumber.appendChild(price);

            // removes dish data if it is not gluten-free
          } else {
            courseNumber.innerHTML = "";
          }
          // removes dish data if it is not gluten-free
        } else {
          courseNumber.innerHTML = "";
        }

      } else {
        if (validator(menu) === true) {
          const courseName = document.createElement('div');
          courseName.setAttribute('class', 'course-name');
          courseName.innerHTML = `${menu} (${course.dietcodes})`;
          courseNumber.appendChild(courseName);

          const price = document.createElement('div');
          price.setAttribute('class', 'course-price');
          price.innerHTML = `${course.price}`;
          courseNumber.appendChild(price);

          // removes dish data if it doesn't pass validation
        } else {
          courseNumber.innerHTML = "";
        }
      }
      // increases the dish number index
      i++;
    }
  }
};

const randomCourse = (finnish) => {

  //maps all the menu items and flattens the arrays into one.
  const courses = sodexoData.mealdates.map(day => {
    if (finnish === true) {
      return Object.values(day.courses).map(course => course.title_fi);
    } else {
      return Object.values(day.courses).map(course => course.title_en);
    }
  }).flat();

  // gives a random item from the array
  randomCourseBox.innerHTML = courses[Math.floor(Math.random() * courses.length)];
};

export {showMenu, randomCourse};

