// Define an array of words to guess
const words = ["apple", "banana", "cherry", "grape", "kiwi", "orange", "pear", "strawberry"];

let wordToGuess;
let guessedWord;
let attempts = 6;

// Elements from the HTML
const wordElement = document.getElementById("word");
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");
const resetButton = document.getElementById("resetButton");

// Initialize the game
function initializeGame() {
    wordToGuess = chooseRandomWord(words);
    guessedWord = Array(wordToGuess.length).fill('_');
    renderWord();
    attempts = 6;
    message.textContent = '';
    guessInput.value = '';
    guessButton.disabled = false;
    resetButton.style.display = 'none';
}

// Choose a random word from the array
function chooseRandomWord(wordArray) {
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    return wordArray[randomIndex];
}

// Render the guessed word
function renderWord() {
    wordElement.textContent = guessedWord.join(' ');
}

// Check if the guessed letter is in the word
function checkGuess(letter) {
    let letterFound = false;
    for (let i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === letter) {
            guessedWord[i] = letter;
            letterFound = true;
        }
    }
    if (!letterFound) {
        attempts--;
    }
    renderWord();
    checkGameStatus();
}

// Check the game status
function checkGameStatus() {
    if (guessedWord.join('') === wordToGuess) {
        message.textContent = 'Congratulations! You guessed the word!';
        guessButton.disabled = true;
        resetButton.style.display = 'block';
    } else if (attempts === 0) {
        message.textContent = `Sorry, you ran out of attempts. The word was "${wordToGuess}".`;
        guessButton.disabled = true;
        resetButton.style.display = 'block';
    }
}

// Event listeners
guessButton.addEventListener('click', () => {
    const guess = guessInput.value.toLowerCase();
    if (guess.length === 1 && /^[a-z]$/.test(guess)) {
        checkGuess(guess);
    } else {
        message.textContent = 'Please enter a valid single letter guess.';
    }
    guessInput.value = '';
    guessInput.focus();
});

resetButton.addEventListener('click', initializeGame);

// Initialize the game on page load
initializeGame();
