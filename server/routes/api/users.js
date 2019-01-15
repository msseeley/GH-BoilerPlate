const router = require('express').Router()
const { User } = require('../../db')

router.get('/', async (req, res, next) => {
  try {
    if (!req.user.isAdmin) res.json("You do not have permissions for this information")
    const users = await User.findAll()
    res.json(users)
  }
  catch (error) {
    next(error)
  }
})


