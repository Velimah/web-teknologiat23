'use strict';

import {validator, fazerDataFi, fazerDataEn} from "../../index";

const restaurantBox = document.querySelector('.main');
const randomCourseBox = document.getElementById('random-course');

const showFazerMenu = (finnish, glutenFree) => {
  restaurantBox.innerHTML = '';

  //chooses the correct language for menu
  let menu;
  if (finnish === true) {
    menu = fazerDataFi.MenusForDays;
  } else {
    menu = fazerDataEn.MenusForDays;
  }


  for (const MenusForDays of menu) {

    //gets the weekdate number
    const d = new Date(`${MenusForDays.Date}`);
    let day = d.getDay();

    //breaks the loop if its weekend preventing incomplete boxes, as foodco doesn't have food for weekend.
    if (day === 6 || day === 0) {
      break;
    }

    //makes div container for the daily menu
    const restaurantCard = document.createElement('div');
    restaurantCard.setAttribute('class', 'restaurant-card');
    restaurantBox.appendChild(restaurantCard);

    // appends date of the daily menu and shortens it to appropriate format
    const date = document.createElement('div');
    date.setAttribute('class', 'date');
    date.innerHTML = MenusForDays.Date.substring(0, 10);
    restaurantCard.appendChild(date);

    //index for dish numbers
    let i = 1;
    for (const SetMenus of MenusForDays.SetMenus) {
      const courseNumber = document.createElement('div');
      courseNumber.setAttribute('class', 'course-number');

      //chooses the correct naming for dish depending on language
      if (finnish === true) {
        courseNumber.innerHTML = `Annos ${i}`;
      } else {
        courseNumber.innerHTML = `Dish ${i}`;
      }
      restaurantCard.appendChild(courseNumber);

      for (const component of SetMenus.Components) {

        //checks if user wants to see only gluten-free dishes
        if (glutenFree === true) {

          //validates dish name and searches for 'G' marker for gluten-free
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

            // removes dish data if it doesn't pass validation
          }
        }
      }

      // checks if the menu has a price and then appends it
      if (SetMenus.Price !== null) {
        const price = document.createElement('div');
        price.setAttribute('class', 'course-price');
        price.innerHTML = `${SetMenus.Price}`;
        restaurantCard.appendChild(price);
      }
      // increases the dish number index
      i++;
    }
  }
};

const randomCourseFazer = (finnish) => {

  //checks the menu language
  let menu;
  if (finnish === true) {
    menu = fazerDataFi.MenusForDays;
  } else {
    menu = fazerDataEn.MenusForDays;
  }

  //maps all the menu items and flattens the arrays into one.
  let components = menu.map(day => day.SetMenus.map(menu => menu.Components)).flat().flat();

  // gives a random item from the array
  randomCourseBox.innerHTML = components[Math.floor(Math.random() * components.length)];
};

export {showFazerMenu, randomCourseFazer};

