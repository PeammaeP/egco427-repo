var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "What do you think of node.js? (easy/difficult)",
  function (answer) {
    // TODO: Log the answer in a database
    console.log("Thank you for your valuable feedback:", answer);
    rl.close();
  }
);
