angular.module('teamFriends')
.controller('matchingCtrl', ['$scope', function($scope) {
  // local
  var lastTransitionX = -1;
  // scope
  $scope.direction = 0;
  $scope.users = [
    {
      name: "Pepe"
    },
    {
      name: "Juan"
    }
  ]
  $scope.activeCard = function(obj){
    console.log(obj);
  }

  $scope.detectMouse = function(event, obj){
    if(lastTransitionX==-1)
      $scope.direction = 0

    if(lastTransitionX<= event.x){
      $scope.direction = -1;
    }else{
      $scope.direction = 1;
    }
    console.log(obj.active)
  }
}]);
