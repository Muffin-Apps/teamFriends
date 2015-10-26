angular.module('teamFriends')
.controller('socketCtrl', ['$scope', 'User', function($scope, User) {
  // sockets
  $scope.selectId = function (id) {
    User.createUser(id, "Pota");
    var socket = io.connect('http://localhost:3000/io/matching');
    $scope.myTurn = false;
    var infoSocket;

    var sendSelected = function (idSelected) {
      socket.emit('player-chosen', { player: idSelected, idUser:User.id, idMatch: infoSocket.idMatch });
      $scope.myTurn = false;
    }
    $scope.$watch(function(){
      return $scope.myTurn;
    }, function(newValue, oldValue) {
      console.log("Watch", $scope.myTurn)
      if(newValue){
        sendSelected(Math.floor(Math.random() * 10) + 5);
      }
    },true);

    socket.on('info-matching', function (data) {
      console.log("Datos del socket", data)
      infoSocket = data;
      if(data.idUser == User.id){
        console.log("Turno", $scope.myTurn)
        $scope.myTurn = true;
        $scope.$digest();
      }
    });
  }

}]);
