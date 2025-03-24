// เน้นไปการที่สร้าง Schema ในการทำงาน
"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {
    type: String,
    Required: "Please enter",
  },
  lastName: {
    type: String,
    Required: "Please enter",
  },
  //missed left last_name
  email: {
    type: String,
    Required: "Please enter",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", UserSchema);
// need the match collection with the parameter !
