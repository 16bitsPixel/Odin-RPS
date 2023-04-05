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