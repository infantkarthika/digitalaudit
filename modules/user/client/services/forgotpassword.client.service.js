'user strict';

angular.module('forgotpwd').factory('forgotPasswordService', function($http){

var forgotDataPoint =  'api/user/forgotpwd',
    dataFactory = {};

    dataFactory.forgotPassword = function(formdata) {        
    var formParam = {
        data : formdata
     }
    return $http.post(forgotDataPoint, formParam);
  }

  return dataFactory;

});