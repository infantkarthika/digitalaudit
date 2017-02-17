(function(){
	var app = angular.module('digitalAuditApp',['ngRoute']);	
	app.controller('LoginController',['$scope','$location',function($scope,$location){
		$scope.formFieldsArray = [];
		$scope.formFields = null;
		$scope.saveForm = function() {
		  /* if($scope.formFields) {
			  $scope.formFieldsArray.push(this.formFields);
			  $scope.formFields = {};
		  } */		  
			if ($scope.formFields) {
				$scope.formFieldsArray.push(this.formFields);
				//$scope.formFields = {};								
			} else {
				alert('invalid username and password');
			}
		  
		}; 
	}]);
	
	app.controller('signupController1',['$scope','$location',function($scope,$location){
		$scope.signupFieldsArray = [];
		$scope.signupFields = {};
		$scope.signupForm = function(){
			if($scope.signupFields.uname !=null && $scope.signupFields.pwd != null) {
				$scope.signupFieldsArray.push(this.signupFields);
				$scope.formFields = {};
				alert('Thank You');
			}
			else {
				alert('Please fill all fields!');
			}
		}
	}]);
	
	app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
		$routeProvider
		.when('/', {
			templateUrl : '../html/login.html',
			controller : 'LoginController'
		})
		.when('/signup', {
			templateUrl : '../html/signup.html',
			controller : 'signupController'
		})
		.when('/dashboard', {
			templateUrl : '../html/dashboard.html'
		})
		.when('/DAConInfo' , {
			templateUrl : '../html/DAConInfo.html'
		})
		.when('/DABusInfo' , {
			templateUrl : '../html/DABusInfo.html'
		})
		.when('/DAAuditSelection' , {
			templateUrl : '../html/DAAuditSelection.html'
		});
		
	}]);
	
})();