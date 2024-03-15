const cardArray = [
  {
    name: 'princess-1',
    img: 'img/princess-1.png'
  },
  {
    name: 'princess-2',
    img: 'img/princess-2.png'
  },
  {
    name: 'princess-3',
    img: 'img/princess-3.png'
  },
  {
    name: 'princess-4',
    img: 'img/princess-4.png'
  },
  {
    name: 'princess-5',
    img: 'img/princess-5.png'
  },
  {
    name: 'princess-6',
    img: 'img/princess-6.png'
  },
  {
    name: 'princess-7',
    img: 'img/princess-7.png'
  },
  {
    name: 'princess-8',
    img: 'img/princess-8.png'
  },
  {
    name: 'princess-9',
    img: 'img/princess-9.png'
  },
  {
    name: 'princess-1',
    img: 'img/princess-1.png'
  },
  {
    name: 'princess-2',
    img: 'img/princess-2.png'
  },
  {
    name: 'princess-3',
    img: 'img/princess-3.png'
  },
  {
    name: 'princess-4',
    img: 'img/princess-4.png'
  },
  {
    name: 'princess-5',
    img: 'img/princess-5.png'
  },
  {
    name: 'princess-6',
    img: 'img/princess-6.png'
  },
  {
    name: 'princess-7',
    img: 'img/princess-7.png'
  },
  {
    name: 'princess-8',
    img: 'img/princess-8.png'
  },
  {
    name: 'princess-9',
    img: 'img/princess-9.png'
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
    gridDisplay.appendChild(base);
    base.appendChild(img);
    img.addEventListener('click', flipCard)
  }
}

createBoard();


let chosenCards = [];
let chosenIds = [];
let wonIds = [];

function checkMatch () {
  const cards = document.querySelectorAll('img');
  const bases = gridDisplay.children;
  let firstOption = chosenIds[0];
  let secondOption = chosenIds[1];

  if(chosenCards[0] === chosenCards[1]) {
    bases[firstOption].setAttribute('class', 'match');
    bases[secondOption].setAttribute('class', 'match');
    cards[firstOption].removeEventListener('click', flipCard);
    cards[secondOption].removeEventListener('click', flipCard);
    wonIds.push(chosenCards);
    result.innerHTML = wonIds.length;
    
  } else {
    cards[firstOption].setAttribute('class', 'transparent');
    cards[secondOption].setAttribute('class', 'transparent');
  }
  
  chosenCards = [];
  chosenIds = [];
}

function flipCard() {
  const bases = grid.children;
  const btnId = this.getAttribute('data-id');
  this.classList.remove('transparent');
  
  chosenCards.push(cardArray[btnId].img);
  chosenIds.push(btnId);
  
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
  const bases = document.querySelector('#grid').children;
 
  for (let i = 0; i < cardArray.length; i++) {
    bases[i].className = '';
    cards[i].setAttribute('class', 'transparent');
    cards[i].setAttribute('data-id', i);
    cards[i].setAttribute('src', cardArray[i].img);
    cards[i].addEventListener('click', flipCard)
  };
  
  wonIds = [];
  result.innerHTML = 0;
  console.log(cardArray);
}

