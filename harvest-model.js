var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// this will be our data base's data structure 
var HarvestSchema = new Schema(
  {
    id: Number,
    name: String,
    description: String,
    location: String,
    gardenerId: Number,
    type_id:Number
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Harvest', HarvestSchema );