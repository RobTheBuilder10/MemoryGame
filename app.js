const gameBoard = document.getElementById('gameBoard');
const startGameBtn = document.getElementById('startGameBtn');

const cards = ['alien1', 'alien2', 'alien3', 'alien4']; 
// Different card types
let shuffledCards = [];
let flippedCards = [];
let canFlip = true;

function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}

// Preload my alien GIFs
preloadImages(["alien1.gif", "alien2.gif", "alien3.gif", "alien4.gif"]);


function startGame() {
    shuffledCards = shuffle([...cards, ...cards]); 
    // Duplicate cards to get pairs
    gameBoard.innerHTML = ''; 
    // Reset game board


    shuffledCards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.cardType = card;
        cardElement.innerHTML = `<img src="${card}.gif" alt="${card}">`; // Use GIFs instead of PNGs
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });


    // Flip two cards automatically
    setTimeout(() => {
        let randomIndices = getRandomIndices(2, shuffledCards.length);
        randomIndices.forEach(index => {
            gameBoard.children[index].click();
        });
    }, 500);
}

function flipCard() {
    if (!canFlip) return;

    this.children[0].style.display = 'block'; // Show card
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        canFlip = false;
        setTimeout(() => {
            let [firstCard, secondCard] = flippedCards;

            if (firstCard.dataset.cardType !== secondCard.dataset.cardType) {
                firstCard.children[0].style.display = 'none';
                secondCard.children[0].style.display = 'none';
            }

            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function getRandomIndices(count, max) {
    let indices = [];
    while (indices.length < count) {
        let rand = Math.floor(Math.random() * max);
        if (!indices.includes(rand)) {
            indices.push(rand);
        }
    }
    return indices;
}

startGameBtn.addEventListener('click', startGame);
