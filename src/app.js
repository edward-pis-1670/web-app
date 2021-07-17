const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000;
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirectoryPath));
//Setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//route

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Hoa",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Hello",
    name: "Console",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Mother",
  });
});

app.get("/weather", (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send(error)
      }
      res.send({
        forecast: forecastData.summary,
        location,
        address: req.query.address
      })
    }) 
  })
});

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  res.send({
    products:[]
  })
})

app.get("/help/*", (req, res) => {
  res.render('404', {
      title: '404',
      name:'Hoa',
      errorMessage:'Help article not found'
  })
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Hoa",
    errorMessage: "Page not found",
  });
});

//setting up server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
