'use strict';

import {validator, fazerDataFi, fazerDataEn} from "../../index";

const restaurantBox = document.querySelector('.main');
const randomCourseBox = document.getElementById('random-course');

const showFazerMenu = (finnish, glutenFree) => {
  restaurantBox.innerHTML = '';

  let menu;
  if (finnish === true) {
    menu = fazerDataFi.MenusForDays;
  } else {
    menu = fazerDataEn.MenusForDays;
  }

  for (const MenusForDays of menu) {
    const restaurantCard = document.createElement('div');
    restaurantCard.setAttribute('class', 'restaurant-card');
    restaurantBox.appendChild(restaurantCard);

    const date = document.createElement('div');
    date.setAttribute('class', 'date');
    date.innerHTML = MenusForDays.Date.substring(0, 10);
    restaurantCard.appendChild(date);

    let i = 1;
    for (const SetMenus of MenusForDays.SetMenus) {
      const courseNumber = document.createElement('div');
      courseNumber.setAttribute('class', 'course-number');

      if (finnish === true) {
        courseNumber.innerHTML = `Annos ${i}`;
      } else {
        courseNumber.innerHTML = `Dish ${i}`;
      }
      restaurantCard.appendChild(courseNumber);

      for (const component of SetMenus.Components) {
        if (glutenFree === true) {
          if (validator(component) === true && component.includes(', G' || 'G,')) {
            const courseName = document.createElement('div');
            courseName.setAttribute('class', 'course-name');
            courseName.innerHTML = component;
            courseNumber.appendChild(courseName);
          }
        } else {
          if (validator(component) === true) {
            const courseName = document.createElement('div');
            courseName.setAttribute('class', 'course-name');
            courseName.innerHTML = component;
            courseNumber.appendChild(courseName);
          }
        }
      }
      if (SetMenus.Price !== null) {
        const price = document.createElement('div');
        price.setAttribute('class', 'course-price');
        price.innerHTML = `${SetMenus.Price}`;
        restaurantCard.appendChild(price);
      }
      i++;
    }
  }
};

const randomCourseFazer = (finnish) => {

  let menu;
  if (finnish === true) {
    menu = fazerDataFi.MenusForDays;
  } else {
    menu = fazerDataEn.MenusForDays;
  }

  let components = menu.map(day => day.SetMenus.map(menu => menu.Components)).flat().flat();
  randomCourseBox.innerHTML = components[Math.floor(Math.random() * components.length)];
};

export {showFazerMenu, randomCourseFazer};
