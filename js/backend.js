//  Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Genrate Letters
lettersArray.forEach(letter =>{

    // Create Span
    let span = document.createElement("span");

    // Create Letters Letter Text Node
    let theLetter = document.createTextNode(letter);

    // Append The Letter To Span
    span.appendChild(theLetter);

    // Add Class On Span
    span.className = "letter-box";

    // Append Span To The Letters Container
    lettersContainer.appendChild(span);

});

// Objict Of Words + Categories
const words = {
    programming: ["PHP", "JavaScript", "Go", "Scala", "Fortran", "R", "MySql", "Paython"],
    movies: ["Prestiage", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    People: ["Albert Einstein", "Hitchock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
};

// Get Random Property
let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
let randomPorpNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPorpNumber];

// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letter Guess Element
let letterGuessElement = document.querySelector(".letters-guess");

// Convert Choosen word To Array
let letterAndSpace = Array.from(randomValueValue);

// Create Spans Depend Word

letterAndSpace.forEach(letter=>{
    
    // Create Empty span
    let emptySpan = document.createElement("span");

    // If Letter Is Space
    if (letter === " "){
        emptySpan.className = "with-space";

    };

    // Append Spans To The Letters Guess Element
    letterGuessElement.appendChild(emptySpan);

})

// Select Guess Span
let guessSpan = document.querySelectorAll(".letters-guess span");

// Set Wrong Spans
let WrongAttempts = 0;

// Set success Spans
let successAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e)=>{

    // Set The Chose Status
    let theStatus = false;

    if(e.target.className === "letter-box"){

        e.target.classList.add("clicked");

        // Get Letter Clicked
        let theClickLetter = e.target.innerHTML.toLowerCase();

        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        theChosenWord.forEach((wordLetter, wordindex)=>{
            
            // if the Clicked letter Equal To One Of The Choosen Word Letter
            if (theClickLetter === wordLetter){
                theStatus = true;

                // Loop On All Guess Span
                guessSpan.forEach((span, spanIndex)=>{

                    if(wordindex ===  spanIndex){

                        span.innerHTML = theClickLetter;
                    };
                });
            };
        });
        // Outside Loop

        // If Letter Is Wrong

        if(theStatus !== true){

            // Increase The Wrong Attempts
            WrongAttempts++;

            // Add Class Wrong On The Draw Element 
            theDraw.classList.add(`wrong-${WrongAttempts}`);

            // Play Fail Sound
            document.getElementById("fail").play();

            if(WrongAttempts === 8){
                endGame();

                lettersContainer.classList.add("finished");
            }

        }else{
            document.getElementById("success").play();
            successAttempts++
            console.log(successAttempts);
            if(successAttempts === randomValueValue.length){
                winGame()
            }
        }

    }
});

// End Game Function
function endGame(){

    // Create Popup Div
    let div = document.createElement("div");

    // Create Text 
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);

    // Append Text
    div.appendChild(divText);

    // Add Class On Div 
    div.className = "popup-loser";

    document.body.appendChild(div);
}

// Win Game Function
function winGame(){

    // Create Popup Div
    let div = document.createElement("div");

    // Create Text 
    let divText = document.createTextNode(`congratulations, The Wrong Attempts Is ${WrongAttempts}`);

    // Append Text
    div.appendChild(divText);

    // Add Class On Div 
    div.className = "popup-success";

    document.body.appendChild(div);
}