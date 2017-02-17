'use strict';

// Setting up route
angular.module('user').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      alert('$stateProvider.state')
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
    .state('signin', { 
      url: '/signin',
      templateUrl: 'modules/user/client/views/login.client.view.html'      
    })
    .state('signup',{
       url:'/signup',
       templateUrl: 'modules/user/client/views/register.client.view.html'
    })    
    .state('forgotpwd',{
       url:'/forgotpwd',
       templateUrl: 'modules/user/client/views/forgotPassword.client.view.html'      
    })
    .state('account',{
       url:'/account',
       templateUrl: 'modules/user/client/views/profile.client.view.html'      
    });     
  }
]);


