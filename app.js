const express = require ('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const Campground = require('./models/campground')

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

const app = express();

//set the ejs as view engine for express in folder views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//body Parse
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('home');
});
app.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({})
  res.render('campgrounds/index', { campgrounds });
});
//CREATE new model
app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
});
//campgrounds/new and POST are coming first than :id
app.post('/campgrounds', async(req, res)=> {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
})

app.get('/campgrounds/:id', async(req, res) => {
  //pass the ID
  const campground = await Campground.findById(req.params.id)
  res.render('campgrounds/show', { campground });
});
//UPDATE a model
app.get('/campgrounds/:id/edit', async(req, res) => {
  const campground = await Campground.findById(req.params.id)
  res.render('campgrounds/edit', { campground });
});
//Override the updated model
app.put('/campgrounds/:id', async(req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
  res.redirect(`/campgrounds/${campground._id}`);
});
//DELETE
app.delete('/campgrounds/:id', async(req,res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect(`/campgrounds`);
});

app.listen(3000, ()=> {
  console.log("Serving on port 3000");
});