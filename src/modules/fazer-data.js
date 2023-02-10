'use strict';

import {validator, fazerDataFi, fazerDataEn} from "../index";

const restaurantBox = document.querySelector('.main');
const randomCourseBox = document.getElementById('random-course');

const showMenuFazer = (finnish, glutenFree) => {
  restaurantBox.innerHTML = '';

  //chooses the correct language for menu
  let menu;
  if (finnish === true) {
    menu = fazerDataFi.MenusForDays;
  } else {
    menu = fazerDataEn.MenusForDays;
  }

  //gets the current weekdate number
  const dayNumber = new Date().getDay();

  for (const MenusForDays of menu) {

    //gets the weekdate number of daily menu
    const day = new Date(`${MenusForDays.Date}`);
    const menuDayNumber = day.getDay();

    //compares current day number to menu day number and shows today's menu.
    if (menuDayNumber === dayNumber) {

      //breaks the loop if its weekend preventing incomplete boxes.
      if (menuDayNumber === 6 || menuDayNumber === 0) {
        break;
      }

      //makes div container for the daily menu
      const restaurantCard = document.createElement('div');
      restaurantCard.setAttribute('class', 'restaurant-card');
      restaurantBox.appendChild(restaurantCard);

      const title = document.createElement('div');
      title.setAttribute('class', 'restaurant-title');
      title.innerHTML = 'Metropolia Karamalmi';
      restaurantCard.appendChild(title);

      // appends date of the daily menu and shortens it to appropriate format
      const date = document.createElement('div');
      date.setAttribute('class', 'date');
      date.innerHTML = `${day.toLocaleDateString('fi',
        {
          day: "numeric", month: 'numeric', year: 'numeric', weekday: 'long'
        }
      )}`;
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

export {showMenuFazer, randomCourseFazer};
