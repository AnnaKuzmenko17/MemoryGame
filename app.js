const cardArray = [
  {
    id: 1,
    name: 'princess-1',
    img: 'img/princess-1.png',
    dark: 'img/dark-1.png'
  },
  {
    id: 2,
    name: 'princess-2',
    img: 'img/princess-2.png',
    dark: 'img/dark-2.png'
  },
  {
    id: 3,
    name: 'princess-3',
    img: 'img/princess-3.png',
    dark: 'img/dark-3.png'
  },
  {
    id: 4,
    name: 'princess-4',
    img: 'img/princess-4.png',
    dark: 'img/dark-4.png'
  },
  {
    id: 5,
    name: 'princess-5',
    img: 'img/princess-5.png',
    dark: 'img/dark-5.png'
  },
  {
    id: 6,
    name: 'princess-6',
    img: 'img/princess-6.png',
    dark: 'img/dark-6.png'
  },
  {
    id: 7,
    name: 'princess-7',
    img: 'img/princess-7.png',
    dark: 'img/dark-7.png'
  },
  {
    id: 8,
    name: 'princess-8',
    img: 'img/princess-8.png',
    dark: 'img/dark-8.png'
  },
  {
    id: 9,
    name: 'princess-9',
    img: 'img/princess-9.png',
    dark: 'img/dark-9.png'
  },
  {
    id: 1,
    name: 'princess-1',
    img: 'img/princess-1.png',
    dark: 'img/dark-1.png'
  },
  {
    id: 2,
    name: 'princess-2',
    img: 'img/princess-2.png',
    dark: 'img/dark-2.png'
  },
  {
    id: 3,
    name: 'princess-3',
    img: 'img/princess-3.png',
    dark: 'img/dark-3.png'
  },
  {
    id: 4,
    name: 'princess-4',
    img: 'img/princess-4.png',
    dark: 'img/dark-4.png'
  },
  {
    id: 5,
    name: 'princess-5',
    img: 'img/princess-5.png',
    dark: 'img/dark-5.png'
  },
  {
    id: 6,
    name: 'princess-6',
    img: 'img/princess-6.png',
    dark: 'img/dark-6.png'
  },
  {
    id: 7,
    name: 'princess-7',
    img: 'img/princess-7.png',
    dark: 'img/dark-7.png'
  },
  {
    id: 8,
    name: 'princess-8',
    img: 'img/princess-8.png',
    dark: 'img/dark-8.png'
  },
  {
    id: 9,
    name: 'princess-9',
    img: 'img/princess-9.png',
    dark: 'img/dark-9.png'
  },
]

cardArray.sort(() => 0.5 - Math.random());
console.log(cardArray);

const gridDisplay = document.querySelector('#grid');


function createBoard () {
  for (let i = 0; i < cardArray.length; i++) {
    const base = document.createElement('div');
    const img = document.createElement('img');
    base.setAttribute('data-id', i);
    img.setAttribute('data-id', i);
    img.setAttribute('src', cardArray[i].img);
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

function checkMatch () {
  const cards = document.querySelectorAll('#card');
  const bases = gridDisplay.children;
  let firstOption = chosenIds[0];
  let secondOption = chosenIds[1];
  
  if(chosenCards[0] === chosenCards[1]) {
    bases[firstOption].setAttribute('class', 'match');
    bases[secondOption].setAttribute('class', 'match');
    cards[firstOption].removeEventListener('click', flipCard);
    cards[secondOption].removeEventListener('click', flipCard);
    
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

function showLevels () {
  if(dark) {
    lightBtn.classList.toggle('hidden');
  } else {
    darkBtn.classList.toggle('hidden');
  }  
  document.querySelector('.levels__buttons').classList.toggle('hidden');
}

// function chooseLevel (level) {
//   if (level === 3) {
//     cardArray.sort((a,b) => a.id-b.id).splice(6);
//   } else if (level === 6) {
//     cardArray.sort((a, b) => a.id-b.id).splice(12);
//   } 
// }
startBtn.addEventListener('click', startGame);

function startGame () {
  refreshBtn.classList.remove('hidden');
  startBtn.classList.add('hidden');
  darkBtn.classList.add('hidden');
  lightBtn.classList.add('hidden');
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


function darkOn() {
  darkBtn.classList.add('hidden');
  lightBtn.classList.remove('hidden');

  document.querySelector('.wrapper').classList.toggle('dark');
  document.querySelectorAll('.header__btn').forEach(btn => btn.classList.toggle('dark'));
  document.querySelector('.tittle').classList.toggle('dark');
  document.querySelectorAll('.indicator').forEach(indicator => indicator.classList.toggle('dark'));
  const cards = document.querySelectorAll('img.transparent');

  cards.forEach((card, i) => {
    card.setAttribute('src', cardArray[i].dark)
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
    card.setAttribute('src', cardArray[i].img)
  }) 
  dark = false;
}

function flipCard() {
  const bases = grid.children;
  const btnId = this.getAttribute('data-id');
  this.classList.remove('transparent');
  
  chosenCards.push(cardArray[btnId].img);
  chosenIds.push(btnId);
  moves.push(btnId);
  
  if(chosenCards.length === 2) {
    setTimeout(checkMatch, 300);
    movesIndicator.innerHTML = moves.length;
  }
}

const movesIndicator = document.querySelector('.moves');
movesIndicator.innerHTML = moves.length;

const refreshBtn = document.getElementById('refresh');
refreshBtn.addEventListener('click', refreshGame);

function refreshGame () {
  const cards = document.querySelectorAll('#card');

  refreshBtn.classList.add('hidden');
  startBtn.classList.remove('hidden');

  if(dark) {
    lightBtn.classList.remove('hidden');
  } else {
    darkBtn.classList.remove('hidden');
  }
  
  darkBtn.addEventListener('click', darkOn);
  startBtn.addEventListener('click', startGame);

  cardArray.sort(() => 0.5 - Math.random());

  const bases = document.querySelector('#grid').children;
 
  for (let i = 0; i < cardArray.length; i++) {
    bases[i].className = '';
    cards[i].setAttribute('class', 'transparent');
    cards[i].setAttribute('data-id', i);
    cards[i].setAttribute('src', cardArray[i].img);
    cards[i].removeEventListener('click', flipCard)
  };
  moves = [];
  stopStopWatch();
  console.log(cardArray);
}

const time = document.querySelector('.time');

let min = 0;
let sec = 0;
let count = 0;

function renderTime () {
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

  time.innerHTML = minString + ':' + secString;
  console.log(minString);
}

let timerInterval;

function startStopWatch () {
  if(timerInterval == null) {
    timerInterval = setInterval(renderTime, 1000)
  }
}

function stopStopWatch () {
  clearInterval(timerInterval);
  timerInterval = undefined;
  sec = 0;
  min = 0;
  time.innerHTML = '00:00';
}

function restartStopWatch () {
  stopStopWatch();
  startStopWatch();
}
