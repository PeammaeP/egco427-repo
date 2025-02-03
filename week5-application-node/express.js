var express = require("express");
var routing = express();

routing.get("/profile/:name", function (req, res) {
  res.send(`<h1>Hello Express ${req.params.name.toUpperCase()}</h1>`);
});
routing.listen(8081);
