const passport = require('passport');

var AuthController = {};

AuthController.login = function(req, res, next) {
  passport.authenticate('facebook-token', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(info);
    }
    if (user) {
      req.session.save();
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.json(user);
      });
    }
  })(req, res, next);
}

AuthController.checkSession = function(req, res) {
  var isLoggedIn = req.isAuthenticated();
  if (isLoggedIn)
    return res.json({
      isLoggedIn: isLoggedIn,
      user: req.user
    });
  return res.json({
    isLoggedIn: isLoggedIn
  });
}

AuthController.logout = function(req, res) {
  req.logout();
  req.session.destroy();
  return res.json('logged out :)');
}

module.exports = AuthController;
