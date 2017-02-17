'use strict';

angular.module('user').controller('UserAuthenticationController', ['$rootScope', '$scope', '$state', '$http', '$location', '$window',
  function ($rootScope, $scope, $state, $http, $location, $window) {



    // Get an eventual error defined in the URL query string:

    $scope.error = $location.search().err;    
    $scope.signUpFieldsArray = [];
    $scope.signupFields ={}
    $scope.error = null;  

    $scope.signinp = function(response){     
    var userData = { username:$scope.username, password:$scope.password }
   
     
    };
    

    $scope.errorClass = function (control, method) {
        if ($scope.userForm[control].$invalid && !$scope.userForm[control].$pristine) {
           return (method == "class" ? 'has-error' : true);
        }
    };
  }

]);
