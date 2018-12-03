const express = require('express')
const app = express() // initializing app
const path = require('path') //build-it

app.use('volleyball') //logging middleware for requests and response
app.use(express.static(path.join(__dirname, '..', 'public'))) // forward slash only works on linux and windows.

