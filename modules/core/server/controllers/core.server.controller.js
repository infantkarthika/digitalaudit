'use strict';

var validator = require('validator');

/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {

  var safeUserObject = null;

  if (req.user) {
    safeUserObject = {
      username: validator.escape(req.user.dataValues.username),
      sfid: validator.escape(req.user.dataValues.sfid),
      userID: req.user.dataValues.site_user_id
    };
  }

  res.render('modules/core/server/views/index', {
    user: safeUserObject
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
