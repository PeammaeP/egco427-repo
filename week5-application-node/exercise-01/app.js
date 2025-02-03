var express = require("express");
var fs = require("fs");
var crypto = require("crypto");
var routing = express();

var myUsers = require("./users.json").users;

routing
  .get("/profile/:id", function (req, res) {
    var userInfo = ""; // clear the info for every requests
    var user = myUsers.find((u) => u.id === req.params.id); // find the match userid and request params id 
    var shasum = crypto.createHash("sha1"); // create new hash function for every request 

    if (user) {
      for (const [key, value] of Object.entries(user)) {
        console.log(`${key} ${value}`);
        if (key === "password") {
          shasum.update(value.toString());
          var hashed = shasum.digest("hex");
          userInfo += `<h1>${key}: ${hashed}</h1>`;
        } else userInfo += `<h1>${key}: ${value}</h1>`;
      }
    } else {
      userInfo += `<h1>User Not Found</h1>`;
    }

    res.send(userInfo);
  })
  .listen(8081);
