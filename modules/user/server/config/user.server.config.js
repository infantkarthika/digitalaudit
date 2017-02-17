'use strict';

/**
 * Module dependencies.
 */
 var  path = require('path'),
 config = require(path.resolve('./config/config')),
 db = require(path.resolve('./config/lib/sequelize')),
 passport = require('passport');

/**
 * Module init function.
 */
 module.exports = function(app) {
  // Serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.dataValues.site_user_id);
    return null;
  });

  // Deserialize sessions
  passport.deserializeUser(function(id, done) {
    db.User
    .findOne({
      where: {
        site_user_id: id
      }
    })
    .then(function(user) {
      if (user) {  
        done(null, user);
        return null;
      }
    })
    .catch(function(error) {
      done(error);
    });
  });

  // Initialize strategies
  config.utils.getGlobbedPaths(path.join(__dirname, './strategies/**/*.js')).forEach(function(strategy) {
    require(path.resolve(strategy))(config);
  });

  // Add passport's middleware
  app.use(passport.initialize());
  app.use(passport.session());
};
