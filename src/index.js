'use strict';
import LunchMenu from './assets/fazer.json';

const array =
  [
    {name: 'Lingonberry jam', price: 4.00},
    {name: 'Mushroom and bean casserole', price: 5.50},
    {name: 'Chili-flavoured wheat', price: 3.00},
    {name: 'Vegetarian soup', price: 4.80},
    {name: 'Pureed root vegetable soup with smoked cheese', price: 8.00}
  ];

let validator = (string) => {
  let regexp = /^[A-ZÄÖÅ][A-ZÄÖÅa-zäöå0-9-/,()*\s]{3,63}$/;
  return regexp.test(string);
};

/*
const sortByPrice = (array) => {
    array.sort((a, b) => {
    return a.price - b.price;
  });
  console.log('Sorted by price', array);
};
sortByPrice(array);
*/

const filtered = array.filter(item => {
  return item.price <= 5;
});
console.log('Costing max 5e:', filtered);


const sum = array.reduce((acc, curr) => {
  acc.price += curr.price;
  return acc;
});
console.log('Total cost of menu:', sum.price);


const multiplied = array.map(item => {
  item.price = parseFloat((item.price * 1.15).toFixed(2));
  return item;
});
console.log('Prices increased by 15%:', multiplied);

const sortedByPrice = array.sort((a, b) => {
  return a.price - b.price;
});
console.log('Sorted by price:', sortedByPrice);

// Menus containing vegan items
for (const MenusForDays of LunchMenu.MenusForDays) {
  for (const SetMenus of MenusForDays.SetMenus) {
    let someContain = SetMenus.Components.some(element => element.includes("Veg") && validator(element) === true);
    if (someContain) {
      console.log('Menus containing vegan items:', SetMenus.Components);
    }
  }
}

// Menus containing only vegan items
for (const MenusForDays of LunchMenu.MenusForDays) {
  for (const SetMenus of MenusForDays.SetMenus) {
    let everyContain = SetMenus.Components.every(element => element.includes("Veg") && validator(element) === true);
    if (everyContain) {
      console.log('Menus containing only vegan items:', SetMenus.Components);
    }
  }
}

// All vegan food items
for (const MenusForDays of LunchMenu.MenusForDays) {
  for (const SetMenus of MenusForDays.SetMenus) {
    for (const component of SetMenus.Components) {
      if (validator(component) === true && component.includes("Veg")) {
        console.log('Vegan food items:', component);
      }
    }
  }
}
