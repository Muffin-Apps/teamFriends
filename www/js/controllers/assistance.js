angular.module('teamFriends')
.controller('assistanceCtrl', ['$scope', 'Api', function($scope, Api) {
  $scope.assist = [];
  $scope.notAssisting = [];
  $scope.unknown = [];
  Api.getAssistans(1).then(function(data){
    console.log(data)
    $scope.assist = data.data.assisting;
    $scope.notAssisting = data.data.notAssisting;
    $scope.unknown = data.data.unknown;
  })
}]);
