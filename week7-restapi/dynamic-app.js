// import the express
var express = require("express");
var app = express();

// using the middleware
app.use(express.json());

// use the mongo service
var { MongoClient } = require("mongodb");

const URL = "mongodb://127.0.0.1:27017";

const dbName = "StudentDB";
const collectionName = "myStudentCollection";

// "GET" Method
app.get("/getStudents", async function (req, res) {
  try {
    // await connect
    const client = await MongoClient.connect(URL);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // await to query and show
    const students = await collection.find({}).toArray();
    console.log(students);
    res.end(JSON.stringify(students));
  } catch {
    console.log("Error Fetching Student");
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// "POST" Method
app.post("/addStudent", async function (req, res) {
  try {
    const client = await MongoClient.connect(URL);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const resultUpdate = req.body;

    const updateCollection = await collection.insertOne(resultUpdate);
    console.log("Successfully Update the Student Collection");
    res.end(JSON(updateCollection));
  } catch {
    console.log("Can't Update the student information");
  }
});

// "PUT" Method

// "DELETE" Method

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Application run at http://%s:%s", host, port);
});
