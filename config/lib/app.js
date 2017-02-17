'use strict';

/**
 * Module dependencies.
 */

 var config = require('../config'),
 sequelize = require('./sequelize'),
 chalk = require('chalk'),
 express = require('./express');

 chalk.enabled = true;

// Initialize Models
module.exports.init = function init(callback) {

  sequelize.sequelize
  .sync({
    force: false
  })
  .then(function (db) {
    var app = express.init(db);

    if (callback) {
      callback(app, db, config);
    }

    return null;
  });

};

// Start
module.exports.start = function start(callback) {
  var _this = this;

  _this.init(function (app, db, config) {

     // Start the app by listening on <port> at <host>
      app.listen(config.port, config.host, function () {

      // Logging initialization
      console.log('--');
      console.log(chalk.green(config.app.title));
      console.log(chalk.green('Environment: ' + process.env.NODE_ENV));
      console.log(chalk.green('Port: ' + config.port));
      console.log(chalk.green('Database: ' + config.db.options.database));
      console.log('--');
      if (callback) callback(app, db, config);
    });
    });
};