angular.module('teamFriends')
.controller('matchingCtrl', ['$scope', '$rootScope', 'User', '$stateParams', '$ionicPopup', '$state', 'Match', 'Api',
  function($scope, $rootScope, User, $stateParams, $ionicPopup, $state, Match, Api) {
  // local
  var lastTransitionX = -1;
  var socket ;
  var infoSocket;
  var countPlayers = 0;
  var limitPlayers;
  // scope
  $scope.myTurn = false;
  $scope.goalKeepers = [];
  $scope.defenses = [];
  $scope.midfield = [];
  $scope.forward = [];

  var showAlertBack = function(title, content){
    var alertPopup = $ionicPopup.alert({
     title: title,
     template: content
    });
    alertPopup.then(function(res) {
      $state.go($rootScope.previousState);
    });
  }

  var updatePlayer = function(idPlayer, team){
    var group = [];
    group = group.concat($scope.goalKeepers, $scope.defenses, $scope.midfield, $scope.forward);
    for (var i = 0; i < group.length; i++) {
      if(group[i].id==idPlayer){
        group[i].team = (team) ? team : (($scope.myTeam==1) ? 2 : 1);
        group[i].moved = true;
        countPlayers++;
        break;
      }
    }
  }
  var initSocket = function(){
    //sockets
    socket = io.connect('http://localhost:3000/io/matching');

    console.log("soccket conectado")
    socket.on('info-matching', function (data) {
      console.log("Datos del socket", data, $stateParams)
      if(data.exit){
        $state.go('teams');
        return;
      }
      infoSocket = data;
      if(data.idUser == User.data.id){
        if(data.idPlayer){
          updatePlayer(data.idPlayer);
        }
        console.log("Comienza mi turno")
        $scope.myTurn = true;
        $scope.$digest();
      }
    });
  }

  Api.checkConnection().then(function(data){
    if(data.data.status){
      initialize();
    }else{
      showAlertBack('Plazo cerrado', 'Lo sentimos, el periodo para elegir equipos es del Sabado 20:00 al Domingo 12:00');
    }
  });


  var initialize = function(){
    Api.getTeams(Match.id).then(function(teams){
      $scope.myTeam = (teams.data[0].captain === User.data.id) ? 1 : ((teams.data[1].captain === User.data.id) ? 2 : -1);
      if($scope.myTeam<0){
        showAlertBack('Lo sentimos', 'No has sido seleccionado como capitán para este partido');
        return;
      }
      Api.getAssistans(Match.id).then(function(data){
        var assistants = data.data.assisting;
        for(var i=0; i<assistants.length; i++){
          if(assistants[i].position === "gk")
            $scope.goalKeepers.push(assistants[i]);
        }
        for(var i=0; i<assistants.length; i++){
          if(assistants[i].position === "df")
            $scope.defenses.push(assistants[i]);
        }
        for(var i=0; i<assistants.length; i++){
          if(assistants[i].position === "md")
            $scope.midfield.push(assistants[i]);
        }
        for(var i=0; i<assistants.length; i++){
          if(assistants[i].position === "at")
            $scope.forward.push(assistants[i]);
        }
        // count players
        limitPlayers = [].concat($scope.goalKeepers, $scope.defenses, $scope.midfield, $scope.forward).length;
        updatePlayer(teams.data[0].captain, 1);
        updatePlayer(teams.data[1].captain, 2);

        // TODO alert si no hay suficientes jugadores
        initSocket();
      });
    }, function(){
      showAlertBack('Plazo cerrado', 'Lo sentimos los capitanes aun no han sido elegidos');
    })

  }

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
