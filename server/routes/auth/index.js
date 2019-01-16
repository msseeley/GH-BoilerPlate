const router = require('express').Router()

//fetches the logged in user
router.get('/me', (req, res, next) => {
  res.json(req.user || {})
})

router.delete('/', (req, res, next) => {
  req.logout()
  req.session.destroy(error => {
    if (error) { return next(error) }
    res.status(204).end('successfully logged out')
  })
})

router.use('/local', require('./local'))
router.use('/google', require('./google'))

router.use((req, res, next) => {
  const err = new Error('Auth route not found')
  err.status = 404
  next(err)
})


module.exports = router
