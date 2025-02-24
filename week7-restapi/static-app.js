var express = require("express");
var app = express();
var fs = require("fs"); // read user json

app.get("/getUsers", function (req, res) {
  fs.readFile(__dirname + "/user.json", "utf8", function (err, data) {
    console.log(data); // the response print in the console
    res.end(data); // need to have because display in the website and the response of the api
  });
});

app.get("/getUsers/:id", function (req, res) {
  const id = req.params.id;

  fs.readFile(__dirname + "/" + "user.json", "utf8", function (err, data) {
    if (err) {
      console.log("Error reading file : ", err);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }

    try {
      const objRecords = JSON.parse(data);
      var userById = objRecords["user" + id];
      console.log("userById is : ", userById);
      // don't forgot to using the JSON.stringify()
      res.end(JSON.stringify(userById.id));
    } catch (parseError) {
      console.log("Error Parsing JSON : ", parseError);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  });
});

var user = {
  user4: {
    name: "mohit",
    password: "password4",
    profession: "teacher",
    id: 4,
  },
};

// "POST" Method
app.post("/addUser", function (req, res) {
  fs.readFile(__dirname + "/" + "user.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    data["user4"] = user["user4"];
    console.log(data);
    res.end(JSON.stringify(data));
  });
});

// "DELETE" Method
app.delete("/deleteUser/:id", function (req, res) {
  const id = req.params.id;

  fs.readFile(__dirname + "/" + "user.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    delete data["user" + id];

    console.log("Detele User " + id);
    console.log(data);
    res.end(JSON.stringify(data));
  });
});

// using json-server and it give the same result
// run : "json-server --watch user.json"
// convenience to api management ( don't need to deep dive in code maybe ? )
// export from database , suitable for "public data" ( static data , not strict in security much )

var server = app.listen(8081, function () {
  var host = server.address().address; // using the address
  var port = server.address().port; // using the port
  console.log("Application run at http://%s:%s", host, port);
});
