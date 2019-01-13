const Sequelize = require('sequelize')
const db = new Sequelize('postgres:localhost:5432/GH-BoilerPlate', { logging: false })
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.store)
const dbStore = new SequelizeStore({ db: db }) //session storage on db


module.exports = { db, dbStore }
