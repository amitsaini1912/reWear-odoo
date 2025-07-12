const express = require("express");
const app = express();
let port = 8000;
const mongoose = require("mongoose");


main()
  .then( () => {
    console.log(`Connected to DB`);
  })
  .catch((err) => {
    console.log(err)
  });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/reWaer');
};


//Index Route
app.get("/", (req, res) => {
  res.send("Hi, I am root" );
});


app.listen(port, () => {
  console.log(`connection successful`);
});