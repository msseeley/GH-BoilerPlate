const router = require('express').Router()
const { User } = require("../../db")

router.post('/', async (req, res, next) => {
  try {
    if (req.body.isAdmin === true && !req.user.isAdmin) { res.send("You don not have permissions to set Admin") }
    else {
      const [user] = await User.findOrCreate({
        where: {
          email: req.body.email,
          password: req.body.password
        }
      })
      if (user) {
        req.login(user, error => (error ? next(error) : res.json(user)))
      }
      else {
        const error = new Error("Incorrect Email or Password")
        error.status = 401
        throw error
      }
    }
  }
  catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(401).send('User already exists')
    }
    else { next(error) }
  }
})

router.put('/', async (req, res, next) => {
  try {
    if (!req.user.isAdmin || !req.user.id !== req.params.id) {
      res.send("You do not have permissions for your request")
      return
    }
    else if (req.body.isAdmin === true && !req.user.isAdmin) {
      res.send("You do not have permissions to set Admin")
      return
    }

    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) { res.status(401).send("User not found") }
    else if (!user.password) { res.send("Incorrect Password") }
    else {
      req.login(user, error => (error ? next(error) : res.json(user)))
    }
  }
  catch (error) {
    next(error)
  }
})

module.exports = router
