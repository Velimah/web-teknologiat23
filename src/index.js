'use strict';
const iterations = document.querySelector('.iterations');
const minGuess = document.querySelector('.min-count');
const maxGuess = document.querySelector('.max-count');
const avgGuess = document.querySelector('.avg-count');
const time = document.querySelector('.time');
const iterationSubmit = document.querySelector('.iterationSubmit');
const iterationField = document.querySelector('.iterationField');

let startTime;

// Uses binary search algorithm to halve the group of possible answers each try.
// Chooses the middle number of group and if the number is lower,
// then chooses the middle number of the lower group and so on. Maximum number of searches is 7.
// example: 50(higher) -> 75(lower) -> 62(lower) -> 56(higher) -> 59(higher) -> 60(higher) -> 61(correct)
const checkGuess = () => {

  startTime = Date.now();
  let userGuess;
  let totalArray = [];
  let guessCountArray = [];
  const iterationCount = Number(iterationField.value);

  for (let i = 0; i < iterationCount; i++) {
    console.log('loop number:', i + 1);

    let minGuessValue = 1;
    let maxGuessValue = 100;
    let guessesArray = [];
    let randomNumber = Math.floor(Math.random() * maxGuessValue) + minGuessValue;

    while (minGuessValue <= maxGuessValue) {

      userGuess = Math.floor((minGuessValue + maxGuessValue) / 2);
      guessesArray.push(userGuess);

      if (userGuess === randomNumber) {
        console.log(`Correct! The number was ${userGuess}`);
        break;
      } else if (userGuess < randomNumber) {
        minGuessValue = userGuess + 1;
        console.log(`${userGuess} is too low`);
      } else {
        maxGuessValue = userGuess - 1;
        console.log(`${userGuess} is too high`);
      }
    }
    totalArray.push(guessesArray);
    guessCountArray.push(guessesArray.length);
  }
  console.log('All results', totalArray);
  console.log('All guess-counts', guessCountArray);

  timer();

  iterations.textContent = `Iterations: ${iterationCount}.`;
  console.log(`Iterations: ${iterationCount}`);

  const leastGuesses = guessCountArray.reduce((a, b) => Math.min(a, b));
  console.log(`Min quesses: ${leastGuesses}`);
  minGuess.textContent = `Min quesses: ${leastGuesses}`;

  const mostGuesses = guessCountArray.reduce((a, b) => Math.max(a, b));
  console.log(`Max guesses: ${mostGuesses}`);
  maxGuess.textContent = `Max guesses: ${mostGuesses}`;

  const averageGuesses = guessCountArray.reduce((acc, current) => acc + current) / iterationCount;
  const averageDecimals = averageGuesses.toFixed(2);
  console.log(`Average guesses: ${averageDecimals}`);
  avgGuess.textContent = `Average guesses: ${averageDecimals}`;
};

iterationSubmit.onclick = () => {
  checkGuess();
};

const timer = () => {
  const currentTime = Date.now();
  const totalTime = (currentTime - startTime) / 1000;
  const totalTimeDecimal = totalTime.toFixed(4);
  time.textContent = `Time elapsed: ${totalTimeDecimal} seconds.`;
  console.log(`Time elapsed: ${totalTimeDecimal} seconds`);
};
