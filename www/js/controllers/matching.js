angular.module('teamFriends')
.controller('matchingCtrl', ['$scope', '$rootScope', 'User', '$stateParams', '$ionicPopup', '$state', 'Match', 'Api',
  function($scope, $rootScope, User, $stateParams, $ionicPopup, $state, Match, Api) {
  // local
  var lastTransitionX = -1;
  // var socket = io.connect('http://localhost:3000/io/matching');
  var infoSocket;
  var countPlayers = 0;
  var limitPlayers;
  // scope
  $scope.myTurn = false;
  // $scope.myTeam = $stateParams.myTeam;
  $scope.goalKeepers = [];
  $scope.defenses = [];
  $scope.midfield = [];
  $scope.forward = [];

  // Api.checkConnection().then(function(data){
  //   if(data.data.status){
  //     initialize();
  //   }else{
  //     var alertPopup = $ionicPopup.alert({
  //      title: 'Plazo cerrado',
  //      template: 'Lo sentimos, el periodo para elegir equipos es del Sabado 20:00 al Domingo 12:00'
  //     });
  //     alertPopup.then(function(res) {
  //       $state.go($rootScope.previousState);
  //     });
  //   }
  // });


  var initialize = function(){
    Api.getAssistans(Match.id).then(function(data){
      var assistants = data.data.assisting;
      for(var i=0; i<assistants.length; i++){
        if(assistants[i].position === "gk")
          $scope.goalKeepers.push(assistants[i].splice(i, 1));
      }
      for(var i=0; i<assistants.length; i++){
        if(assistants[i].position === "df")
          $scope.defenses.push(assistants[i].splice(i, 1));
      }
      for(var i=0; i<assistants.length; i++){
        if(assistants[i].position === "md")
          $scope.midfield.push(assistants[i].splice(i, 1));
      }
      for(var i=0; i<assistants.length; i++){
        if(assistants[i].position === "at")
          $scope.forward.push(assistants[i].splice(i, 1));
      }
      // count players
      limitPlayers = [].concat($scope.goalKeepers, $scope.defenses, $scope.midfield, $scope.forward).length;

      console.log("limit", limitPlayers)
      //sockets
      // socket.on('info-matching', function (data) {
      //   console.log("Datos del socket", data, $stateParams)
      //   if(data.exit){
      //     $state.go('teams');
      //     return;
      //   }
      //   infoSocket = data;
      //   if(data.idUser == User.data.id){
      //     if(data.idPlayer){
      //       var group = [];
      //       group = group.concat($scope.goalKeepers, $scope.defenses, $scope.midfield, $scope.forward);
      //       for (var i = 0; i < group.length; i++) {
      //         if(group[i].id==data.idPlayer){
      //           group[i].team = ($scope.myTeam==1) ? 2 : 1;
      //           group[i].moved = true;
      //           countPlayers++;
      //           break;
      //         }
      //       }
      //     }
      //     console.log("Comienza mi turno")
      //     $scope.myTurn = true;
      //     $scope.$digest();
      //   }
      // });
    });
  }
  initialize();
  $scope.updatePosition = function (obj, direction) {
    if($scope.myTurn && !obj.moved && $scope.myTeam==direction){
      obj.team = direction;
      obj.moved = true;
      countPlayers++;

      socket.emit('player-chosen', { player: obj.id, idUser:User.data.id, idMatch: infoSocket.idMatch, finalize: countPlayers==limitPlayers});
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
