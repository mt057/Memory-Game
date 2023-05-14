// Array to store card values
let cardValues = [];

// Array to store flipped cards
let flippedCards = [];

// Array to store matched cards
let matchedCards = [];

// Boolean to track if card flipping is allowed
let flipAllowed = true;

// Function to shuffle an array
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Function to create card elements
function createCard(value) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = value;
  card.addEventListener('click', flipCard);
  return card;
}

// Function to flip a card
function flipCard() {
  if (!flipAllowed || this.classList.contains('matched') || this.classList.contains('flipped')) {
    return;
  }

  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    flipAllowed = false;
    setTimeout(checkCards, 1000);
  }
}

// Function to check if flipped cards match
function checkCards() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];

  if (card1.textContent === card2.textContent) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  flippedCards = [];
  flipAllowed = true;

  checkGameCompletion();
}

// Function to check if all cards have been matched
function checkGameCompletion() {
  if (matchedCards.length === cardValues.length) {
    setTimeout(() => {
      alert('Congratulations! You have won the game!');
    }, 500);
  }
}

// Function to start a new game
function newGame() {
  const container = document.querySelector('.grid');
  container.innerHTML = '';

  // Duplicate the card values to create pairs
  const duplicatedValues = cardValues.concat(cardValues);

  // Shuffle the card values
  const shuffledValues = shuffle(duplicatedValues);

  // Create card elements and append them to the container
  shuffledValues.forEach(value => {
    const card = createCard(value);
    container.appendChild(card);
  });

  matchedCards = [];
  flipAllowed = true;
}

// Entry point
document.addEventListener('DOMContentLoaded', () => {
  cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];

  const restartButton = document.querySelector('button');
  restartButton.addEventListener('click', newGame);

  newGame();
});
