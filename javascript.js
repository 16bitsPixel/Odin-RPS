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
    switch(playerSelection.toLowerCase()) {
        case "rock":
            switch(computerSelection.toLowerCase()) {
                case "rock":
                    console.log("Nobody wins! Both chose Rock!");
                    outcome = "tie";
                    break;
                case "paper":
                    console.log("You lose! Paper beats Rock!");
                    outcome = "player";
                    break;
                case "scissors":
                    console.log("You win! Rock beats Paper!");
                    outcome = "computer";
                    break;
            }
            break;
        case "paper":
            switch(computerSelection.toLowerCase()) {
                case "rock":
                    console.log("You win! Paper beats Rock!");
                    outcome = "player";
                    break;
                case "paper":
                    console.log("Nobody wins! Both chose Paper!");
                    outcome = "tie";
                    break;
                case "scissors":
                    console.log("You lose! Scissor beats Paper!");
                    outcome = "computer";
                    break;
            }
            break;
        case "scissors":
            switch(computerSelection.toLowerCase()) {
                case "rock":
                    console.log("You lose! Rock beats Scissors!");
                    outcome = "computer";
                    break;
                case "paper":
                    console.log("You win! Scissors beats Paper!");
                    outcome = "player";
                    break;
                case "scissors":
                    console.log("Nobody wins! Both chose Scissors!");
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

// adding event listeners to the buttons
const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        // player hits confirm choice
        if (button.id == "confirm") {
            // edge case nothing selected
            if (playerSelection == undefined) return;

            let outcome = playRound(playerSelection, getComputerChoice());
            
            // update scores
            if (outcome == "player") {
                playerScore++;
            }
            else if (outcome == "computer") {
                computerScore++;
            }

            console.log("Score " + playerScore + " - " + computerScore);

            // if either players reach 5 points, game ends
            if (playerScore == 5) {
                console.log("GAME OVER: PLAYER WINS!");
                playerScore = 0; computerScore = 0;
            }
            else if (computerScore == 5) {
                console.log("GAME OVER: COMPUTER WINS!");
                playerScore = 0; computerScore = 0;
            }

            playerSelection = undefined;
        }
        // player selects an option
        else {
            playerSelection = button.id;
        }
    });
});
