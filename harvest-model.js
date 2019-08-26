var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Type= require('./type-model');

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
  { 
    timestamps: true,
    toJSON: {
      virtuals: true 
    }
  }
);


HarvestSchema.virtual('type', {
  ref: 'Type', // The model to use
  localField: 'type_id', // Find people where `localField`
  foreignField: 'id', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
 
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Harvest', HarvestSchema );