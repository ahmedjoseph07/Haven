const express = require('express');
const app = express();
const mongoose = require("mongoose")
const path = require("path");
const MONGO_URL = "mongodb://127.0.0.1:27017/haven";
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listing.js")
const reviews = require("./routes/review.js")
const session = require("express-session");
const flash = require("connect-flash");

// Database Connection
main().then(() => {
    console.log("Connected to DB");
})
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(MONGO_URL)
}

//Middlewares 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "public")));

// express-session pkg & connect-flash pkg used
const sessionOptions = {
    secret:"secretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
    }
}
// Root route
app.get("/", (req, res) => {
    res.send("I am root");
})

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

// Routes (using express-router)
app.use("/listings",listings)
app.use("/listings/:id/reviews",reviews)

//Non existing routes error prevention
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
})

//Error handler middleware 
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err });

})

//Server run
app.listen(8080, () => {
    console.log("server is listening to port 8080");
})
