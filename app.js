const express = require("express");
const app = express();
let port = 8000;
const mongoose = require("mongoose");

const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
require('dotenv').config();



main()
  .then( () => {
    console.log(`Connected to DB`);
  })
  .catch((err) => {
    console.log(err)
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/reWaer");
};


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


// Session
app.use(session({
    secret: 'rewear-secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl:  "mongodb://127.0.0.1:27017/reWaer"})
}));


// Routes
app.use('/', require('./routes/auth'));
app.use('/items', require('./routes/items'));

//Index Route
app.get("/", (req, res) => {
  res.send("Hi, I am root" );
});



app.listen(port, () => {
  console.log(`connection successful`);
});