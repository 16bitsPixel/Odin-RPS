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
                    outcome = "Nobody wins! Both chose Rock!";
                    break;
                case "paper":
                    outcome = "You lose! Paper beats Rock!";
                    break;
                case "scissors":
                    outcome = "You win! Rock beats Paper!";
                    break;
            }
            break;
        case "paper":
            switch(computerSelection.toLowerCase()) {
                case "rock":
                    outcome = "You win! Paper beats Rock!";
                    break;
                case "paper":
                    outcome = "Nobody wins! Both chose Paper!";
                    break;
                case "scissors":
                    outcome = "You lose! Scissor beats Paper!";
                    break;
            }
            break;
        case "scissors":
            switch(computerSelection.toLowerCase()) {
                case "rock":
                    outcome = "You lose! Rock beats Scissors!";
                    break;
                case "paper":
                    outcome = "You win! Scissors beats Paper!";
                    break;
                case "scissors":
                    outcome = "Nobody wins! Both chose Scissors!";
                    break;
            }
            break;
        default:
            outcome = "Invalid Option!";
    }
    return outcome;
}

/*
    Function plays 5 rounds of RPS
    Parameters: None
    Output: Results of 5 games of RPS
*/
function game() {
    for (let i = 0; i < 5; i++) {
        let playerSelection = prompt("Choose: Rock, Paper, or Scissors!");
        let computerSelection = getComputerChoice();

        console.log(playRound(playerSelection, computerSelection));
    }
}

game();