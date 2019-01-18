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


//session initially has an id and other metadata
//reliant on the client sending the same cookie--cookie can expire, often to do so when they quit their whole browser, this can be modified

app.use(session({
  secret: process.env.SESSION_SECRET || 'Unsecure secret here',
  store: dbStore, //persists to dbStore
  resave: false,// this option says if you haven't changed anything, don't resave. Reduces session concurrency issues
  saveUninitialized: false //if new and unmodified don't save
}))//assigns req.session

//Passport establishes req.user, enables express routes to use req.user object, that req.user represents the currently logged-in user.
//How? By storing something on the session, in this case a user.id
//Defines req.user w/its session middlware

app.use(passport.initialize())

app.use(passport.session()) //assigns req.user for every incoming request,when someone's logged in, it is a user instance, if not it's null.

//assumes that validation has already been done  via req.login in the route, which is then directed to our password validation methods vvv

passport.serializeUser((user, done) => { //serialize put something on the session ONLY when they log (in this case the user.id)
  try {
    done(null, user.id) //tells passport to put the user id on the session
  } catch (error) { done(error) } //in case the user does not exist, catch the error
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user) //what req.user gets assigned @ every request,
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
