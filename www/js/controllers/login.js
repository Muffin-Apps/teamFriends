angular.module('teamFriends')
.controller('loginCtrl', ['$scope', 'Api', 'User', 'Match', '$state', '$ionicPopup',
 function($scope, Api, User, Match, $state, $ionicPopup) {
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
      var pass = CryptoJS.HmacSHA1($scope.model.password, "tokenMuffin").toString();
      Api.user.login($scope.model.email, pass).then(function(user){
        User.login(user.data);
        localStorage.setItem("email", User.data.email);
        localStorage.setItem("password", $scope.model.password);
        Api.match.getNextMatch().then(function(data){
          console.log("Match", data);
          Match.createMatch(data.data.id, new Date(data.data.date));
          $state.go('assistance')
        });
      }, function(err){
        console.log(err)
        var alertPopup = $ionicPopup.alert({
          title: 'Usuario incorrecto'
        });
      });
    }
  }


  // User.createUser("1", "Pota");
}]);
