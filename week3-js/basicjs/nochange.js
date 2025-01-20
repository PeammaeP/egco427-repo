// nochange.js
//   This script illustrates using the focus event
//   to prevent the user from changing a text field

// The event handler function to compute the cost

function computeCost() {
  //add your code here

  // Compute the cost

  // document.getElementById("cost").value = 100;
  var frenchCost = document.getElementById("french").value * 3.49;
  var hazlenutCost = document.getElementById("hazlenut").value * 3.95;
  var columbianCost = document.getElementById("columbian").value * 4.59;

  document.getElementById("cost").value =
    frenchCost + hazlenutCost + columbianCost;
  var finalCost = document.getElementById("cost").value;

  if (finalCost < 0) {
    alert("Invalid Input");
    document.getElementById("cost").value = 0;
  }
} //* end of computeCost
