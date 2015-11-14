angular.module('teamFriends')
.factory('Api', ['$http', function($http){
    var URL = "http://localhost:3000/api"
    var api_public = {};
    api_public.user = {};
    api_public.match = {};

    // User service
    api_public.user.login = function(email, password){
      return $http.post(URL+'/users/login', {email: email, password:password});
    }
    api_public.user.getAllUsers = function(){
      return $http.get(URL+'/users');
    }

    // match
    api_public.match.getNextMatch = function(){
      return $http.get(URL+'/matches/next');
    }

    api_public.getAssistans = function(idMatch){
      return $http.get(URL+'/matches/'+idMatch+'/assistance');
    }

    return api_public;
}]);
