import { cardArray } from "./js/cardArray.js";

const gameContainer = document.querySelector('.game__container');
const gridDisplay = document.getElementById('grid');
const darkBtn = document.querySelector('.dark-mode');
const lightBtn = document.querySelector('.light-mode')
const restartBtn = document.getElementById('restart');
const startBtn = document.querySelector('#start');
const levelsBtn = document.querySelector('#levels');
const movesIndicator = document.querySelectorAll('.moves');
const time = document.querySelectorAll('.time');
const cards = document.querySelectorAll('#card');


let min = 0;
let sec = 0;
let dark = false;
let newArray;
let chosenCards = [];
let chosenIds = [];
let moves = [];
let wonIds = [];
let timerInterval;

levelsBtn.addEventListener('click', showLevels);
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);
darkBtn.addEventListener('click', darkOn);
lightBtn.addEventListener('click', lightOn);

newArray = [...cardArray].sort(() => 0.5 - Math.random());
createBoard();

function createBoard() {
  const gridDisplay = document.createElement('div');
  gridDisplay.setAttribute('id', 'grid');
  gameContainer.appendChild(gridDisplay);

  for (let i = 0; i < newArray.length; i++) {
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

function showEl (el) {
  el.classList.remove('hidden')
}

function hiddenEl (el) {
  el.classList.add('hidden');
}

function hiddenThemeBtn () {
    hiddenEl(lightBtn);
    hiddenEl(darkBtn);
}

function showThemeBtn () {
  if (dark) {
    showEl(lightBtn);
    hiddenEl(darkBtn);
  } else {
    showEl(darkBtn);
    hiddenEl(lightBtn);
  }
}

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
  } else {
    cards[firstOption].setAttribute('class', 'transparent');
    cards[secondOption].setAttribute('class', 'transparent');
  }

  chosenCards = [];
  chosenIds = [];
}

const threeBtn = document.querySelector('#three');
const sixBtn = document.querySelector('#six');
const nineBtn = document.querySelector('#nine');

threeBtn.addEventListener('click', function() {
  changeLevel(3);
  hiddenThemeBtn();
}, false);

sixBtn.addEventListener('click', function() {
  changeLevel(6);
  hiddenThemeBtn();
}, false);

nineBtn.addEventListener('click', () => {
  const levelOptions = document.querySelector('.levels__buttons');

  newArray = [...cardArray].sort(() => 0.5 - Math.random());
  document.querySelector('#grid').remove();
  startBtn.addEventListener('click', startGame);
  hiddenEl(levelOptions);
  createBoard();
  hiddenThemeBtn();
});

function changeLevel (level) {
  const levelOptions = document.querySelector('.levels__buttons');
  startBtn.addEventListener('click', startGame);

  let index = cardArray.length - level * 2;

  newArray = [...cardArray].sort((a, b) => a.id - b.id).slice(index).sort(() => 0.5 - Math.random());
  document.querySelector('#grid').remove();
  createBoard();
  hiddenEl(levelOptions);
  hiddenThemeBtn();

}


function startGame() {
  const cards = document.querySelectorAll('#card');

  cards.forEach((card) => {
    card.addEventListener('click', flipCard)
  });

  showEl(restartBtn);
  hiddenEl(startBtn);
  hiddenEl(levelsBtn)
  hiddenThemeBtn();
  restartStopWatch();
}


function showLevels() {
  const levelOptions = document.querySelector('.levels__buttons');
  startBtn.removeEventListener('click', startGame);
  hiddenThemeBtn();
  showEl(levelOptions);
}

function styleDarkMode () {
  document.querySelector('.wrapper').classList.add('dark');
  document.querySelectorAll('.header__btn').forEach(btn => btn.classList.add('dark'));
  document.querySelector('.tittle').classList.add('dark');
  document.querySelectorAll('.indicator').forEach(indicator => indicator.classList.add('dark'));
}

function styleLightMode () {
  document.querySelector('.wrapper').classList.remove('dark');
  document.querySelectorAll('.header__btn').forEach(btn => btn.classList.remove('dark'));
  document.querySelector('.tittle').classList.remove('dark');
  document.querySelectorAll('.indicator').forEach(indicator => indicator.classList.remove('dark'));
}

function setImages () {
  const cards = document.querySelectorAll('img.transparent');
  
  if (dark) {
    cards.forEach((card, i) => {
      card.setAttribute('src', newArray[i].dark)
    })
  } else {
    cards.forEach((card, i) => {
      card.setAttribute('src', newArray[i].img)
    })
  }
}

function darkOn() {
  dark = true;

  showThemeBtn()
  styleDarkMode();
  setImages();
}

function lightOn() {
  dark = false;

  showThemeBtn();
  styleLightMode();
  setImages();
}

function flipCard() {
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


function restartGame() {
  const cards = document.querySelectorAll('#card');

  hiddenEl(restartBtn);
  showEl(startBtn);
  showEl(levelsBtn);
  showThemeBtn();

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

  movesIndicator.forEach(x => x.innerHTML = '0');
  time.forEach(x => x.innerHTML = '00:00');
}

function checkWin () {
  if (wonIds.length === newArray.length) {
    finishGame();
  }
}

function finishGame () {
  const congrats = document.querySelector('.congrats');
  const restartBtns = document.querySelectorAll('#restart');
  showEl(congrats);


  clearInterval(timerInterval);
  timerInterval = undefined;

  restartBtns[1].addEventListener('click', restartGame);
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
