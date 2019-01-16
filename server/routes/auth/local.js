const router = require('express').Router()
const { User } = require("../../db")

router.post('/signup', async (req, res, next) => {
  try {
    if (req.body.isAdmin === true && !req.user.isAdmin) { res.send("You don not have permissions to set Admin") }
    else {
      //ends up being signup or login bc of findOrCreate
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

//Put request /auth/local means changing current user, updating the user on the session
router.put('/', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) { res.status(401).send("User not found") }
    else if (!user.checkPassword(req.body.password)) { res.send("Incorrect Password") }
    else {
      req.login(user, error => (error ? next(error) : res.json(user)))
    }
  }
  catch (error) {
    next(error)
  }
})

module.exports = router
