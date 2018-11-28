
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const AnimalSchema = new Schema(
  {
   
    id: {
      type: Number,
      required: true
    },
    breed: String,
    dogname: {
      type: String,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    sex: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    size: String,
    agelabel: String,
    likes: {
      type: Number,
      required: true
    },
    image: String,
    zipcode: Number
    
    // report: [{ type: Schema.Types.ObjectId, ref: "VolunteerReport"}]
    // shelter: { type: Schema.Types.ObjectId, ref: 'Shelter' },
    
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Animal", AnimalSchema);