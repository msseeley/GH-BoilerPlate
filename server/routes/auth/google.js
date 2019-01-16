const router = require('express').Router()
const { User } = require('../../db')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

router.get('/auth/google', passport.authenticate('google', { scope: 'email' }))

router.get('/callback', passport.authenticate('google', {
  successRedirect: '/home',
  falureRedirect: '/login'
}))


const googleCredentials = {
  clientID: process.env.GOOGLE_CLIENT_ID || 'foo',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'bar',
  callbackURL: '/auth/google/callback'
}

const verificationCallback = async (token, refreshToken, profile, done) => {
  const info = {
    // name: profile.displayName,
    email: profile.emails[0].value,
    imageUrl: profile.photos ? profile.photos[0].value : undefined
  }

  try {
    const [user] = await User.findOrCreate({
      where: { googleId: profile.id },
      defaults: info
    })
    done(null, user)
  } catch (err) {
    done(err)
  }
}

const strategy = new GoogleStrategy(googleCredentials, verificationCallback)

passport.use(strategy)

module.exports = router
