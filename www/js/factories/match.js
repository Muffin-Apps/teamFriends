angular.module('teamFriends')
.factory("Match", function(){
  var matchInterface = {
    id: -1,
    date: '',
    createMatch: function (id, date) {
      this.id = id;
      this.date = date;
    }
  };
  return matchInterface;
});
