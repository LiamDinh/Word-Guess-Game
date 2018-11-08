var artistNames = ["Beyonce", "Eminem", "Shakira", "Madonna", "Pink", "Adele"];

var wins = 0;
var remainingGuesses = 0;
var lettersAlreadyGuessed = [];
var currentWordString = "";
var finished = false;
var currentWord = [];
var mysteriousWord = "";

//Reset game when we first start or when the game is over
// Randomly choose an artist name from the artitstNames array and assign it to mysteriousWord
// Here I set the number of guesses to be double the amount of characters in the name of the artist. Alternatively I could set this to a fixed number
// Setting the display of under the current word to show "---------". The amount of the dashes is equal to the length of the mysteriousWord. 
// I then set it to the currentWordString because that is the variable that I use to display in the index.html
// I then call the displayGame() function

function resetGame() {
	 mysteriousWord = artistNames[Math.floor(Math.random()*artistNames.length)].toLowerCase();

	remainingGuesses = mysteriousWord.length * 2; 
	currentWord.length = mysteriousWord.length;
		currentWord.fill("-");	
		lettersAlreadyGuessed = [];
		currentWordString = "";
		for (var i = 0; i < currentWord.length; i++) {
			currentWordString += currentWord[i];
		};

		displayGame();
};


// displayGame function is to display all the necessary info to the browser

	function displayGame() {
		
		document.getElementById("wins").innerText = wins;
		document.getElementById("currentWordString").innerText = currentWordString;
		document.getElementById('remainingGuesses').innerText = remainingGuesses;
		document.getElementById("lettersAlreadyGuessed").innerText = lettersAlreadyGuessed;
	}



// wordCheck function take in an array and a letter and check to see if the letter appears anywhere in the array, if it does, then replace with the letter in the currentWord array
// use join method to convert currentWord array to currentWordString

function wordCheck(word, letter) {
			for(i = 0; i < word.length; i++) {
				if (word[i] === letter) {
					currentWord[i] = letter;
				}
			}
			currentWordString = currentWord.join("");
			currentWordString;
		//	console.log(currentWord);
		//	console.log(currentWordString);
};


// checkWin function to check if the user wins yet, if it does then increment the wins by 1 and reset the finished variable
function checkWin(){
	if (currentWordString === mysteriousWord) {
		wins++;
		finished = true;
	}
}


// checkLoss function is to check whether the user runs out of guesses and still have not won, and reset finished to true
function checkLoss() {
	if (remainingGuesses <= 0) {
		finished = true;
	}
}


// userGuess function is to check whether the input from the user belongs to the mysteriousWord
// here I call the helper function, wordCheck, to help check the user input to see if it belongs to the mysteriousWord
// if it does, then the remaningGuesses stay the same. If it does not, then I need to check if the user already chose this input previously, 
// if he/she did, then the remainingGuesses stays the same. If he/she did not, then the remainingGuesses is substracted by 1
function userGuess(userguess) {
	if (mysteriousWord.includes(userguess)) {
			wordCheck(mysteriousWord, userguess);
			remainingGuesses;
		//	console.log(remainingGuesses)
		} else {
			if (lettersAlreadyGuessed.indexOf(userguess.toUpperCase()) === -1) {
			lettersAlreadyGuessed.push(userguess.toUpperCase());
			remainingGuesses -= 1;
		//	console.log(lettersAlreadyGuessed);
		//	console.log(remainingGuesses);
		} else {
			remainingGuesses;
		//	console.log(remainingGuesses);
		//	console.log(lettersAlreadyGuessed);
		}
		}
}

// This event listener is to listen for the input from user. 
// This function first check to see the game is finished. If yes, then reset the game.
// If no, then is the user input a legitimate input? (a-z?)
// If yes, then calls the userGuess function on this input
// Call displayGame function
// Call checkWin and checkLoss functions

document.onkeyup = function () {
	if (finished) {
		resetGame();
		finished = false;
	} else {
		if (event.keyCode >=65 && event.keyCode <=90) {
			userGuess(String.fromCharCode(event.keyCode).toLowerCase());
			displayGame();
			checkWin();
			checkLoss();
		}
	}
}
