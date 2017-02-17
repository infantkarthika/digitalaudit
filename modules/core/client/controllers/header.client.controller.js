'use strict';

angular.module('core').controller('HeaderController', ['$rootScope', '$scope', '$state', '$location', '$http', '$window', 'signinService',
  function ($rootScope, $scope, $state, $location, $http, $window, Authentication) {
    // Expose view variables
    $scope.$state = $state;    
    $scope.authentication =  Authentication ;
    $scope.authentication.user = Authentication.user = $rootScope.userDetails;

    // signout current user
    $scope.signout = function() {
      $http.get('/api/user/signout').then(function(){
        Authentication.user = $scope.authentication.user = null;
        $window.localStorage.removeItem("GO_allowedToView");
        $window.localStorage.removeItem("GO_allowedFormIds");
        $location.path('signin');
      },function(){

      });
    };

    // Verify if the user is logged in or not
    $scope.verify = function() {
          $http.get('/api/user/verify').then(function(response){  
          Authentication.user = response.data.username;
          $rootScope.userDetails = response.data.user;
        
      });
    };

   // $scope.verify();
  }
]);
