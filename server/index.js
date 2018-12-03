const express = require('express')
const app = express() // initializing app
const path = require('path') //build-it

app.use('volleyball') //logging middleware for requests and response
app.use(express.static(path.join(__dirname, '..', 'public'))) // forward slash only works on linux and windows.

app.use(express.json()) //json parsing
app.use(express.urlencoded({ extended: true })) //url encoding parsing

app.use('/api', require('./api')) //api url prefix for routes from api folder

app.get('*', (req, res, next) => { //send its index.html for any requests that don't match one of our API routes
  res.sendFile(path.join((__dirname, '../public')))
})
