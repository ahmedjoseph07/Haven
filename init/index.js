const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/haven";

main().then(() => {
    console.log("Connected to DB");
})
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(MONGO_URL)
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner:'66a88e4d0a84ec503a5d91da'}))
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();