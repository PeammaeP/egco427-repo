// call the express application
var express = require("express");
var app = express();

// using the middleware
app.use(express.json());

// using the mongoClient as a mongoService
const { MongoClient } = require("mongodb");

const URL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(URL);

const dbName = "Product_CO2567T2";

const updateValue = [
  {
    name: "Bob",
    courseid: "egci111",
    coursename: "computer programming",
    mark: 80,
  },
  {
    name: "Tom",
    courseid: "egci111",
    coursename: "computer programming",
    mark: 50,
  },
  { name: "Sue", courseid: "egci427", coursename: "Web programming", mark: 90 },
  {
    name: "John",
    courseid: "egci427",
    coursename: "Web programming",
    mark: 70,
  },
  {
    name: "Jame",
    courseid: "egci472",
    coursename: "Web programming",
    mark: 60,
  },
];

async function main() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("student_records");

  //   const insertResult = await collection.insertMany(updateValue);
  //   console.log("Inserted Document -> ", insertResult);

  const filterOnlyComputer = await collection
    .find({
      coursename: { $regex: /^Computer Programming$/i },
    })
    .toArray();

  console.log("Filter Computer Course Name -> ", filterOnlyComputer);

  const markMoreThanSixty = await collection
    .find({
      mark: {
        $gt: 60,
      },
    })
    .toArray();
  console.log("Mark more than 60 ->", markMoreThanSixty);

  var expressionStartWithJ = { name: /^J/ };
  const nameStartWithJ = await collection.find(expressionStartWithJ).toArray();
  console.log("Name Start With J -> ", nameStartWithJ);
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
