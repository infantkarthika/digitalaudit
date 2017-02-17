'use strict';

// Authentication service for user variables
angular.module('account').factory('AccountService',function($http){
var changepwd = 'api/user/changepwd',
    dataFactory = {};  
		
  	dataFactory.changepwd = function(formData) {
	    var formDataParam = {
	      data: formData
	    }
	    return $http.post(changepwd, formDataParam);
	  }

  return dataFactory;
});