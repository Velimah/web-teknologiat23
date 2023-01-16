'use strict';

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const time = document.querySelector('.time');
const guessCounter = document.querySelector('.guess-count');
const guessField = document.querySelector('.guessField');
const guessSubmit = document.querySelector('.guessSubmit');

let startTime;

const checkGuess = () => {

  startTime = Date.now();
  let userGuess;
  let guessCount;
  let totalArray = [];
  let guessCountArray = [];

  for (let i = 0; i < 1000; i++) {
    console.log('loop number:', i+1);

    let minGuessValue = 1;
    let maxGuessValue = 100;
    let guessesArray = [];
    let randomNumber = Math.floor(Math.random() * maxGuessValue) + minGuessValue;

    while (minGuessValue <= maxGuessValue) {

      userGuess = Math.floor((minGuessValue + maxGuessValue) / 2);
      guessesArray.push(userGuess);

      if (userGuess === randomNumber) {
        console.log(`The correct number was ${randomNumber}!`);
        break;
      } else if (userGuess < randomNumber) {
        minGuessValue = userGuess + 1;
        console.log(`Incorrect guess: ${userGuess} is too low`);
      } else {
        maxGuessValue = userGuess - 1;
        console.log(`Incorrect guess: ${userGuess} is too high`);
      }
    }
    totalArray.push(guessesArray);
    guessCountArray.push(guessesArray.length);
  }
  timer();
  console.log(totalArray);
  console.log(guessCountArray);

  const leastGuesses = guessCountArray.reduce((a, b) => Math.min(a, b));
  console.log(leastGuesses);

  const mostGuesses = guessCountArray.reduce((a, b) => Math.max(a, b));
  console.log(mostGuesses);

  const averageGuesses = guessCountArray.reduce((acc, current) => acc + current)/1000;
  console.log(averageGuesses);
};

guessSubmit.onclick = () => {
  checkGuess();
};

const timer = () => {
  const currentTime = Date.now();
  const totalTime = (currentTime - startTime) / 1000;
  const totalTimeDecimal = totalTime.toFixed(4);
  console.log('Time elapsed: ' + totalTimeDecimal + ' seconds.');
};
