const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()


// Define paths for Express confirg
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) 

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Nuri P'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Nuri P'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Nuri P',
    helpText: 'Some helpful text',
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You must provide an address'
    })
  } geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    } forecast (latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      } 
      res.send({
        address,
        location,
        forecast: forecastData
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: "404",
    errormsg: 'Help article not found',
    name: 'Nuri P'
  })
})


// render 404 page for all other * 
app.get('*', (req, res) => {
  res.render('404', {
    title: "404",
    errormsg: 'Page not found',
    name: 'Nuri P'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})