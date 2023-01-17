'use strict';

const array =
  [
    {name: 'Lingonberry jam', price: 4.00},
    {name: 'Mushroom and bean casserole', price: 5.50},
    {name: 'Chili-flavoured wheat', price: 3.00},
    {name: 'Vegetarian soup', price: 4.80},
    {name: 'Pureed root vegetable soup with smoked cheese', price: 8.00}
  ];

let validator = (string) => {
  let regexp = /^[A-ZÄÖÅ][A-ZÄÖÅa-zäöå0-9-/,()\s]{3,63}$/;
  return regexp.test(string);
};

const sortedByPrice = array.sort((a, b) => a.price - b.price);
console.log('Sorted by price', sortedByPrice);

const filtered = array.filter(item => item.price <= 5);
console.log('Costing max 5e', filtered);

const multiplied = array.map(number => parseFloat((number.price * 1.15).toFixed(2)));
console.log('Prices increased by 15%', multiplied);

const sum = array.reduce((a, b) => ({price: a.price + b.price}));
console.log('Total cost of menu', sum);


