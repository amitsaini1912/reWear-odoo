const express = require("express");
const app = express();
let port = 8000;
const mongoose = require("mongoose");

const session = require('express-session');

const passport = require('passport');
const flash = require('connect-flash');

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


// Flash messages
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use('/', require('./routes/auth'));
const itemRoutes = require('./routes/items');
app.use('/items', itemRoutes);
app.use('/admin', require('./routes/adminRoutes'));



//Index Route
app.get("/", (req, res) => {
  res.render("pages/index.ejs");
});



app.listen(port, () => {
  console.log(`connection successful`);
});