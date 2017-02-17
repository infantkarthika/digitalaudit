'use strict';

angular.module('forgotpwd').controller('ForgotPasswordController', ['$rootScope', '$scope', '$state', '$http', '$location', '$window', 'forgotPasswordService',
	function($rootScope, $scope, $state, $http, $location, $window, forgotPasswordService){
			
	$scope.error = $location.search().err;    
    $scope.signUpFieldsArray = [];
    $scope.signupFields ={}
    $scope.error = null;  

	$scope.forgotpswd = function(){
		forgotPasswordService.forgotPassword($scope.user.email).then(function(response) {
			console.log(response.data);	
			alert(response.data);

		},function(response){
			$scope.alerts.push({msg: response.data.message });
 			$scope.error = response.data.message;

		});
		
	};	

	$scope.errorClass = function (control, method) {
        if ($scope.userForm[control].$invalid && !$scope.userForm[control].$pristine) {
           return (method == "class" ? 'has-error' : true);
        }
    };								 

	
}


]);