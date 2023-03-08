'use strict';

const restaurantBox = document.querySelector('#lunch-container');

const renderMenuSodexo = (finnish, menu) => {
  restaurantBox.innerHTML = '';

  //gets the current weekdate number
  const day = new Date();
  const dayNumber = day.getDay();

  //makes div container for the daily menu
  const restaurantCard = document.createElement('div');
  restaurantCard.setAttribute('class', 'restaurant-card');
  restaurantBox.appendChild(restaurantCard);

  const title = document.createElement('div');
  title.setAttribute('class', 'restaurant-title');
  title.innerHTML = `Sodexo ${menu.meta.ref_title}`;
  restaurantCard.appendChild(title);

  let locales;
  if (finnish === true) {
    locales = 'fi';
  } else {
    locales = 'en';
  }

  // appends date of the and shortens it to appropriate format
  const date = document.createElement('div');
  date.setAttribute('class', 'date');

  const dateString = day.toLocaleDateString(`${locales}`,
    {
      day: "numeric", month: 'numeric', year: 'numeric', weekday: 'long'
    }
  );
  //makes the first letter a capital letter
  date.innerHTML = dateString.charAt(0).toUpperCase() + dateString.slice(1);
  restaurantCard.appendChild(date);

  // chooses the correct pricing info based on language
  const priceDescription = document.createElement('div');
  priceDescription.setAttribute('class', 'price-description');
  if (finnish === true) {
    priceDescription.innerHTML = `Hinnat: Opiskelijat / Avoin AMK opiskelijat / Muut`;
  } else {
    priceDescription.innerHTML = `Prices: Students / Open UAS students / Other`;
  }
  restaurantCard.appendChild(priceDescription);

  // index for menus by date
  let index = 1;

  for (const mealdates of menu.mealdates) {

    // if current day matches the correct index in daily menus, prints the days menu
    if (index === dayNumber) {

      for (const index in mealdates.courses) {
        const course = mealdates.courses[index];

        // gets the food category
        const courseNumber = document.createElement('div');
        courseNumber.setAttribute('class', 'course-number');
        restaurantCard.appendChild(courseNumber);

        const courseCategory = document.createElement('div');
        courseCategory.setAttribute('class', 'course-category');
        // Makes only the first letter capital
        const category = course.category;
        courseCategory.innerHTML = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
        courseNumber.appendChild(courseCategory);

        //chooses the correct dish name depending on language and Capital first letter
        let menu;
        if (finnish === true) {
          menu = course.title_fi.charAt(0).toUpperCase() + course.title_fi.slice(1).toLowerCase();
        } else {
          menu = course.title_en.charAt(0).toUpperCase() + course.title_en.slice(1).toLowerCase();
        }

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
    // increases the menu day index
    index++;
  }
};
export {renderMenuSodexo};
