var express = require("express");
var app = express();

var cb0 = function (req, res, next) {
  console.log("CB0");
  next();
};

var cb1 = function (req, res, next) {
  console.log("CB1");
  next();
};

var cb2 = function (req, res) {
  console.log("CB2");
  res.send("Hello from C!");
};

app.get("/example/c", [cb0, cb1, cb2]);

app.listen(8081);

//=============================//
var express = require("express");
var app = express();
app.use(express.json());

app.post("/", function (req, res) {
  res.send("Hello World");
});

app.post("/users/", function (req, res) {
  data = { name: req.body.name };
  console.log(data);

  res.send(JSON.stringify(data));
});

app.listen(8081);

//======================================================//
//Mongo
//=====================================================//

const { MongoClient } = require("mongodb");

//connection url
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const dbName = "Product_CO2567T2";

async function main() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("products");

  var obj = { name: "Coffee Mug", price: 10 };
  const insertResult = await collection.insertOne(obj);
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

//=====================================================//

const { MongoClient } = require("mongodb");

//connection url
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const dbName = "Product_CO2567T2";

async function main() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("products");

  //var obj = { name: 'Coffee Mug', price: 10}
  //const insertResult = await collection.insertOne(obj)

  /*var obj = [ 
        { name: "Book", price: 10 },
        { name: "Pencil", price: 5 },
        { name: "Calculator", price: 40 },
        { name: "Notebook", price: 15 },
        { name: "T-Shirt", price: 20 },
        { name: "Jacket", price: 20 }
      ]
    const insertResult = await collection.insertMany(obj)
    console.log('Inserted documents => ', insertResult)
    */

  /*const findResult = await collection.findOne({})
    console.log('Found documents => ', findResult)
    */
  /*const findResult = await collection.find({}).toArray()
    console.log('Found documents => ', findResult)*/

  /*var query = { name: /^C/}
    const findResult = await collection.find(query).toArray()
    console.log('Found documents => ', findResult)*/

  /*var key =  {name: -1}
    const findResult = await collection.find().sort(key).toArray()
    console.log('Found documents => ', findResult)*/

  /*var query =  {name: "Book"}
    const findResult = await collection.deleteOne(query)
    console.log('Found documents => ', findResult)*/

  /*var query =  {name: /^T/}
    const findResult = await collection.deleteMany(query)
    console.log('Found documents => ', findResult)*/

  var query = { name: "Coffee Mug" };
  var newValue = { $set: { name: "Tea Mug", price: 25 } };
  const updateResult = await collection.updateOne(query, newValue);
  console.log("Updated documents => ", updateResult);

  return "done";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

// //=======================================================================//

// //-----------Practice------------//
// Collection name: "student_records"

// [
//     { name: "Bob", courseid: "egci111", coursename: "computer programming", mark: 80 },
//     { name: "Tom", courseid: "egci111", coursename: "computer programming", mark: 50 },
//     { name: "Sue", courseid: "egci427", coursename: "Web programming", mark: 90 },
//     { name: "John", courseid: "egci427", coursename: "Web programming", mark: 70 },
//     { name: "Jame", courseid: "egci472", coursename: "Web programming", mark: 60 },
// ]

// 1) Find who take "Computer Programming"
// 2) Find who have mark >60
// 3) Find the student name start with J*
//------------------------------------//
