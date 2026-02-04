const cardsArray = [
    { name: 'apple', icon: '🍎' },
    { name: 'banana', icon: '🍌' },
    { name: 'cherry', icon: '🍒' },
    { name: 'grape', icon: '🍇' },
    { name: 'watermelon', icon: '🍉' },
    { name: 'strawberry', icon: '🍓' },
    { name: 'pineapple', icon: '🍍' },
    { name: 'kiwi', icon: '🥝' },
    { name: 'apple', icon: '🍎' },
    { name: 'banana', icon: '🍌' },
    { name: 'cherry', icon: '🍒' },
    { name: 'grape', icon: '🍇' },
    { name: 'watermelon', icon: '🍉' },
    { name: 'strawberry', icon: '🍓' },
    { name: 'pineapple', icon: '🍍' },
    { name: 'kiwi', icon: '🥝' }
];

const gameBoard = document.getElementById('game-board');
const moveCountElement = document.getElementById('move-count');
const restartBtn = document.getElementById('restart-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const winMessage = document.getElementById('win-message');

let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let matchedPairs = 0;

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function createBoard() {
    gameBoard.innerHTML = '';
    cards = shuffle([...cardsArray]);

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;

        const frontFace = document.createElement('div');
        frontFace.classList.add('card-face', 'card-front');

        const backFace = document.createElement('div');
        backFace.classList.add('card-face', 'card-back');
        backFace.textContent = card.icon;

        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second click
    secondCard = this;
    incrementMoves();
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchedPairs++;
    resetBoard();

    if (matchedPairs === cardsArray.length / 2) {
        setTimeout(() => {
            winMessage.classList.remove('hidden');
        }, 500);
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function incrementMoves() {
    moves++;
    moveCountElement.textContent = moves;
}

function resetGame() {
    moves = 0;
    matchedPairs = 0;
    moveCountElement.textContent = moves;
    winMessage.classList.add('hidden');

    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

    createBoard();
}

restartBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', resetGame);

// Initialize game
createBoard();
