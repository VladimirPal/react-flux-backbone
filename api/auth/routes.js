module.exports = function(api) {
  api.route('/auth')
    .post(function(req, res) {
      var username = req.body.username;
      var password = req.body.password;
      if (username === 'admin' && password === 'admin') {
        res.json({success: true, token: "admin_admin"});
      } else if (username === 'user' && password === 'user') {
        res.json({success: true, token: "user_user"});
      } else {
        res.json({success: false, msg: 'username or password is incorrect'});
      }
    });

  api.route('/api/profile')
    .get(function(req, res) {
      setTimeout(function() {
        res.json(api.current_user);
      }, 1000);
    });

};
