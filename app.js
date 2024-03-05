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

const gradDisplay = document.querySelector('#grid');

function createBoard () {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('img');
    card.setAttribute('src', 'img/blank.png');
    card.setAttribute('data-id', i);
    card.addEventListener('click', flipCard);
    gradDisplay.appendChild(card);
  }
}

createBoard()
let chosenCards = [];
let chosenIds = [];

function checkMatch () {
  const cards = document.querySelectorAll('img');
  let firstOption = chosenIds[0];
  let secondOption = chosenIds[1];

  if(chosenCards[0] === chosenCards[1]) {
    cards[firstOption].setAttribute('src', 'img/white.png');
    cards[secondOption].setAttribute('src', 'img/white.png');
    cards[firstOption].removeEventListener('click', flipCard)
    cards[secondOption].removeEventListener('click', flipCard)
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
  console.log(chosenCards)
  if(chosenCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}