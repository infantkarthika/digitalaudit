'use strict';

angular.module('signin',['ngMaterial','ngAria','ngAnimate','ngMessages']).controller('SigninController', ['$rootScope', '$scope', '$state', '$http', '$location', '$window', 'signinService',												    
	function($rootScope, $scope, $state, $http, $location, $window, signinService){

		$scope.error = $location.search().err;
		$scope.authentication = signinService;
		$scope.alerts = [];
		$rootScope.userDetails = {};


		$scope.signin = function(isValid){ 

			if (!isValid) {	 			 		
				$scope.$broadcast('show-errors-check-validity', 'userForm');
				return false;
			}			
			if($scope.loginForm.$valid){

				var userData = {username:$scope.user.email,password:$scope.user.password} 			
				if($scope.user.email != null && $scope.user.password != null){ 			

					signinService.signInUser($scope.user.email,$scope.user.password).then(function (response){
 					 // If successful we assign the response to the global user model
 					 
 					 $scope.authentication.user = response.data;
 					 console.log('Client - ',response.data);			        
 					 $rootScope.userDetails = $window.user = response.data;
 					 $state.go('account');
 					},
 					function(response){
 						$scope.alerts.push({msg: response.data.message });
 						$scope.error = response.data.message;
 					});

				}

			}

		};


		$scope.forgotpassword = function(isValid){
			if(!isValid){
				$scope.$broadcast('','');
				return false;
			}

			alert();


		};


		$scope.errorClass = function (control, method) {
			if ($scope.userForm[control].$invalid && !$scope.userForm[control].$pristine) {
				return (method == "class" ? 'has-error' : true);
			}
		};

	}

	]);