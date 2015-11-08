angular.module('teamFriends')
.factory('Api', ['$http', function($http){
    var URL = "http://localhost:3000/api"
    var api_public = {};

    api_public.getAllUsers = function(){
      return $http.get(URL+'/users');
    }

    api_public.getAssistans = function(idMatch){
      return $http.get(URL+'/matches/'+idMatch+'/assistance');
    }

    return api_public;
}]);
