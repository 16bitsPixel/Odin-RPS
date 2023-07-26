/*
    Function to randomly return Rock, Paper, or Scissors to act as a bot
    Parameters: None
    Return: Rock, Paper, or Scissors
*/
function getComputerChoice() {
    const options = ["Rock", "Paper", "Scissors"];
    let random = Math.floor(Math.random() * options.length);
    return options[random];
}

/*
    Function to play a single round of RPS
    Parameters:
        playerSelection - option the player picks
        computerSelection - option the computer picks
    Return: string to declare winner
*/
function playRound(playerSelection, computerSelection) {
    let outcome;
    let resultVisual = document.querySelector("h3");
    switch(playerSelection.toLowerCase()) {
        case "rock":
            switch(computerSelection.toLowerCase()) {
                case "rock":
                    document.querySelector("#rock").classList.add("tied");
                    resultVisual.textContent = "Nobody wins! Both chose Rock!";
                    outcome = "tie";
                    break;
                case "paper":
                    document.querySelector("#paper").classList.add("enemy");
                    resultVisual.textContent = "You lose! Paper beats Rock!";
                    outcome = "player";
                    break;
                case "scissors":
                    document.querySelector("#scissors").classList.add("enemy");
                    resultVisual.textContent = "You win! Rock beats Scissors!";
                    outcome = "computer";
                    break;
            }
            break;
        case "paper":
            switch(computerSelection.toLowerCase()) {
                case "rock":
                    document.querySelector("#rock").classList.add("enemy");
                    resultVisual.textContent = "You win! Paper beats Rock!";
                    outcome = "player";
                    break;
                case "paper":
                    document.querySelector("#paper").classList.add("tied");
                    resultVisual.textContent = "Nobody wins! Both chose Paper!";
                    outcome = "tie";
                    break;
                case "scissors":
                    document.querySelector("#scissors").classList.add("enemy");
                    resultVisual.textContent = "You lose! Scissor beats Paper!";
                    outcome = "computer";
                    break;
            }
            break;
        case "scissors":
            switch(computerSelection.toLowerCase()) {
                case "rock":
                    document.querySelector("#rock").classList.add("enemy");
                    resultVisual.textContent = "You lose! Rock beats Scissors!";
                    outcome = "computer";
                    break;
                case "paper":
                    document.querySelector("#paper").classList.add("enemy");
                    resultVisual.textContent = "You win! Scissors beats Paper!";
                    outcome = "player";
                    break;
                case "scissors":
                    document.querySelector("#scissors").classList.add("tied");
                    resultVisual.textContent = "Nobody wins! Both chose Scissors!";
                    outcome = "tie";
                    break;
            }
            break;
        default:
            outcome = "Invalid Option!";
    }
    return outcome;
}

// variables for score and selection
let playerSelection;
let playerScore = 0, computerScore = 0;
let audio;

// adding event listeners to the buttons
const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        // player hits confirm choice
        if (button.id == "confirm" && button.textContent != "Restart?") {
            console.log(button.textContent);
            // edge case nothing selected
            if (playerSelection == undefined) return;

            audio = new Audio("./sounds/confirm.wav");
            audio.currentTime = 0;
            audio.play();

            let outcome = playRound(playerSelection, getComputerChoice());
            
            // update scores
            if (outcome == "player") {
                playerScore++;
            }
            else if (outcome == "computer") {
                computerScore++;
            }

            // update the visual score
            let scoreVisual = document.querySelector("h2");
            scoreVisual.textContent = "Score: " + playerScore + " - " + computerScore;

            // if either players reach 5 points, game ends
            let resultVisual = document.querySelector("h3");
            if (playerScore == 5) {
                resultVisual.textContent = "GAME OVER: PLAYER WINS!";
                playerScore = 0; computerScore = 0;
                document.querySelector("#confirm").textContent = "Restart?";
            }
            else if (computerScore == 5) {
                resultVisual.textContent = "GAME OVER: COMPUTER WINS!";
                playerScore = 0; computerScore = 0;
                document.querySelector("#confirm").textContent = "Restart?";
            }

            // wait a couple of seconds before removing colors
            playerSelection = undefined;
            setTimeout(function() {
                buttons.forEach(btn => {btn.classList.remove("playing"); btn.classList.remove("enemy"); btn.classList.remove("tied");});
            }, 500);
        }
        // restarting game
        else if (button.textContent == "Restart?") {
            // text contents
            button.textContent = "CONFIRM";
            let scoreVisual = document.querySelector("h2");
            scoreVisual.textContent = "Score: " + 0 + " - " + 0;
            document.querySelector("h3").textContent = "First To 5 Wins!";

            // reset variables + button highlights
            playerSelection = undefined;
            buttons.forEach(btn => {btn.classList.remove("playing"); btn.classList.remove("enemy"); btn.classList.remove("tied");});

            // play reset audio
            audio = new Audio("./sounds/restart.wav");
            audio.currentTime = 0;
            audio.play();
        }
        // player selects an option
        else {
            buttons.forEach(btn => {btn.classList.remove("playing");});
            button.classList.add("playing");
            playerSelection = button.id;

            // play appropriate sound
            if (button.id == "rock") {
                audio = new Audio("./sounds/rock.wav");
            }
            else if (button.id == "paper") {
                audio = new Audio("./sounds/paper.wav");
            }
            else if (button.id == "scissors") {
                audio = new Audio("./sounds/scissors.wav");
            }
            audio.currentTime = 0;
            audio.play();
        }
    });
});
