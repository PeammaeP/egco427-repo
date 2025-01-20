// date.html
//   Illustrates the use of the Date object by
//   displaying the parts of a current date and
//   using two Date objects to time a calculation

// Get the current date

var today = new Date();

// Fetch the various parts of the date

var dateString = today.toLocaleDateString("en-us", { weekday: "long" });
var dateMonth = today.toLocaleDateString("en-us", { month: "long" });
var dateYear = today.getFullYear();
var dateToday = today.getDate();
var myTime = today.toLocaleTimeString();
//Write your own code here

// Display the parts

// document.write("Date: " + dateString + "<br />", "Day: " + day + "<br />");
document.write(
  dateString +
    " " +
    dateToday +
    " " +
    dateMonth +
    " " +
    dateYear +
    " , " +
    myTime
);
//Write your own code here
