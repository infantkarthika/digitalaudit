'use strict';

angular.module('signup',['ngMaterial','ngAria','ngAnimate','ngMessages']).controller('SignUpController', ['$rootScope', '$scope', '$state', '$http', '$location', '$window', 'signupService',
	function($rootScope, $scope, $state, $http, $location, $window, signupService){
			

	$scope.signup = function(){	
		if($scope.registerForm.$valid){
			var userData = {username:$scope.user.email,password:$scope.user.password,sfid:'',active:true}		
			//alert($scope.user.email+' - '+$scope.user.password+' - '+$scope.user.confirmPassword);
			//return false;
			if($scope.user.email != null && $scope.user.password != null){
				if($scope.user.password == $scope.user.confirmPassword){	
					signupService.signUpUser(userData).then(function (response){
						$state.go('account');			
					},
					function(response){
					 $scope.error = response.data.message;
					 alert($scope.error);
   				  });	
				}
		 	}	
		}
	};	

	$scope.errorClass = function (control, method) {
        if ($scope.userForm[control].$invalid && !$scope.userForm[control].$pristine) {
           return (method == "class" ? 'has-error' : true);
        }
    };								 

	
}


]);