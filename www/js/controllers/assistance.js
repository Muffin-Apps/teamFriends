angular.module('teamFriends')
.controller('assistanceCtrl', ['$scope', 'Api', '$ionicPopup', 'Match', 'User', function($scope, Api, $ionicPopup, Match, User) {
  $scope.assist = [];
  $scope.notAssisting = [];
  $scope.unknown = [];
  $scope.annotedAssistance = -1;

  var isAnnotedAssistance = function(){
    if($scope.unknown.length===0 && $scope.assist.length===0 && $scope.notAssisting.length===0)
      return -1;
    for (var i = 0; i < $scope.unknown.length; i++) {
      if($scope.unknown[i].id === User.data.id)
        return 0;
    }
    return 1;
  }

  var updateAssistance = function(assist){
    Api.updateAssistance(Match.id, User.data.id, assist).then(function(){
      if(assist)
        $scope.assist.push(User.data);
      else
        $scope.notAssisting.push(User.data);

      for (var i = 0; i < $scope.unknown.length; i++) {
        if($scope.unknown[i].id === User.data.id){
          $scope.unknown.splice(i, 1);
          break;
        }
      }
      $scope.annotedAssistance = 1;
    }, function(err){
      $scope.annotedAssistance = 0;
    })
  };

  Api.getAssistans(Match.id).then(function(data){
    $scope.assist = data.data.assisting;
    $scope.notAssisting = data.data.notAssisting;
    $scope.unknown = data.data.unknown;
    $scope.annotedAssistance = isAnnotedAssistance();
  })

  $scope.confirmAssistance = function(){
    var confirmPopup = $ionicPopup.confirm({
     title: 'Confirmar asistencia',
     template: '¿Asistirás al proximo partido?',
     cancelText: 'No',
     cancelType: 'button-assertive',
     okText: 'Si',
     okType: 'button-balanced'
    });
    confirmPopup.then(function(res) {
     if(res) {
       updateAssistance("assisting");
     } else {
       updateAssistance("notAssisting");
     }
    });
  }


}]);
