const mongoose = require("mongoose");
const initData = require("./data.js");
const Item = require("../models/item.js");

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/reWear");
}

const initDB = async () => {
  await Item.deleteMany({});
  await Item.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();