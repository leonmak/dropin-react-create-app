var AuthController = {};

AuthController.authUser = function (req, res) {
  // do something with req.user
  res.send(req.user? 200 : 401);

  // if(req.user)
  //   res.send(200, {user:req.user});
}

AuthController.checkSession =  function(req, res) {
  var isLoggedIn = req.isAuthenticated();
  if (isLoggedIn)
    return res.json({ isLoggedIn: isLoggedIn, user: req.user });
  return res.json({isLoggedIn: isLoggedIn});
}

AuthController.logout = function(req, res) {
  req.logout();
  req.session.destroy();
  return res.json('logged out :)');
}

module.exports = AuthController;
