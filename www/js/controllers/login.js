angular.module('teamFriends')
.controller('loginCtrl', ['$scope', 'Api', 'User', 'Match', '$state', function($scope, Api, User, Match, $state) {
  $scope.model = {
    email: '',
    password: ''
  };
  $scope.validate = false;

  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("password");
  if(email)
    $scope.model.email=email;
  if(pass)
    $scope.model.password=pass;

  $scope.login = function(){
    $scope.validate = true
    if(this.loginForm && this.loginForm.$valid){
      Api.user.login($scope.model.email, $scope.model.password).then(function(user){
        User.createUser(user.data.id, user.data.email, user.data.password);
        localStorage.setItem("email", User.email);
        localStorage.setItem("password", User.password);
        Api.match.getNextMatch().then(function(data){
          Match.createMatch(data.data.id, new Date(data.data.date));
          $state.go('assistance')
        });
      });
    }
  }


  // User.createUser("1", "Pota");
}]);
