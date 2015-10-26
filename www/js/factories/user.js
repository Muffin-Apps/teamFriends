angular.module('teamFriends')
.factory("User", function(){
  var userInterface = {
    id: -1,
    name: '',
    createUser: function (id, name, lastName, nickName) {
      this.id = id;
      this.name = name;
    }
  };
  return userInterface;
});
