'use strict';

import {validator, fazerDataFi, fazerDataEn} from "../index";

const restaurantBox = document.querySelector('.main');
const randomCourseBox = document.getElementById('random-course');

const showMenuFazer = (finnish, glutenFree) => {
  restaurantBox.innerHTML = '';

  //chooses the correct language for menu and time
  let menu;
  let locales;
  if (finnish === true) {
    locales = 'fi';
    menu = fazerDataFi.MenusForDays;
  } else {
    locales = 'en';
    menu = fazerDataEn.MenusForDays;
  }

  //gets the current weekdate number
  const dayNumber = new Date().getDay();

  // gets the current days prices from finnish version of food&co .json and saves them into array
  let priceArray = [];
  for (const MenusForDays of fazerDataFi.MenusForDays) {
    const day = new Date(`${MenusForDays.Date}`);
    const menuDayNumber = day.getDay();
    //compares current day number to menu day number and then loops prices.
    if (menuDayNumber === dayNumber) {
      for (const SetMenus of MenusForDays.SetMenus) {
        priceArray.push(SetMenus.Price);
      }
    }
  }

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

      const dateString = day.toLocaleDateString(`${locales}`,
        {
          day: "numeric", month: 'numeric', year: 'numeric', weekday: 'long'
        }
      );
      //makes the first letter a capital letter
      const dateStringCapital = dateString.charAt(0).toUpperCase() + dateString.slice(1);
      date.innerHTML = `${dateStringCapital}`;
      restaurantCard.appendChild(date);

      const priceDescription = document.createElement('div');
      priceDescription.setAttribute('class', 'price-description');
      if (finnish === true) {
        priceDescription.innerHTML = `Hinnat: Opiskelijat / Henkilökunta / Muut`;
      } else {
        priceDescription.innerHTML = `Prices: Students / Staff / Other`;
      }
      restaurantCard.appendChild(priceDescription);

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

            console.log(component);
            //validates dish name and searches for different 'G' markers for gluten-free
            if (validator(component) === true && !component.includes(', G') && !component.includes('G, ') && !component.includes('(G')) {
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

        // gets the price from price array saved from the finnish .json
        const price = document.createElement('div');
        price.setAttribute('class', 'course-price');
        // splits the price string and adds spaces and euro sign
        price.innerHTML = `${priceArray[i - 1].substring(0, 4)} € / ${priceArray[i - 1].substring(5, 9)} € / ${priceArray[i - 1].substring(10, 14)} €`;
        courseNumber.appendChild(price);

        // removes dish data if there are no gluten-free options
        const nodes = courseNumber.childNodes;
        if(nodes.length < 3) {
          courseNumber.style.display = "none";
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
