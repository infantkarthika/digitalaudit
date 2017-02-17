'use strict';

module.exports = {
  client: {
    lib: {
      css: [
      'public/lib/bootstrap/dist/css/bootstrap.min.css',
      'public/lib/font-awesome/css/font-awesome.min.css',
      'public/lib/angular-datatables/dist/css/angular-datatables.min.css',
      'public/lib/angular-material/angular-material.min.css',
      'public/lib/angular-material/angular-material.css.css',      
      'public/lib/angular-datatables/dist/plugins/bootstrap/datatables.bootstrap.min.css'
      ],
      js: [
      'public/lib/jquery/dist/jquery.min.js',
      'public/lib/bootstrap/dist/js/bootstrap.min.js',
      'public/lib/jquery-backstretch-2/jquery.backstretch.min.js',
      'public/lib/angular/angular.js',
      'public/lib/angular-material/angular-material.js',
      'public/lib/angular-material/angular-material.min.js',
      'public/lib/angular-material/angular-material-mocks.js',
      'public/lib/angular-aria/angular-aria.min.js',
      'public/lib/angular-aria/angular-aria.js',
      'public/lib/angular-resource/angular-resource.js',
      'public/lib/angular-animate/angular-animate.js', 
      'public/lib/angular-messages/angular-messages.js',
      'public/lib/angular-ui-router/release/angular-ui-router.js',
      'public/lib/angular-sanitize/angular-sanitize.js',
      'public/lib/datatables.net/js/jquery.dataTables.js',
      'public/lib/angular-datatables/dist/angular-datatables.min.js',
      'public/lib/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.min.js'
      ]
    },
    css: [
    'https://fonts.googleapis.com/css?family=Roboto:400,100,300,500',
    'modules/core/client/css/form-elements.css',
    'modules/core/client/css/style.css'
    ],
    js: [
    'modules/core/client/js/scripts.js',
    'modules/core/client/app/config.js',
    'modules/core/client/app/init.js',
    'modules/*/client/*.js',
    'modules/*/client/**/*.js'
    ]
  },
  server: {
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    config: ['modules/*/server/config/*.js'],
    views: ['modules/*/server/views/*.html']
  }
};
