'use strict';

const minGuessValue = 1;
const maxGuessValue = 100;
const maxGuesses = 10;

const randomNumber = Math.floor(Math.random() * maxGuessValue) + minGuessValue;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const time = document.querySelector('.time');
const guessCounter = document.querySelector('.guess-count');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;
let intervalID;

guessField.focus();

const setGameOver = () => {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.append(resetButton);
  resetButton.addEventListener('click', resetGame);

  stop();
  const totalTime = (endTime - startTime)/1000;
  const totalTimeDecimal = totalTime.toFixed(1);
  time.textContent = 'Total time guessing: ' + totalTimeDecimal + ' seconds.';
  guessCounter.textContent = 'Total guesses: ' + guessCount;
};

const resetGame = () => {
  guessCount = 1;

  const resetParas = document.querySelectorAll('.resultParas p');
  for (const resetPara of resetParas) {
    resetPara.textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

};

let startTime;
let endTime;
const checkGuess = () => {
  const userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
    startTime = Date.now();
    start();
  }
  guesses.textContent += `${userGuess} `;
  if (guessCount === 2 ){
  }

  if (userGuess === randomNumber) {
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    endTime = Date.now();
    setGameOver();
  } else if (guessCount === maxGuesses) {
    lastResult.textContent = '!!!GAME OVER!!!';
    lowOrHi.textContent = '';
    endTime = Date.now();
    setGameOver();
  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if (userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }
  guessCount++;
  guessField.value = '';
  guessField.focus();
};

guessSubmit.onclick = () => {
  checkGuess();
};

const clock = () => {
  const currentTime = Date.now();
  const totalTime = (currentTime - startTime)/1000;
  const totalTimeDecimal = totalTime.toFixed(1);
  time.textContent = 'Time elapsed: ' + totalTimeDecimal + ' seconds.';
};

const start = () =>{
  intervalID = setInterval(clock, 10);
};

const stop = () => {
  clearInterval(intervalID);
};
