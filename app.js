const cardArray = [
  {
    name: 'princess-1',
    img: 'img/princess-1.png',
    dark: 'img/dark-1.png'
  },
  {
    name: 'princess-2',
    img: 'img/princess-2.png',
    dark: 'img/dark-2.png'
  },
  {
    name: 'princess-3',
    img: 'img/princess-3.png',
    dark: 'img/dark-3.png'
  },
  {
    name: 'princess-4',
    img: 'img/princess-4.png',
    dark: 'img/dark-4.png'
  },
  {
    name: 'princess-5',
    img: 'img/princess-5.png',
    dark: 'img/dark-5.png'
  },
  {
    name: 'princess-6',
    img: 'img/princess-6.png',
    dark: 'img/dark-6.png'
  },
  {
    name: 'princess-7',
    img: 'img/princess-7.png',
    dark: 'img/dark-7.png'
  },
  {
    name: 'princess-8',
    img: 'img/princess-8.png',
    dark: 'img/dark-8.png'
  },
  {
    name: 'princess-9',
    img: 'img/princess-9.png',
    dark: 'img/dark-9.png'
  },
  {
    name: 'princess-1',
    img: 'img/princess-1.png',
    dark: 'img/dark-1.png'
  },
  {
    name: 'princess-2',
    img: 'img/princess-2.png',
    dark: 'img/dark-2.png'
  },
  {
    name: 'princess-3',
    img: 'img/princess-3.png',
    dark: 'img/dark-3.png'
  },
  {
    name: 'princess-4',
    img: 'img/princess-4.png',
    dark: 'img/dark-4.png'
  },
  {
    name: 'princess-5',
    img: 'img/princess-5.png',
    dark: 'img/dark-5.png'
  },
  {
    name: 'princess-6',
    img: 'img/princess-6.png',
    dark: 'img/dark-6.png'
  },
  {
    name: 'princess-7',
    img: 'img/princess-7.png',
    dark: 'img/dark-7.png'
  },
  {
    name: 'princess-8',
    img: 'img/princess-8.png',
    dark: 'img/dark-8.png'
  },
  {
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
startBtn.addEventListener('click', startGame);

function startGame () {
  const cards = document.querySelectorAll('#card');
  cards.forEach((card) => {
    card.addEventListener('click', flipCard)
  });
  stopWatch();
  darkBtn.removeEventListener('click', darkOn);
  startBtn.removeEventListener('click', startGame);
}

const darkBtn = document.querySelector('.dark-mode');
darkBtn.addEventListener('click', darkOn);

function darkOn() {
  document.querySelector('.wrapper').classList.toggle('dark');
  document.querySelectorAll('.header__btn').forEach(btn => btn.classList.toggle('dark'));
  document.querySelector('.tittle').classList.toggle('dark');
  document.querySelectorAll('.indicator').forEach(indicator => indicator.classList.toggle('dark'));

  const cards = document.querySelectorAll('img.transparent');
  cards.forEach((card, i) => {
    card.setAttribute('src', cardArray[i].dark)
  })
  console.log(cards);
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
  cards.forEach((card) => {
    card.removeEventListener('click', flipCard)
  });
  
  darkBtn.addEventListener('click', darkOn);
  startBtn.addEventListener('click', startGame);

  cardArray.sort(() => 0.5 - Math.random());

  const bases = document.querySelector('#grid').children;
 
  for (let i = 0; i < cardArray.length; i++) {
    bases[i].className = '';
    cards[i].setAttribute('class', 'transparent');
    cards[i].setAttribute('data-id', i);
    cards[i].setAttribute('src', cardArray[i].img);
  };
  moves = [];
  min = 0;
  sec = 0;
  count = 0;
  console.log(cardArray);
}

const time = document.querySelector('.time');

let min = 0;
let sec = 0;
let count = 0;

function stopWatch () {
  count++;
  if (count === 100) {
    sec++;
    count = 0;
  } 
  if (sec == 60) {
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
  setTimeout(stopWatch, 10);
}
