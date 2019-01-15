const router = require('express').Router()

router.put('/:id', async (req, res, next) => {
  try {
    if (!req.user.isAdmin || !req.user.id !== req.params.id) {
      res.json("You do not have permissions for your request")
    }
    else if (req.body.isAdmin === true && !req.user.isAdmin) {
      res.json("You do not have permissions to set Admin")
    }

    const modifiedUser = await

  }
  catch (error) {
    next(error)
  }
})

module.exports = router
