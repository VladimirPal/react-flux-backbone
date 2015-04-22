var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var api = module.exports = express();
var access_token;
api.current_user = {};

api.use(logger('dev'));
api.use(bodyParser.json());

// It's a sample bundle backend, do not use it in production

var requireAuthentication = function(req, res, next) {
  access_token = req.query.access_token;
  if (access_token === undefined) {
    res.status(401);
  } else {
    api.current_user.username = access_token.split('_')[0];
    api.current_user.password = access_token.split('_')[1];
    api.current_user.permission = access_token.split('_')[0];
    next();
  }
};

api.all('/api/*', requireAuthentication);

require('./contacts/routes')(api);
require('./auth/routes')(api);

module.exports = api;
