'use strict';

import {validator, sodexoData} from "../../index";

const restaurantBox = document.querySelector('.main');
const randomCourseBox = document.getElementById('random-course');

const showMenu = (finnish, glutenFree) => {
  restaurantBox.innerHTML = '';

  console.log(sodexoData);

  for (const mealdates of sodexoData.mealdates) {
    const restaurantCard = document.createElement('div');
    restaurantCard.setAttribute('class', 'restaurant-card');
    restaurantBox.appendChild(restaurantCard);

    const date = document.createElement('div');
    date.setAttribute('class', 'date');
    date.innerHTML = mealdates.date;
    restaurantCard.appendChild(date);

    let i = 1;
    for (const index in mealdates.courses) {
      const course = mealdates.courses[index];

      const courseNumber = document.createElement('div');
      courseNumber.setAttribute('class', 'course-number');

      if (finnish === true) {
        courseNumber.innerHTML = `Annos ${i}`;
      } else {
        courseNumber.innerHTML = `Dish ${i}`;
      }
      restaurantCard.appendChild(courseNumber);

      let menu;
      if (finnish === true) {
        menu = course.title_fi;
      } else {
        menu = course.title_en;
      }

      restaurantCard.appendChild(courseNumber);

      // a cluster.f pyramid because some of dish objects dont have dietcodes name at all instead of value being empty
      if (glutenFree === true) {
        if (course.dietcodes !== undefined) {
          if (validator(menu) === true && course.dietcodes.includes('G')) {
            const courseName = document.createElement('div');
            courseName.setAttribute('class', 'course-name');
            courseName.innerHTML = `${menu} (${course.dietcodes})`;
            courseNumber.appendChild(courseName);

            const price = document.createElement('div');
            price.setAttribute('class', 'course-price');
            price.innerHTML = `${course.price}`;
            courseNumber.appendChild(price);
          } else {
            courseNumber.innerHTML = "";
          }
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
        }
      }
      i++;
    }
  }
};

const randomCourse = (finnish) => {

  const courses = sodexoData.mealdates.map(day => {

    if (finnish === true) {
      return Object.values(day.courses).map(course => course.title_fi);
    } else {
      return Object.values(day.courses).map(course => course.title_en);
    }
  }).flat();
  randomCourseBox.innerHTML = courses[Math.floor(Math.random() * courses.length)];
};

export {showMenu, randomCourse};

