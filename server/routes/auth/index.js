const router = require('express').Router()

const { User } = require("../../db")

router.post('/signup', async (req, res, next) => {
  try {
    if (req.body.isAdmin === true && !req.user.isAdmin) { res.send("You don not have permissions to set Admin") }
    else {
      //ends up being signup or login bc of findOrCreate
      const newUser = await User.create(req.body)
      req.login(newUser, error => (error ? next(error) : res.json(newUser)))
    }
  }
  catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(401).send('User already exists')
    }
    else { next(error) }
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const foundUser = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!foundUser) {
      console.log('No such user found')
      res.status(401).send('No such user found, perhaps you input an incorrect username and/or password?')
    }
    else if (!foundUser.checkPassword(req.body.password)) {
      res.status(401).send(`Incorrect password for ${req.body.email}`)
    }
    else {
      req.login(foundUser, error => (error ? next(error) : res.json(foundUser)))
    }

  }
  catch (error) {
    next(error)
  }
})

router.post('/logout', (req, res, next) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res, next) => {
  res.json(req.user || {})
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

router.use('/google', require('./google'))

router.use((req, res, next) => {
  const err = new Error('Auth route not found')
  err.status = 404
  next(err)
})


module.exports = router
