'use strict';

// Setting up route
angular.module('digitalaudit').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });
    
    // Home state routing
    $stateProvider
    .state('digitalaudit', {
      url: '/digitalaudit',
      templateUrl: 'modules/digitalaudit/client/views/digitalaudit.client.view.html'
    })
    .state('digitalauditform', {
      url: '/digitalaudit/:formId',
      templateUrl: 'modules/digitalaudit/client/views/digitalaudit.client.view.html',
    })
    .state('digitalauditSubmittedForms', {
      url: '/digitalaudit/submitted/:formId',
      templateUrl: 'modules/digitalaudit/client/views/digitalauditSubmitted.client.view.html'
    })
    .state('digitalauditformpage', {
      url: '/digitalaudit/:formId/:pageId',
      templateUrl: 'modules/digitalaudit/client/views/digitalaudit.client.view.html'
    });
  }
]);
