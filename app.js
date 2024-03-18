import { cardArray } from "./js/cardArray.js";

let newArray;

newArray = [...cardArray].sort(() => 0.5 - Math.random());

const gameContainer = document.querySelector('.game__container');
const gridDisplay = document.getElementById('grid');

console.log(newArray)

function createBoard() {
  const gridDisplay = document.createElement('div');
  gridDisplay.setAttribute('id', 'grid');
  gameContainer.appendChild(gridDisplay);

  for (let i = 0; i < newArray.length; i++) {
    const base = document.createElement('div');
    const img = document.createElement('img');
    base.setAttribute('data-id', i);
    img.setAttribute('data-id', i);
    img.setAttribute('src', newArray[i].img);
    img.classList.add('transparent');
    img.setAttribute('id', 'card');
    gridDisplay.appendChild(base);
    base.appendChild(img);
  }
}

createBoard();


let chosenCards = [];
let chosenIds = [];
let moves = [];
let wonIds = [];

function checkMatch() {
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
    checkWin();
    console.log(wonIds);

  } else {
    cards[firstOption].setAttribute('class', 'transparent');
    cards[secondOption].setAttribute('class', 'transparent');
  }

  chosenCards = [];
  chosenIds = [];
  console.log(chosenCards, chosenIds, cards)
}

const startBtn = document.querySelector('#start');
const levelsBtn = document.querySelector('#levels');

levelsBtn.addEventListener('click', showLevels);
let level;

document.querySelector('#three').addEventListener('click', () => {
  newArray = [...cardArray].sort((a, b) => a.id - b.id).slice(12).sort(() => 0.5 - Math.random());
  document.querySelector('#grid').remove();
  createBoard();
  console.log(newArray)
});

document.querySelector('#six').addEventListener('click', () => {
  newArray = [...cardArray].sort((a, b) => a.id - b.id).slice(6).sort(() => 0.5 - Math.random());
  document.querySelector('#grid').remove();
  createBoard();
  console.log(newArray)
});

document.querySelector('#nine').addEventListener('click', () => {
  newArray = [...cardArray].sort(() => 0.5 - Math.random());
  document.querySelector('#grid').remove();
  createBoard();
  console.log(newArray)
});

startBtn.addEventListener('click', startGame);

function startGame() {
  refreshBtn.classList.remove('hidden');
  startBtn.classList.add('hidden');
  darkBtn.classList.add('hidden');
  lightBtn.classList.add('hidden');
  levelsBtn.classList.add('hidden');

  const cards = document.querySelectorAll('#card');
  cards.forEach((card) => {
    card.addEventListener('click', flipCard)
  });

  restartStopWatch();

  darkBtn.removeEventListener('click', darkOn);
  startBtn.removeEventListener('click', startGame);
}

const darkBtn = document.querySelector('.dark-mode');
const lightBtn = document.querySelector('.light-mode')
darkBtn.addEventListener('click', darkOn);
lightBtn.addEventListener('click', lightOn);
let dark = false;

function showLevels() {
  if (dark) {
    lightBtn.classList.toggle('hidden');
  } else {
    darkBtn.classList.toggle('hidden');
  }
  document.querySelector('.levels__buttons').classList.toggle('hidden');
}

function darkOn() {
  darkBtn.classList.add('hidden');
  lightBtn.classList.remove('hidden');

  document.querySelector('.wrapper').classList.toggle('dark');
  document.querySelectorAll('.header__btn').forEach(btn => btn.classList.toggle('dark'));
  document.querySelector('.tittle').classList.toggle('dark');
  document.querySelectorAll('.indicator').forEach(indicator => indicator.classList.toggle('dark'));
  const cards = document.querySelectorAll('img.transparent');

  cards.forEach((card, i) => {
    card.setAttribute('src', newArray[i].dark)
  })
  dark = true;
}

function lightOn() {
  lightBtn.classList.add('hidden');
  darkBtn.classList.remove('hidden');

  document.querySelector('.wrapper').classList.remove('dark');
  document.querySelectorAll('.header__btn').forEach(btn => btn.classList.remove('dark'));
  document.querySelector('.tittle').classList.remove('dark');
  document.querySelectorAll('.indicator').forEach(indicator => indicator.classList.remove('dark'));

  const cards = document.querySelectorAll('img.transparent');
  cards.forEach((card, i) => {
    card.setAttribute('src', newArray[i].img)
  })
  dark = false;
}

function flipCard() {
  const bases = grid.children;
  const btnId = this.getAttribute('data-id');
  this.classList.remove('transparent');

  chosenCards.push(newArray[btnId].img);
  chosenIds.push(btnId);
  moves.push(btnId);

  if (chosenCards.length === 2) {
    setTimeout(checkMatch, 300);
    movesIndicator.forEach(x => x.innerHTML = moves.length);
  }
}

const movesIndicator = document.querySelectorAll('.moves');
movesIndicator.forEach(x => x.innerHTML = moves.length);

const refreshBtn = document.getElementById('refresh');
refreshBtn.addEventListener('click', refreshGame);

function refreshGame() {
  const cards = document.querySelectorAll('#card');

  refreshBtn.classList.add('hidden');
  startBtn.classList.remove('hidden');
  levelsBtn.classList.remove('hidden');


  if (dark) {
    lightBtn.classList.remove('hidden');
  } else {
    darkBtn.classList.remove('hidden');
  }

  darkBtn.addEventListener('click', darkOn);
  startBtn.addEventListener('click', startGame);

  newArray.sort(() => 0.5 - Math.random());

  const bases = document.querySelector('#grid').children;

  for (let i = 0; i < newArray.length; i++) {
    bases[i].className = '';
    cards[i].setAttribute('class', 'transparent');
    cards[i].setAttribute('data-id', i);
    cards[i].setAttribute('src', newArray[i].img);
    cards[i].removeEventListener('click', flipCard)
  };
  moves = [];
  stopStopWatch();
  console.log(newArray);
}

function checkWin () {
  if (wonIds.length === newArray.length) {
    finishGame();
  }
}

function finishGame () {
  document.querySelector('.congrats').classList.remove('hidden');
  clearInterval(timerInterval);
  timerInterval = undefined;

}

const time = document.querySelectorAll('.time');

let min = 0;
let sec = 0;
let count = 0;

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

let timerInterval;

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
