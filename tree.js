const readline = require("readline");
const fs = require("fs");

// Initialize readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Enable keypress events
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

// Function to display the timer
function displayTimer(seconds) {
  console.clear();
  console.log("Timer: " + seconds + "s");
}

// User input handling
let userInput = "";
console.log("Enter your text (press Enter to save): ");

process.stdin.on("keypress", (str, key) => {
  if (key && key.ctrl && key.name === "c") {
    process.exit(); // Exit on Ctrl+C
  } else if (key && key.name === "return") {
    fs.writeFileSync("user_input.txt", userInput);
    console.log("\nYour text has been saved to user_input.txt");
    process.exit();
  } else if (key && key.name === "backspace") {
    // Handle backspace
    userInput = userInput.slice(0, -1);
  } else {
    userInput += str;
  }
});

let seconds = 0;

// Start an interval to continuously update the timer
setInterval(() => {
  displayTimer(seconds++);
  // Move cursor to the beginning of the line and clear it
  readline.cursorTo(process.stdout, 0, 1);
  readline.clearLine(process.stdout, 1);
  process.stdout.write("Enter your text: " + userInput); // Display user input
}, 1000);
