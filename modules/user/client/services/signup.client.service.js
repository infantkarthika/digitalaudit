
'use strict';

angular.module('signup').factory('signupService',function($http){

var signUpUserDataPoint =  'api/user/signup',
    dataFactory = {};
    dataFactory.signUpUser = function(formdata) {        
    var formParam = {
        data: formdata
     }
    return $http.post(signUpUserDataPoint, formParam);
  }
  return dataFactory;
});
