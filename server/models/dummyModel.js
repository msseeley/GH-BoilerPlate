const db = require('./db')
const Sequelize = require('sequelize')

const dummyModel = db.define('dummyTable', {
  name: {
    type: Sequelize.STRING,
  }
})

module.exports = dummyModel
