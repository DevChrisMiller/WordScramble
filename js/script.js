//declare global variables
const startingWordList = ["harmonica", "elephant", "television", "carpet", "cereal", "speaker", "coffee", "mountain", "chair", "cucumber", "blimp", "baseball", "pizza", "jelly", "highway", "guitar", "viking", "quiz", "camel", "laptop", "pumpkin", "fork", "zebra", "queen", "purple", "bet", "pet", "cow", "anxious", "wet", "cold", "green", "ability", "book", "child", "dream", "early", "energy", "fish", "glass", "month", "phone", "report", "senior", "control", "walk"];
let updatedWordList = [];
let score = 0;
let correctAnswer = 10;
let wrongAnswer = -3;
let skipAnswer = -5;
let timeLeft = 45;
let wordPosition = 0;
let username = "";
let currentWord = "";

//get username
function setUsername() {

    //declare variables
    let updatedUsername = document.getElementById("nameInput").value;

        //validate if username is correct length
        if (updatedUsername.length >= 3 && updatedUsername.length <= 20) {
            username = updatedUsername;

            //start game
            startGame();
            startTimer();
        
        } else if (updatedUsername.length < 3) {

            //output error
            document.getElementById("nameInputError").innerHTML = "Username must be atleast 3 characters long!";

        } else if (updatedUsername.length > 20) {

            //output error
            document.getElementById("nameInputError").innerHTML = "Username cannot be longer than 20 characters!";

        }
}

//start game
function startGame() {

    //remove pregame and postgame display
    document.getElementById("pregame").style.display = "none";
    document.getElementById("postgame").style.display = "none";

    //display game
    document.getElementById("livegame").style.display = "block";
    
    //reset game values
    timeLeft = 45;
    score = 0;
    updatedWordList = [...startingWordList];
    updateScore(0);

    //reset HTML outputs
    document.getElementById("timer").innerHTML = "Time Left: " + timeLeft;
    document.getElementById("score").innerHTML = "Your Score: " + score;

    //get new word
    newWord();
    
 }

 //select new word
function newWord() {
    //reset input field
    document.getElementById("userInput").value="";

    //auto focus cursor
    document.getElementById("userInput").focus();
    document.getElementById("userInput").select();

    //pick random word from array
    let newWordPosition = Math.ceil(Math.random() * updatedWordList.length);
    wordPosition = newWordPosition;
    let newCurrentWord = updatedWordList[wordPosition];
    currentWord = newCurrentWord;
        
    //send new word to be scrambled
    scrambleWord(currentWord); 
}

//scramble the current word
function scrambleWord(currentWord) {

    try {
    //declare variables
    let scrambledArray = currentWord.split('');
    let wordLength = scrambledArray.length;

            //run through the word and scramble the location of the letters
            for (i=0; i<wordLength-1; i++) {

                let location = Math.floor(Math.random() * wordLength);

                let temp = scrambledArray[i];
                scrambledArray[i] = scrambledArray[location];
                scrambledArray[location] = temp;
            }

                let scrambledWord = scrambledArray.join('');
            
            //output scrambled word if its not identical to the original word
            if (scrambledWord !== currentWord) {
                document.getElementById("currentWord").innerHTML = scrambledWord;
                }
            else {
                //rescramble
                scrambleWord(currentWord);
            }
        }
    catch(e) {
        //generate new word on error
        newWord();
    }
}

//check answer
function checkAnswer(currentWord) {
        
    //declare variables
    let userAnswer = document.getElementById("userInput").value.toLowerCase();

        //check for correct answer
        if (userAnswer === currentWord) {
            //update score
            updateScore(correctAnswer);

            //remove word from future selection
            updatedWordList.splice(wordPosition, 1);

            //get new word
            newWord();    
        }
        //check for wrong answer
        else {
            //update score
            updateScore(wrongAnswer);           
        }
}

//skip current word
function skip() {
    //update score
    updateScore(skipAnswer);
    
    //remove word from list
    updatedWordList.splice(wordPosition, 1);

    //get new word
    newWord();
}

//update the score
function updateScore(scoreInput) {
    //adjust score
    score = score + scoreInput;

    //output updated score
    document.getElementById("score").innerHTML = "Your score: " + score;
}

//start timer
function startTimer() {
    //start the countdown at interval of 1 second
    setInterval(countdown, 1000); 
}

//timer countdown
function countdown(){
//update timer
timeLeft--;
document.getElementById("timer").innerHTML = "Time Left: " + timeLeft;

    //check if time has run out
    if (timeLeft < 0) {
        endGame();
    }
}

//end the game
function endGame() {
    //remove game display
    document.getElementById("livegame").style.display = "none";

    //display postgame screen with username and score
    document.getElementById("postgame").style.display = "block";
    document.getElementById("username").innerHTML = username;
    document.getElementById("finalScore").innerHTML = score;

    //focus on the restart button
    document.getElementById("play-again-btn").focus();
}

//check for keypress actions
function keyboardSubmit() {

    if (event.keyCode === 13 && event.path[0].id === "userInput") {
        checkAnswer(currentWord);
    }

    else if (event.keyCode === 13 && event.path[0].id === "nameInput") {
        setUsername();
    }

    else if (event.keyCode === 17 && event.path[0].id === "userInput") {
        skip();
    }
}