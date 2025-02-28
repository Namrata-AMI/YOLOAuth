require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const dbUrl = process.env.DB_URL;

const User = require("./models/user.js");
const userRoutes = require("./routes/user.js");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));


const sessionOptions = {
    secret: process.env.SECRET,           // our secret
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}

app.use(session(sessionOptions));
app.use(flash());  

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));  // user to first get authenticate from local  strategy //


passport.serializeUser(User.serializeUser());          
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.newUser = req.user;
    console.log(res.locals.newUser);
    next();
})


app.use(userRoutes);



main()
.then((res)=>{
    console.log(res);
    console.log("db connected");
})
.catch((e)=>{
    console.log(e);
    console.log("db errror");
})

async function main(){
    await mongoose.connect(dbUrl);
}




app.listen(8080,()=>{
    console.log("Server is listeing to port 8080");
})