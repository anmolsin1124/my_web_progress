////////////create  basic rock paper scissors game with 3 options and 1 player vs computer
//create a function to get the computer's choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

//create a function to play a round of rock paper scissors
function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  if (playerSelection === computerSelection) {
    return "It's a tie!";
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    return "You win! " + playerSelection + " beats " + computerSelection;
  } else {
    return "You lose! " + computerSelection + " beats " + playerSelection;
  }
}

//create a function to play the game with command‑line support
function game() {
  // use prompt in browsers or readline in Node
  if (typeof prompt !== "function") {
    // Node.js environment
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let playerScore = 0;
    let computerScore = 0;

    function ask() {
      rl.question("Enter rock, paper or scissors (or quit): ", (answer) => {
        const choice = answer.trim().toLowerCase();
        if (choice === "quit" || choice === "exit") {
          console.log(
            `Final score: you ${playerScore} - computer ${computerScore}`,
          );
          rl.close();
          return;
        }
        if (!["rock", "paper", "scissors"].includes(choice)) {
          console.log("Invalid choice, please try again.");
          ask();
          return;
        }
        const computerSelection = getComputerChoice();
        const result = playRound(choice, computerSelection);
        console.log(result);
        if (result.startsWith("You win")) playerScore++;
        else if (result.startsWith("You lose")) computerScore++;
        console.log(`Score: you ${playerScore} - computer ${computerScore}`);
        ask();
      });
    }

    ask();
  } else {
    // browser environment
    const playerSelection = prompt(
      "Enter your choice (rock, paper, or scissors):",
    );
    const computerSelection = getComputerChoice();
    const result = playRound(playerSelection, computerSelection);
    console.log(result);
  }
}

//start the game
if (typeof window !== "undefined" || typeof prompt === "function") {
  game();
  ////////////////////////////////
} else {
  // Node.js will call game() above after setting up readline
  game();
}
