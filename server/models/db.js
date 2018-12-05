const Sequelize = require('sequelize')
const db = new Sequelize('postgres:localhost:5432/GH-BoilerPlate', { logging: false })

module.exports = db
