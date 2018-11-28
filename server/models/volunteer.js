const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
// mongoose.Promise = global.Promise;


// this will be our data base's data structure 
const VolunteerSchema = new Schema(
  {
  
    firstname: {
      type: String,
      trim: true,
      required: "firstname is Required"
    },
    lastname: {
      type: String,
      trim: true,
      required: "lastname is Required"
    },
    // `email` must be of type String,unique and must match the regex pattern
    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    
    password: {
      type: String,
      trim: true,
      required: "Password is Required",
      validate: [
        function(input) {
          return input.length >= 6;
        },
        "Password should be longer."
      ]
    },
    password_confirm: {type: String,trim: true,
      required: "Password is Required",
      validate: [
        function(input) {
          return input.length >= 6;
        },
        "Password should be longer."
      ]},
    

    image: {type:String},
    // `date` must be of type Date. The default value is the current date
    isDeleted: {
      type: Boolean,
      default: false
    },
    signUpDate: {
      type: Date,
      default: Date.now()
    }
 
   }
);
VolunteerSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
VolunteerSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Volunteer", VolunteerSchema);