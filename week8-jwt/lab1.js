var express = require("express");
var jwt = require("jsonwebtoken");
var app = express();

app.use(express.json()); // using the middleware

var { MongoClient } = require("mongodb");

const PORT = 8081;
const URL = "mongodb://127.0.0.1:27017";

const dbName = "Product_CO2567T2";
const collectionName = "users";

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

// no need to verify the bearer token , create the token part
app.post("/api/login", async function (req, res) {
  // await connect
  const client = await MongoClient.connect(URL);
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  // the username and password that we want to update
  const { username, password } = req.body;

  console.log("Req Body Username : ", username);

  console.log("Req Body Password : ", password);

  // if match between the static { username , password } and the body.req ,
  // then create the Bearer Token
  const staticUsername = await collection.findOne({ username });
  const staticPassword = await collection.findOne({ password });

  // try-catch block implementation
  try {
    if (
      staticUsername.username == username &&
      staticPassword.password == password
    ) {
      // create the token
      const token = jwt.sign(
        {
          username: req.body.username,
          password: req.body.password,
        },
        "secret-key"
      );

      // const postUser = await collection.insertOne(bodyUpdate);
      console.log("Successfully Updated");
      // console.log(postUser);

      res.json({
        message: 'Authenticated! Use this token in the "Authorization" header',
        token: token,
      });
      res.end();
    }
  } catch {
    res.json({
      message: "Invalid Username or Password",
      user: {
        username: username,
        password: password,
      },
    });
    res.end();
  }
});

app.get("/api/protected", ensureToken, function (req, res) {
  jwt.verify(req.token, "secret-key", function (err, data) {
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

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
