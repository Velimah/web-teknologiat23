'use strict';

import {validator, sodexoData} from "../index";

const restaurantBox = document.querySelector('.main');
const randomCourseBox = document.getElementById('random-course');

const showMenuSodexo = (finnish, glutenFree) => {
  restaurantBox.innerHTML = '';

  //gets the current weekdate number
  const day = new Date();
  const dayNumber = day.getDay();

  // index for menus by date
  let index = 1;

  for (const mealdates of sodexoData.mealdates) {

    // if current day matches the correct index in daily menus, prints the days menu
    if (index === dayNumber) {

      //makes div container for the daily menu
      const restaurantCard = document.createElement('div');
      restaurantCard.setAttribute('class', 'restaurant-card');
      restaurantBox.appendChild(restaurantCard);

      const title = document.createElement('div');
      title.setAttribute('class', 'restaurant-title');
      title.innerHTML = sodexoData.meta.ref_title;
      restaurantCard.appendChild(title);

      let locales;
      if (finnish === true) {
        locales = 'fi';
      } else {
        locales = 'en';
      }

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

        //checks if user wants to see only gluten-free dishes
        if (glutenFree === true) {

          // a cluster.f pyramid because some dish objects don't have 'dietcodes' key at all instead of value being empty
          if (course.dietcodes !== undefined) {

            //validates dish name and searches for 'G' marker for gluten-free
            if (validator(menu) === true && !course.dietcodes.includes('G')) {
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
              courseNumber.style.display = "none";
            }
            // removes dish data if it is not gluten-free
          } else {
            courseNumber.style.display = "none";
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
            courseNumber.style.display = "none";
          }
        }
        // increases the dish number index
        i++;
      }
    }
    // increases the menu day index
    index++;
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

export {showMenuSodexo, randomCourse};
