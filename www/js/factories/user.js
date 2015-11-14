angular.module('teamFriends')
.factory("User", function(){
  var userInterface = {
    id: -1,
    email: '',
    password: '',
    createUser: function (id, email, password) {
      this.id = id;
      this.email = email;
      this.password = password;
    }
  };
  return userInterface;
});
