angular.module('teamFriends')
.controller('matchingCtrl', ['$scope', function($scope) {
  // local
  var lastTransitionX = -1;
  // scope
  $scope.direction = 0;
  $scope.defenses = [
    {
      name: "Alberto",
      lastName: "Casares",
      nickName: "IL pota",
      image: "http://imagenpng.com/wp-content/uploads/2015/03/Imagenes-Mario-Bros-PNG-1.png"
    },
    {
      name: "Alvaro",
      lastName: "Fernandez",
      nickName: "Payano",
      image: "http://imagenpng.com/wp-content/uploads/2015/03/Imagenes-Mario-Bros-PNG-1.png"
    },
    {
      name: "Jahiel",
      lastName: "Jeronimo",
      nickName: "Jero",
      image: "http://imagenpng.com/wp-content/uploads/2015/03/Imagenes-Mario-Bros-PNG-1.png"
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
}])
.directive('listCards', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/templates/listCards.html'
  };
});
