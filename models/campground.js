const mongoose = require('mongoose');
//for model
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema ({
  title: String, 
  price: String,
  description: String,
  location: String
});

//Model Campground can be exported as a module
module.exports = mongoose.model('Campground', CampgroundSchema);