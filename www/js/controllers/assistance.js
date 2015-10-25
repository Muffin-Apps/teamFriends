angular.module('teamFriends')
.controller('assistanceCtrl', ['$scope', function($scope) {
  $scope.data = [
    {
      name: "Xanxi",
      lastname: "Jerónimo",
      photo: 'http://ar.cdn01.mundotkm.com/2014/11/Pikachu.png',
      nickname: "Gitano"
    },
    {
      name: "Pota",
      lastname: "Casares",
      photo: 'http://ar.cdn01.mundotkm.com/2014/11/Pikachu.png',
      nickname: "Cojo"
    },
    {
      name: "Payano",
      lastname: "Fernández",
      photo: 'http://vignette2.wikia.nocookie.net/inciclopedia/images/3/34/Raichu.png/revision/20100215030540',
      nickname: "Drums"
    }
  ]
}]);
