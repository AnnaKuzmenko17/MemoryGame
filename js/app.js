import { data, modes } from "./data.js";

const gameContainer = document.querySelector('.game__container');
const restartBtn = document.getElementById('restart');
const startBtn = document.getElementById('start');
const levelsBtn = document.getElementById('levels');
const levelBtn = document.querySelectorAll('.level__btn');
const modeBtn = document.getElementById('mode');
const movesIndicator = document.querySelectorAll('.moves');
const time = document.querySelectorAll('.time');
const congrats = document.querySelector('.congrats');


let min = 0;
let sec = 0;
let dark = false;
let chosenCards = [];
let chosenIds = [];
let wonIds = [];
let moves = [];
let timerInterval;
let cardArray = [...data].sort(() => 0.5 - Math.random());


startBtn.addEventListener('click', startGame);
modeBtn.addEventListener('click', changeMode);
levelsBtn.addEventListener('click', showLevels);
restartBtn.addEventListener('click', restartGame);
levelBtn.forEach(btn => btn.addEventListener('click', function() {
  changeLevel(this.id);
}, false));

createBoard();



function createBoard() {
  const gridDisplay = document.createElement('div');
  gridDisplay.setAttribute('id', 'grid');
  gameContainer.appendChild(gridDisplay);

  for (let i = 0; i < cardArray.length; i++) {
    const base = document.createElement('div');
    const img = document.createElement('img');
    base.setAttribute('data-id', i);
    img.setAttribute('data-id', i);
    img.setAttribute('id', 'card');
    img.classList.add('transparent');
    gridDisplay.appendChild(base);
    base.appendChild(img);
  }

  setImages();
}

function startGame() {
  const cards = document.querySelectorAll('#card');

  cards.forEach((card) => {
    card.addEventListener('click', flipCard)
  });

  showEl(restartBtn);
  hiddenEl(startBtn);
  hiddenEl(levelsBtn)
  hiddenEl(modeBtn);
  restartStopWatch();
}

function flipCard() {
  const btnId = this.getAttribute('data-id');
  this.classList.remove('transparent');

  chosenCards.push(cardArray[btnId].img);
  chosenIds.push(btnId);
  moves.push(btnId);

  if (chosenCards.length === 2) {
    setTimeout(isMatch, 300);
    movesIndicator.forEach(x => x.innerHTML = moves.length);
  }
}

function isMatch() {
  const gridDisplay = document.getElementById('grid');
  const cards = document.querySelectorAll('#card');
  const bases = gridDisplay.children;

  let firstOption = chosenIds[0];
  let secondOption = chosenIds[1];

  if (chosenCards[0] === chosenCards[1]) {
    bases[firstOption].setAttribute('class', 'match');
    bases[secondOption].setAttribute('class', 'match');
    cards[firstOption].removeEventListener('click', flipCard);
    cards[secondOption].removeEventListener('click', flipCard);
    wonIds.push(...chosenIds);
    isWinner();
  } else {
    cards[firstOption].setAttribute('class', 'transparent');
    cards[secondOption].setAttribute('class', 'transparent');
  }

  chosenCards = [];
  chosenIds = [];
}

function changeMode () {
  dark = !dark;
  setImages();
  changeModeIcon();
  darkStyling();
}

function showLevels() {
  const levelOptions = document.querySelector('.levels__buttons');
  startBtn.removeEventListener('click', startGame);
  hiddenEl(modeBtn);
  showEl(levelOptions);
}

function changeLevel (level) {
  const levelOptions = document.querySelector('.levels__buttons');
  startBtn.addEventListener('click', startGame);

  let index = data.length - level * 2;
 
  cardArray = level === 9 ? [...data].sort(() => 0.5 - Math.random()) :
  [...data].sort((a, b) => a.id - b.id).slice(index).sort(() => 0.5 - Math.random());
  document.querySelector('#grid').remove();
  createBoard();
  hiddenEl(levelOptions);
  hiddenEl(modeBtn);
}

function setImages () {
  const cards = document.querySelectorAll('#card');
  
  if (dark) {
    cards.forEach((card, i) => {
      card.setAttribute('src', cardArray[i].dark)
    })
  } else {
    cards.forEach((card, i) => {
      card.setAttribute('src', cardArray[i].img)
    })
  }
}

function restartGame() {
  const cards = document.querySelectorAll('#card');

  hiddenEl(restartBtn);
  hiddenEl(congrats);
  showEl(startBtn);
  showEl(levelsBtn);
  showEl(modeBtn);

  cardArray.sort(() => 0.5 - Math.random());

  const bases = document.querySelector('#grid').children;

  for (let i = 0; i < cardArray.length; i++) {
    bases[i].className = '';
    cards[i].setAttribute('class', 'transparent');
    cards[i].setAttribute('data-id', i);
    cards[i].removeEventListener('click', flipCard);
  };

  setImages();
  stopStopWatch();
  wonIds = [];
  moves = [];

  movesIndicator.forEach(x => x.innerHTML = '0');
  time.forEach(x => x.innerHTML = '00:00');
}

function isWinner () {
  if (wonIds.length === cardArray.length) {
    finishGame();
  }
}

function finishGame () {
  const congrats = document.querySelector('.congrats');
  const restartBtns = document.querySelectorAll('#restart');
  showEl(congrats);

  clearInterval(timerInterval);
  timerInterval = undefined;
  
  hiddenEl(restartBtns[0]);
  restartBtns[1].addEventListener('click', restartGame);
}

function changeModeIcon () {
  if (dark) {
    modeBtn.setAttribute('src', modes[1].img)
  } else {
    modeBtn.setAttribute('src', modes[0].img)
  }
}

function darkStyling () {
  document.querySelector('.wrapper').classList.toggle('dark');
  document.querySelectorAll('.header__btn').forEach(btn => btn.classList.toggle('dark'));
  document.querySelector('.tittle').classList.toggle('dark');
  document.querySelectorAll('.indicator').forEach(indicator => indicator.classList.toggle('dark'));
  document.querySelectorAll('.level__btn').forEach(btn => btn.classList.toggle('dark'));
  document.querySelector('.congrats__btn').classList.toggle('dark');
  document.querySelector('.congrats').classList.toggle('dark');
}

function renderTime() {
  sec++;

  if (sec > 59) {
    min++;
    sec = 0;
  }

  let minString;
  let secString;
  minString = min;
  secString = sec;

  if (min < 10) {
    minString = '0' + min;
  }

  if (sec < 10) {
    secString = '0' + sec;
  }

  time.forEach(item => item.innerHTML = minString + ':' + secString);
  console.log(minString);
}

function startStopWatch() {
  if (timerInterval == null) {
    timerInterval = setInterval(renderTime, 1000)
  }
}

function stopStopWatch() {
  clearInterval(timerInterval);
  timerInterval = undefined;
  sec = 0;
  min = 0;
  time.innerHTML = '00:00';
}

function restartStopWatch() {
  stopStopWatch();
  startStopWatch();
}

function showEl (el) {
  el.classList.remove('hidden')
}

function hiddenEl (el) {
  el.classList.add('hidden');
}