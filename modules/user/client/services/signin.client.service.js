'use strict';

angular.module('signin').factory('signinService',function($http){

  return {
  	signInUser:function(username,password){

  		var data = {username:username,password:password};
  		 return $http({
              method:'post', 
              url: 'api/user/signin',
              data: JSON.stringify(data),
              headers: {'Content-Type': 'application/json'}
            })
       }

  }

})

