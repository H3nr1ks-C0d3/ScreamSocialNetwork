const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const dotenv = require("dotenv")
const session = require('express-session')
const methodOverride = require("method-override")
const MongoStore = require('connect-mongo')(session)
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require('./config/db')
const mainRoutes = require("./routes/main")
const homeRoutes = require("./routes/home")

// Dotenv config
dotenv.config({path: "./config/config.env"})

// Passport config
require("./config/passport")(passport)

// Connect to Database
connectDB()

// Middleware
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Logging
app.use(logger("dev"))

// Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Use flash messages for errors, info, ect...
app.use(flash());

// Routes
app.use("/", homeRoutes)
app.use("/feed", mainRoutes)

// Listen
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running, better catch it")
})