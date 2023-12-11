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

// Function to create the base Christmas tree
function createChristmasTree(height) {
  let tree = [];
  for (let i = 0; i < height; i++) {
    let stars = "*".repeat(2 * i + 1);
    let spaces = " ".repeat(height - i - 1);
    tree.push(spaces + stars);
  }
  tree.push(" ".repeat(height - 1) + "|");
  return tree;
}

// Function to add sparkle effect to the tree
function sparkleChristmasTree(tree) {
  return tree.map((line) => {
    return line
      .split("")
      .map((char) => {
        return Math.random() > 0.9 ? "o" : char;
      })
      .join("");
  });
}

// Function to display the tree in the console
function displayTree(tree) {
  console.clear();
  tree.forEach((line) => console.log(line));
}

// User input handling
let userInput = "";
console.log("Enter your text: ");

process.stdin.on("keypress", (str, key) => {
  if (key && key.ctrl && key.name === "c") {
    process.exit(); // Exit on Ctrl+C
  } else if (key && key.name === "return") {
    fs.writeFileSync("user_input.txt", userInput);
    console.log("\nYour text has been saved to user_input.txt");
    process.exit();
  } else {
    userInput += str;
  }
});

const height = 10; // Height of the Christmas tree
let christmasTree = createChristmasTree(height);

// Start an interval to continuously update the tree
setInterval(() => {
  let sparklingTree = sparkleChristmasTree(christmasTree);
  displayTree(sparklingTree);
  process.stdout.write("Enter your text: " + userInput); // Display user input
}, 500);
