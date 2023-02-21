const card1El = document.querySelector('.cards__one');
const card2El = document.querySelector('.cards__two');
const discardsEl = document.querySelector('.cards__discard');
const dealBtn = document.querySelector('.cards__deal');

const cards = [];
let drawnCards = [];
const path = './resources/assets/images/';
const suits = ['clubs', 'diamonds', 'spades', 'hearts'];
const values = [
   2,
   3,
   4,
   5,
   6,
   7,
   8,
   9,
   10,
   'jack',
   'queen',
   'king',
   'ace'
];

const buildDeck = () => {
   for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < values.length; j++) {
         let card = {
            src: `${path}${suits[i]}_${values[j]}.svg`,
            suit: suits[i],
            value: values[j]
         }
         cards.push(card);
      }
   }
};

buildDeck();

let counter = 0;
let hands = 0;

const drawCard = (card) => {
   let cardIdx = Math.floor(Math.random() * cards.length);
   
   let drawnCard = cards.splice(cardIdx, 1)[0];
   drawnCards.push(drawnCard);
   counter++;

   counter === 1 
      ? card.classList.add('slide-under')
      : card.classList.add('slide-over');

   card.src = drawnCard.src;
   console.log(drawnCard)
   card.classList.remove('hidden');

   return drawnCard;
}

const resetCounter = () => {
   counter = 0;
};

const tally = (card) => {
   let value = 0;
   if (typeof card.value === 'string') {
      value += 10;
   } else {
      value += card.value;
   }
   return value;
};

const clearTable = () => {
   resetCounter();

   if (hands >= 1) {
      card1El.src = '';
      card2El.src = '';
   }
}

// Draws 2 new cards, populates discard pile
const deal = () => {
   let card1 = drawCard(card1El);
   let card1Val = tally(card1);
   let card2 = drawCard(card2El);
   let card2Val =  tally(card2);
};

dealBtn.addEventListener('click', () => {
   if (counter === 0) {
      discardsEl.classList.add('hidden');
   }
   if (hands === 1) {
      discardsEl.classList.remove('hidden');
      clearTable();
   } else {
      clearTable();
   }
   hands++;
   if (cards.length >= 2) {
      dealBtn.innerText = 'deal again';
      deal();
   } else {
      dealBtn.innerText = 'reshuffle';
      resetCounter();
      buildDeck();
      card1El.src = `${path}red2.svg`;
      card1El.classList.add('hidden');
      card2El.src = `${path}red2.svg`;
      card2El.classList.add('hidden');
      hands = 0;
   }
});