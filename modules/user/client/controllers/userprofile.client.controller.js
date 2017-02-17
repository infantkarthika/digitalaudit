'use strict';

angular.module('account',['ngMaterial','ngAria','ngAnimate','ngMessages']).controller('ProfileController', ['$rootScope', '$scope', '$state', '$location', '$http', '$window', 'AccountService',
  function ($rootScope, $scope, $state, $location, $http, $window, AccountService) {
    
    /// Expose view variablesAuthentication 

    $scope.loggedInUser = $rootScope.userDetails;
   
    $scope.changepwd = function(isValid){ 
      if($scope.profileForm.$valid){
        var formData = {site_user_id:$rootScope.userDetails.site_user_id, password:$scope.user.newpassword}
        AccountService.changepwd(formData).then(function (response) {
              if(response.data) {
                  //$state.go("signin");
                } 
            }, function (error) {
              $scope.error = error.message;
            }); 
            }     
          }
  }
]);
