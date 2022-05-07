const mongoose = require('mongoose');
//need to change the path 
const Campground = require('../models/campground');
const cities = require('./cities');
//import two different modules from same js file
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/monnem-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Get the default conncection
const db = mongoose.connection;
//To check if the connection is successful or not, use callback functions : on() and once()
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=> {
  console.log("Database connected");
});

//set random name of places and descriptors
const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

//Basic Setup 
const seedDB = async() => {
  await Campground.deleteMany({});
  //save random loc and title
  for(let i =0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: 'https://source.unsplash.com/collection/483251',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam, labore eius. Soluta magnam, harum quos fuga, necessitatibus alias dolorum veniam possimus quod nulla earum, consequuntur eaque aliquam voluptatibus non quaerat.',
      price
    });
    await camp.save();
  }
}

seedDB();