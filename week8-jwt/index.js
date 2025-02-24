var express = require("express");
var jwt = require("jsonwebtoken");
var app = express();
app.use(express.json()); // using the middleware

const PORT = 8080;

app.get("/api/v1", function (req, res) {
  res.json({
    description: "My API version 1 , need authentication",
  });
});

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next(); // use with token with request -> Bearer Token
  } else {
    res.sendStatus(403);
  }
}

app.get("/api/v1/protected", ensureToken, function (req, res) {
  // secret key มักใช้กับ timestamp , id ของ user combination
  jwt.verify(req.token, "my-secret-key", function (err, data) {
    if (err) {
      res.sendStatus(403); // forbidden current
    } else {
      res.json({
        description: "Protected Information , congrats !",
        data: data,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  const user = { id: 3 };
  const token = jwt.sign({ user: user.id }, "my-secret-key");
  res.json({
    message: "Authenticated! Use this token in the 'Authorization' header",
    token: token,
  });
});

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
