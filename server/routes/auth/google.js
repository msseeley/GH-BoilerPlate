const router = require('express').Router()
const { User } = require('../../db')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const googleCredentials = {
  clientID: process.env.GOOGLE_CLIENT_ID || 'foo',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'bar',
  callbackURL: '/auth/google/callback'
}

const verificationCallback = async (token, refreshToken, profile, done) => { //what does refresh token and done do?
  const info = {
    name: profile.displayName,
    email: profile.emails[0].value,
  }

  try {
    const [user] = await User.findOrCreate({
      where: { googleId: profile.id },
      defaults: info
    })
    done(null, user) //what does the done fn do?
  } catch (err) {
    done(err)
  }
}

const strategy = new GoogleStrategy(googleCredentials, verificationCallback)

passport.use(strategy) // what does passport do again?

router.get('/auth/google', passport.authenticate('google', { scope: 'email' }))

router.get('/callback', passport.authenticate('google', {
  successRedirect: '/home',
  falureRedirect: '/login'
}))

module.exports = router
