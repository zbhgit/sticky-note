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
  clientSecret: '986d95a5d612bba74d57504966705b5968e553c8',
  callbackURL: "http://18.222.33.142:3000/auth/github/callback"
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
