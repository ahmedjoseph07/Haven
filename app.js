const express = require('express');
const app = express();
const mongoose = require("mongoose")
const Listing = require("./models/listing.js")
const path = require("path");
const MONGO_URL = "mongodb://127.0.0.1:27017/haven";


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

main().then(() => {
    console.log("Connected to DB");
})
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(MONGO_URL)
}


app.get("/", (req, res) => {
    res.send("I am root");
})

//Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
})

// app.get("/testListing", async(req, res) => {
//     let sampleListing = new Listing({
//         title: "My New villa",
//         description: "By the sea beach",
//         price: 1300,
//         location: "Chittagong",
//         country: "Bangladesh",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing ");
// })


app.listen(8080, () => {
    console.log("server is listening to port 8080");
})