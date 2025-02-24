var express = require("express");
var jwt = require("jsonwebtoken");
var app = express();

app.use(express.json()); // using the middleware

var { MongoClient } = require("mongodb");

const PORT = 8081;
const URL = "mongodb://127.0.0.1:27017";

const dbName = "Product_CO2567T2";
const collectionName = "users";

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

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
