// Load in the .env file values into process.env
require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
// const passport = require('./passport');
const db = require('./models');
const API_PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/api');
const path = require("path");
//for authentication 




// const authenticationUtils = require('./utils/authentication');


//------------------------------------------------

  
//-------------------------------------------------

  app.use(require('express-session')({ secret: 'keyboard cat23123', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
// app.use(passport.initialize());
// app.use(passport.session());


// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use("/api", apiRoutes);

app.use(express.static(path.join(__dirname, "..", "client", "build")))

app.get('*', (req, res) => {
  res.sendFile( path.join(__dirname, "..", "client", "build", "index.html"))
})
// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
