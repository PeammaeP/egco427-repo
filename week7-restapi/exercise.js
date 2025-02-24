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

// 1) find student who are in the major "Science"
app.get("/showMajor/:department", async function (req, res) {
  try {
    // await connect
    const client = await MongoClient.connect(URL);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const myDepartment = req.params.department;

    // await to query and show
    const students = await collection
      .find({
        major: {
          // make it insensitive case
          $regex: new RegExp(`^${myDepartment}`, "i"),
        },
      })
      .toArray();
    console.log(students);
    res.end(JSON.stringify(students));
  } catch {
    console.log("Error Fetching Student");
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// 2) Find students that their age < 20 and sort by descending
app.get("/findageless/:age", async function (req, res) {
  try {
    const client = await MongoClient.connect(URL);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    var filterAgeValue = parseInt(req.params.age); // don't forgot to parseInt
    console.log("Filter Age : ", filterAgeValue);

    const filterAgeStudentCollection = await collection
      .find({
        age: {
          $lt: filterAgeValue,
        },
      })
      .sort({ age: -1 })
      .toArray();
    res.end(JSON.stringify(filterAgeStudentCollection));
  } catch {
    console.log("Can't filter the age");
    res.status(500).json({
      error: "Internal Server Error : <Can't filter the age>",
    });
  }
});

app.patch(
  "/updateLastname/:oldlastname/:newlastname",
  async function (req, res) {
    try {
      const client = await MongoClient.connect(URL);
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      const oldLastname = req.params.oldlastname;
      const newLastName = req.params.newlastname;

      const updateNewLastname = await collection.updateMany(
        { lastname: oldLastname },
        {
          $set: {
            lastname: newLastName,
          },
        }
      );

      const updateLastNameQuery = await collection
        .find({ lastname: newLastName })
        .toArray();

      console.log(updateLastNameQuery);
      res.end(JSON.stringify(updateLastNameQuery));
      await client.close();
    } catch {
      console.log("Can't Update the Lastname");
      res.status(500).json({
        error: "INTERNAL SERVER ERROR : <CAN'T UPDATE THE CODE>",
      });
    }
  }
);

app.post("/insertStudent", async function (req, res) {
  try {
    const client = await MongoClient.connect(URL);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const resultUpdate = req.body;

    const insertStudent = await collection.insertOne(resultUpdate);

    console.log(insertStudent);
    res.end(JSON.stringify(resultUpdate));
    await client.close();
  } catch {
    console.log("Can't Insert Student");
    res.status(500).json({
      error: "INTERNAL SERVER ERROR !",
    });
  }
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Application run at http://%s:%s", host, port);
});
