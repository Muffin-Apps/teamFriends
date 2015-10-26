// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('teamFriends', ['ionic', 'ui.router', 'ngTouch'])

.config(function($stateProvider, $urlRouterProvider) {

  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "views/views/login.html"
    })
    .state('home', {
      url: "/home",
      templateUrl: "views/views/home.html"
    })
    .state('assistance', {
      url: "/assistance",
      templateUrl: "views/views/assistance.html",
      controller: "assistanceCtrl"
    })
    .state('matching', {
      url: "/matching",
      templateUrl: "views/views/matching.html",
      controller: "matchingCtrl"
    })
    .state('socket', {
      url: "/socket",
      templateUrl: "views/views/socket.html",
      controller: "socketCtrl"
    })

  $urlRouterProvider.otherwise("/socket");

})

.run(function($ionicPlatform, $rootScope, $ionicSideMenuDelegate) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    $rootScope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
  });
})
