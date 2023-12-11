const readline = require("readline");
const fs = require("fs");

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
        return Math.random() > 0.9 ? "o" : char; // Randomly replace some * with o to create a sparkle effect
      })
      .join("");
  });
}

// Function to display the tree in the console
function displayTree(tree) {
  console.clear();
  tree.forEach((line) => console.log(line));
}

// Setting up readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Asking the user for input
rl.question(
  "Enter some text to store with the Christmas tree: ",
  (inputText) => {
    const height = 10; // Height of the Christmas tree
    let christmasTree = createChristmasTree(height);

    // Set an interval to update the tree display
    setInterval(() => {
      let sparklingTree = sparkleChristmasTree(christmasTree);
      displayTree(sparklingTree);
    }, 500); // Update every 500 milliseconds

    // Save the static tree and input text to a file
    const treeString = christmasTree.join("\n") + "\n" + inputText;
    fs.writeFileSync("christmas_tree.txt", treeString);
    console.log(
      "Your text and the Christmas tree have been saved to christmas_tree.txt"
    );

    rl.close();
  }
);
