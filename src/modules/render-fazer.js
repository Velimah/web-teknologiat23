'use strict';

const restaurantBox = document.querySelector('.main');

const renderMenuFazer = (finnish, menu) => {
  restaurantBox.innerHTML = '';

  //chooses the correct language for time
  let locales;
  if (finnish === true) {
    locales = 'fi';
  } else {
    locales = 'en';
  }

  //gets the current weekdate number
  const dayNumber = new Date().getDay();

  const day = new Date();

  //makes div container for the daily menu
  const restaurantCard = document.createElement('div');
  restaurantCard.setAttribute('class', 'restaurant-card');
  restaurantBox.appendChild(restaurantCard);

  const title = document.createElement('div');
  title.setAttribute('class', 'restaurant-title');

  if (menu.RestaurantName === "Luova") {
    title.innerHTML = 'Food & Co Metropolia Arabia';
  } else {
    title.innerHTML = 'Food & Co Metropolia Karamalmi';
  }
  restaurantCard.appendChild(title);

  // appends date and shortens it to appropriate format
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

  // chooses the correct pricing info based on language
  const priceDescription = document.createElement('div');
  priceDescription.setAttribute('class', 'price-description');
  if (finnish === true) {
    priceDescription.innerHTML = `Hinnat: Opiskelijat / Henkilökunta / Muut`;
  } else {
    priceDescription.innerHTML = `Prices: Students / Staff / Other`;
  }
  restaurantCard.appendChild(priceDescription);

  for (const MenusForDays of menu.MenusForDays) {

    //gets the weekdate number of daily menu
    const menuDay = new Date(`${MenusForDays.Date}`);
    const menuDayNumber = menuDay.getDay();

    //compares current day number to menu day number and shows the correct menu.
    if (menuDayNumber === dayNumber) {

      //breaks the loop if its weekend preventing incomplete boxes.
      if (menuDayNumber === 6 || menuDayNumber === 0) {
        break;
      }
      //index for dish numbers
      let i = 1;
      for (const SetMenus of MenusForDays.SetMenus) {

        const courseNumber = document.createElement('div');
        courseNumber.setAttribute('class', 'course-number');
        restaurantCard.appendChild(courseNumber);

        const courseCategory = document.createElement('div');
        courseCategory.setAttribute('class', 'course-category');

        //chooses the correct naming for dish depending on language
        if (finnish === true) {
          courseCategory.innerHTML = `Annos ${i}`;
        } else {
          courseCategory.innerHTML = `Dish ${i}`;
        }
        courseNumber.appendChild(courseCategory);

        for (const component of SetMenus.Components) {
          //makes the first letter capital
          const componentCapital = component.charAt(0).toUpperCase() + component.slice(1);

          const courseName = document.createElement('div');
          courseName.setAttribute('class', 'course-name');
          courseName.innerHTML = componentCapital;
          courseNumber.appendChild(courseName);

        }

        // gets the price from price array saved from the finnish .json
        const price = document.createElement('div');
        price.setAttribute('class', 'course-price');

        // checks if price is missing from json
        if (SetMenus.Price !== null) {
        // splits the price string and adds spaces and euro sign
        price.innerHTML = `${SetMenus.Price.substring(0, 4)} € / ${SetMenus.Price.substring(5, 9)} € / ${SetMenus.Price.substring(10, 14)} €`;
        courseNumber.appendChild(price);
        } else {
          price.innerHTML = `Hinnat puuttuu`;
          courseNumber.appendChild(price);
        }
        // increases the dish number index
        i++;
      }
    }
  }
};

export {renderMenuFazer};
