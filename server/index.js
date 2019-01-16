const express = require('express')
const app = express() // initializing app
const path = require('path') //build-it
const volleyball = require('volleyball')
const session = require('express-session')
const passport = require('passport')
const { dbStore, User } = require('./db')

app.use(volleyball) //logging middleware for requests and response
app.use(express.static(path.join(__dirname, '..', 'public'))) // forward slash only works on linux and windows.

app.use(express.json()) //json parsing
app.use(express.urlencoded({ extended: true })) //url encoding parsing

app.use(session({
  secret: process.env.SESSION_SECRET || 'Unsecure secret here',
  store: dbStore,
  resave: false,// this option says if you haven't changed anything, don't resave. Reduces session concurrency issues
  saveUninitialized: false //if new and unmodified don't save

}))

app.use(passport.initialize())

app.use(passport.session())

passport.serializeUser((user, done) => {
  try {
    done(null, user.id)
  } catch (error) { done(error) } //in case the user does not exist, catch the error
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})

app.use(require('./routes'))

app.get('*', (req, res, next) => { //send its index.html for any requests that don't match one of our API routes
  res.sendFile(path.join(__dirname, '..', 'public'))
})

app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal Server Error')
})

module.exports = app
