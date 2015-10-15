angular.module('teamFriends')
.controller('matchingCtrl', ['$scope', function($scope) {
  // local
  var lastTransitionX = -1;
  // scope
  $scope.direction = 0;
  $scope.users = [
    {
      name: "Alberto",
      lastName: "Casares",
      nickName: "IL pota"
    },
    {
      name: "Alvaro",
      lastName: "Fernandez",
      nickName: "Payano"
    },
    {
      name: "Jahiel",
      lastName: "Jeronimo",
      nickName: "Jero"
    }
  ]
  $scope.activeCard = function(obj){
    console.log("Se pulsa el objeto");
  }

  $scope.detectMouse = function(event, obj){
    console.log("Se mueve el objeto "+event.x);
  }

  $scope.updatePosition = function (obj, direction) {
    if(!obj.moved){
      obj.position = direction;
      obj.moved = true;
    }
    // user.position=1; user.moved=true
  }
}]);
