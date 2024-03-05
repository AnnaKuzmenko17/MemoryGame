const cardArray = [
  {
    name: 'fries',
    img: 'img/fries.png'
  },
  {
    name: 'cheeseburger',
    img: 'img/cheeseburger.png'
  },
  {
    name: 'milkshake',
    img: 'img/milkshake.png'
  },
  {
    name: 'pizza',
    img: 'img/pizza.png'
  },
  {
    name: 'hotdog',
    img: 'img/hotdog.png'
  },
  {
    name: 'ice-cream',
    img: 'img/ice-cream.png'
  },
  {
    name: 'fries',
    img: 'img/fries.png'
  },
  {
    name: 'cheeseburger',
    img: 'img/cheeseburger.png'
  },
  {
    name: 'milkshake',
    img: 'img/milkshake.png'
  },
  {
    name: 'pizza',
    img: 'img/pizza.png'
  },
  {
    name: 'hotdog',
    img: 'img/hotdog.png'
  },
  {
    name: 'ice-cream',
    img: 'img/ice-cream.png'
  },
]

cardArray.sort(() => 0.5 - Math.random());
console.log(cardArray);

const gridDisplay = document.querySelector('#grid');

function createBoard () {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('img');
    card.setAttribute('src', 'img/blank.png');
    card.setAttribute('data-id', i);
    card.addEventListener('click', flipCard);
    gridDisplay.appendChild(card);
  }
}

createBoard();


let chosenCards = [];
let chosenIds = [];
let wonIds = [];

function checkMatch () {
  const cards = document.querySelectorAll('img');
  let firstOption = chosenIds[0];
  let secondOption = chosenIds[1];

  if(chosenCards[0] === chosenCards[1]) {
    cards[firstOption].setAttribute('src', 'img/white.png');
    cards[secondOption].setAttribute('src', 'img/white.png');
    cards[firstOption].removeEventListener('click', flipCard);
    cards[secondOption].removeEventListener('click', flipCard);
    wonIds.push(chosenCards);
    result.innerHTML = wonIds.length;

  } else {
    cards[firstOption].setAttribute('src', 'img/blank.png');
    cards[secondOption].setAttribute('src', 'img/blank.png');
  }
  
  chosenCards = [];
  chosenIds = [];
}

function flipCard() {
  const cardId = this.getAttribute('data-id');
  this.setAttribute('src', cardArray[cardId].img);
  chosenCards.push(this.getAttribute('src'));
  chosenIds.push(cardId);
  
  if(chosenCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}
 
const result = document.querySelector('#result');

const refreshBtn = document.getElementById('refresh');
refreshBtn.addEventListener('click', refreshGame);

function refreshGame () {
  cardArray.sort(() => 0.5 - Math.random());
  const cards = document.querySelectorAll('img');
  cards.forEach(card => card.setAttribute('src', 'img/blank.png'));
  cards.forEach(card => card.addEventListener('click', flipCard));
  wonIds = [];
  result.innerHTML = 0;
}