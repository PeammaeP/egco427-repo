var express = require("express");
var routing = express();
var fs = require("fs");

var myAllData = [];

routing.get("/showForm", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

routing
  .get("/showData", function (req, res) {
    var data = {
      fname: req.query.fname,
      lname: req.query.lname,
      result: parseInt(req.query.input1) + parseInt(req.query.input2),
    };
    console.log(data);

    myAllData.push(data);

    res.send(JSON.stringify(myAllData));

    fs.writeFile("output.json", JSON.stringify(myAllData), (error) => {
      // throwing the error
      // in case of a writing problem
      if (error) {
        // logging the error
        console.error(error);

        throw error;
      }

      console.log("data.json written correctly");
    });
  })
  .listen(8081, () => {
    console.log("Server running on http://localhost:8081");
  });
