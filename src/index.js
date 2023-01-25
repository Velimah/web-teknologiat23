'use strict';

// 1. Secret code
let secret = "hello";
let chars = "";
document.addEventListener('keypress', evt => {
  chars = chars + evt.key;

  console.log(evt.key);
  console.log(chars);

  if (chars === secret) {
    alert("Correct code.");
    chars = "";
  }
});

// 2. Double click coordinates
document.addEventListener('dblclick', evt => {
  const coordX = evt.clientX;
  const coordY = evt.clientY;

  const divX = document.querySelector('#x-coord');
  const divY = document.querySelector('#y-coord');

  divX.innerHTML = `X coordinate is ${coordX}`;
  divY.innerHTML = `Y coordinate is ${coordY}`;
});

// 3. React to touch
document.addEventListener('touchstart', evt => {
  console.log(evt);
  console.log('thank you for touching me.');
});

// 4. 15-second timer
setTimeout(() => alert("Hurry up, you've been browsing for 15 seconds!"), 15000);

// 5. 15-second idle timer
let startTime = Date.now();
let elapsedTime;

document.addEventListener('keydown', evt => {
  startTime = Date.now();
});

document.addEventListener('mousemove', evt => {
  startTime = Date.now();
});

document.addEventListener('click', evt => {
  startTime = Date.now();
});
const checkTime = () => {
  elapsedTime = Date.now() - startTime;

  if (elapsedTime >= 15000) {
    alert("Hurry up, you've been idling for 15 seconds!");
    startTime = Date.now();
  }
};

setInterval(checkTime, 10);
