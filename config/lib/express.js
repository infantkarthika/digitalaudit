'use strict';

/**
 * Module dependencies.
 */
var bodyParser = require('body-parser'),
  compress = require('compression'),
  config = require('../config'),
  consolidate = require('consolidate'),
  cookieParser = require('cookie-parser'), 
  express = require('express'),
  path = require('path'),
  session = require('express-session'), 
  methodOverride = require('method-override'),
  SequelizeStore = require('connect-session-sequelize')(session.Store);

/**
 * Initialize local variables
 * 
 */
module.exports.initLocalVariables = function(app) {
  // Setting application local variables
  app.locals.title = config.app.title;
  app.locals.description = config.app.description;
  app.locals.company = config.app.company;
  app.locals.keywords = config.app.keywords;
  app.locals.jsFiles = config.files.client.js;
  app.locals.cssFiles = config.files.client.css;
  app.locals.logo = config.logo;
  app.locals.favicon = config.favicon;
};

/**
 * Initialize application middleware
 */
module.exports.initMiddleware = function(app) {
  // Showing stack errors
  app.set('showStackError', true);
  // Enable jsonp
  app.enable('jsonp callback');
  
  // Should be placed before express.static
  app.use(compress({
    filter: function(req, res) {
      return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
    // Disable views cache
    app.set('view cache', false);
  } else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory';
  }

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
};


/**
 * Configure view engine
 */
module.exports.initViewEngine = function(app) {
  // Set swig as the template engine
  app.engine('server.view.html', consolidate[config.templateEngine]);

  // Set views path and view engine
  app.set('view engine', 'server.view.html');
  app.set('views', './');
};

/**
 * Configure Express session
 */
module.exports.initSession = function(app, db) {

  var sequelizeStore = new SequelizeStore({
    db: db
  });

  sequelizeStore.sync();

  // Express session storage
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    cookie: {
      maxAge: config.sessionCookie.sessionExpiration,
      httpOnly: config.sessionCookie.httpOnly,
      secure: config.sessionCookie.secure && config.secure.ssl
    },
    key: config.sessionKey,
    store: sequelizeStore
  }));
};

/**
* Invoke modules server configuration
*/
module.exports.initModulesConfiguration = function(app, db) {
  config.files.server.configs.forEach(function(configPath) {
    require(path.resolve(configPath))(app, db);
  });
};

/**
 * Configure the modules static routes
 */
module.exports.initModulesClientRoutes = function(app) {
  // Setting the app router and static folder
  app.use('/', express.static(path.resolve('./public')));

  // Globbing static routing
  config.folders.client.forEach(function(staticPath) {
    app.use(staticPath, express.static(path.resolve('./' + staticPath)));
  });
};

/**
 * Configure the modules server routes
 */
module.exports.initModulesServerRoutes = function(app) {
  // Globbing routing files
  config.files.server.routes.forEach(function(routePath) {
    require(path.resolve(routePath))(app);
  });
};

/**
* Configure the modules ACL policies
*/
module.exports.initModulesServerPolicies = function(app) {
  // Globbing policy files
  config.files.server.policies.forEach(function(policyPath) {
    require(path.resolve(policyPath)).invokeRolesPolicies();
  });
};

/**
* Configure error handling
*/
module.exports.initErrorRoutes = function(app) {
  app.use(function(err, req, res, next) {
    // If the error object doesn't exists
    if (!err) {
      return next();
    }
    // Log it
    console.error(err.stack);
    // Redirect to error page
    res.redirect('/server-error');
  });
};

/**
 * Initialize the Express application
 */
module.exports. init = function(db) {
  // Initialize express app
  var app = express();

  // Initialize local variables
  this.initLocalVariables(app);

  // Initialize Express middleware
  this.initMiddleware(app);

  // Initialize Express view engine
  this.initViewEngine(app);

  // Initialize Express session
  this.initSession(app, db);

  // Initialize Modules configuration
  this.initModulesConfiguration(app);

  // Initialize modules static client routes, before session!
  this.initModulesClientRoutes(app);

  // Initialize modules server routes
  this.initModulesServerRoutes(app);

  // Initialize error routes
  this.initErrorRoutes(app);

  return app;
};
