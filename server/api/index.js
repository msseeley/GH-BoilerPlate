const router = require('express').Router()
//To break out/add more routes:
//router.use('/subrouteUri', require('folderpath'))

router.use((req, res, next) => { //passes all errors to server/index.js error handler
  const err = new Error('Not Found')
  res.status(404)
  next(err)
})

module.exports = router
