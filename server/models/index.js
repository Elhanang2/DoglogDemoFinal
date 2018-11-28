require("dotenv").config();
const mongoose = require("mongoose");

// this is our MongoDB database
const dbRoute = process.env.MONGO_DB_URI;
// connects our back end code with the database
mongoose.connect (dbRoute, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);


let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));
module.exports.db = db;

module.exports.Volunteer = require("./volunteer");
module.exports.Animal = require("./animal");
module.exports.Shelter = require("./shelter");
module.exports.VolunteerReport = require("./volunteer_report");
module.exports.VolunteerSession =require("./volunteerSession");
