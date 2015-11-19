angular.module('teamFriends')
.factory("User", function(){
  var userInterface = {
    data: {},
    isLogin: false,
    login: function (data) {
      this.data = data;
      this.isLogin = true;
    },
    logout: function(){
      this.data = {};
      this.isLogin = false;
    }
  };
  return userInterface;
});
