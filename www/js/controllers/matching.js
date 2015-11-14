angular.module('teamFriends')
.controller('matchingCtrl', ['$scope', 'User', '$stateParams', '$ionicPopup', '$state', 'Match',
  function($scope, User, $stateParams, $ionicPopup, $state, Match) {
  // local
  var lastTransitionX = -1;
  var socket = io.connect('http://localhost:3000/io/matching');
  var infoSocket;
  var countPlayers = 0;
  var limitPlayers;
  // scope
  $scope.myTurn = false;
  $scope.myTeam = $stateParams.myTeam;

  $scope.goalKeepers = [
    {
      id: 9,
      name: "Ruben",
      lastName: "Ruiz",
      nickName: "Ruben",
      image: "http://imagenpng.com/wp-content/uploads/2015/03/Imagenes-Mario-Bros-PNG-1.png"
    },
    {
      id: 10,
      name: "Antonio",
      lastName: "Lozano",
      nickName: "Antonio",
      image: "http://imagenpng.com/wp-content/uploads/2015/03/Imagenes-Mario-Bros-PNG-1.png"
    }
  ]
  $scope.defenses = [
    {
      id: 1,
      name: "Rafa",
      lastName: "Peso",
      nickName: "Rafa",
      image: "http://imagenpng.com/wp-content/uploads/2015/03/Imagenes-Mario-Bros-PNG-1.png"
    },
    {
      id: 2,
      name: "Alvaro",
      lastName: "Fernandez",
      nickName: "Payano",
      image: "http://imagenpng.com/wp-content/uploads/2015/03/Imagenes-Mario-Bros-PNG-1.png"
    },
    {
      id: 3,
      name: "Alberto",
      lastName: "Casares",
      nickName: "IL pota",
      image: "http://imagenpng.com/wp-content/uploads/2015/03/Imagenes-Mario-Bros-PNG-1.png"
    }
  ]
  $scope.midfield = [
    {
      id: 4,
      name: "Manuel",
      lastName: "Fernandez",
      nickName: "Manolo canón",
      image: "http://imagenpng.com/wp-content/uploads/2015/03/Imagenes-Mario-Bros-PNG-1.png"
    },
    {
      id: 5,
      name: "Manuel",
      lastName: "Esteban",
      nickName: "Cuco",
      image: "http://imagenpng.com/wp-content/uploads/2015/03/Imagenes-Mario-Bros-PNG-1.png"
    },
    {
      id: 6,
      name: "Jahiel",
      lastName: "Jeronimo",
      nickName: "Jero",
      image: "http://imagenpng.com/wp-content/uploads/2015/03/Imagenes-Mario-Bros-PNG-1.png"
    }
  ]
  $scope.forward = [
    {
      id: 7,
      name: "Paco",
      lastName: "Ruiz",
      nickName: "Paco",
      image: "http://imagenpng.com/wp-content/uploads/2015/03/Imagenes-Mario-Bros-PNG-1.png"
    },
    {
      id: 8,
      name: "Rafa",
      lastName: "Porcel",
      nickName: "Karim",
      image: "http://imagenpng.com/wp-content/uploads/2015/03/Imagenes-Mario-Bros-PNG-1.png"
    }
  ]

  // count players
  limitPlayers = [].concat($scope.goalKeepers, $scope.defenses, $scope.midfield, $scope.forward).length;

  $scope.updatePosition = function (obj, direction) {
    if($scope.myTurn && !obj.moved && $scope.myTeam==direction){
      obj.team = direction;
      obj.moved = true;
      countPlayers++;

      socket.emit('player-chosen', { player: obj.id, idUser:User.id, idMatch: infoSocket.idMatch, finalize: countPlayers==limitPlayers});
      $scope.myTurn = false;
      showProgess = true;
    }else{
      if($scope.myTeam!=direction){
        $ionicPopup.alert({
           title: 'ELIGE BIEN',
           template: 'Tu equipo es el '+(($scope.myTeam==1) ? 'Verde' : 'Negro')
        });
      }else{
        console.log("No es tu turno o el jugador ya ha sido elegido")
      }

    }
    // user.position=1; user.moved=true
  }

  //sockets
  socket.on('info-matching', function (data) {
    console.log("Datos del socket", data, $stateParams)
    if(data.exit){
      $state.go('teams');
      return;
    }
    infoSocket = data;
    if(data.idUser == User.id){
      if(data.idPlayer){
        var group = [];
        group = group.concat($scope.goalKeepers, $scope.defenses, $scope.midfield, $scope.forward);
        for (var i = 0; i < group.length; i++) {
          if(group[i].id==data.idPlayer){
            group[i].team = ($scope.myTeam==1) ? 2 : 1;
            group[i].moved = true;
            countPlayers++;
            break;
          }
        }
      }
      console.log("Comienza mi turno")
      $scope.myTurn = true;
      $scope.$digest();
    }
  });

}])
.directive('listCards', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/templates/listCards.html',
    scope:{
      group: '=',
      listener: '='
    }
  };
});
