var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

// 完成github登录
passport.serializeUser((user, done) => {
  done(null, user);
  
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});


passport.use(new GitHubStrategy({
  clientID: '25fb60fefe06bf27cb4c',
  clientSecret: 'feeefeea1f18d87b098680c5deb3d17580563528',
  callbackURL: "http://101.236.23.219:3000//auth/github/callback"
},
  (accessToken, refreshToken, profile, done) => {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
  }
));


router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {

    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
  });


module.exports = router;
