// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('teamFriends', ['ionic', 'ui.router', 'ngTouch', 'angular-spinkit', 'angularMoment'])

.config(function($stateProvider, $urlRouterProvider) {

  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "views/views/login.html",
      controller: "loginCtrl"
    })
    .state('home', {
      url: "/home",
      templateUrl: "views/views/home.html"
    })
    .state('assistance', {
      url: "/assistance",
      templateUrl: "views/views/assistance.html",
      controller: "assistanceCtrl",
      cache: false
    })
    .state('matching', {
      url: "/matching",
      templateUrl: "views/views/matching.html",
      controller: "matchingCtrl",
      cache: false
    })
    .state('socket', {
      url: "/socket",
      templateUrl: "views/views/socket.html",
      controller: "socketCtrl"
    })
    .state('teams', {
      url: '/teams',
      templateUrl: 'views/views/teams.html',
      controller: 'teamsCtrl'
    });

  $urlRouterProvider.otherwise("/login");

})

.run(function($ionicPlatform, $rootScope, $ionicSideMenuDelegate, amMoment, $state, $document, User) {
  $rootScope.$state = $state;
  $rootScope.goShowSidebar = false;

  amMoment.changeTimezone('Europe/Madrid');
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
      console.log(window.cordova)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    // $rootScope.toggleLeft = function() {
    //   $ionicSideMenuDelegate.toggleLeft();
    // };

    console.log(window.plugins)

    $rootScope.goLogin = function(){
      User.logout();
      $state.go('login')
    }

    $rootScope.goState = function(state){
      $rootScope.closeSideBar();
      $state.go(state);
    }

    $rootScope.closeSideBar = function(){
      $ionicSideMenuDelegate.toggleLeft();
      $rootScope.toggleSideBar();
    }

    $rootScope.toggleSideBar = function(){
      $rootScope.isOpenShowSidebar = !$rootScope.isOpenShowSidebar;
    }

    $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
        $rootScope.previousState = fromState.name;

        if($rootScope.isOpenShowSidebar)
          $rootScope.closeSideBar();
        if(toState.name === "login" && User.isLogin){
          event.preventDefault();
          if(ionic.Platform.isAndroid())
            navigator.app.exitApp();
        }

        if(toState.name != "login" && !User.isLogin){
          event.preventDefault();
          $state.go('login');
        }
    })

    var app = {
        // Application Constructor
        initialize: function() {
          console.log("inicializar")
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function() {
          window.parsepushnotification.setUp("9oQpIQonajhCGy93Zscfzn9xT61vfAsvR0cIh6ZI", "iW51IAW3ILByREoLnR2aODwQYKk421LS19ts6UUx");
          console.log("push obj",window.parsepushnotification)
          window.parsepushnotification.onRegisterAsPushNotificationClientSucceeded = function() {
        		alert('onRegisterAsPushNotificationClientSucceeded');
        	};
        	// window.parsepushnotification.onRegisterAsPushNotificationClientFailed = function() {
        	// 	alert('onRegisterAsPushNotificationClientFailed');
        	// };
        }
    };

    app.initialize();
  });




})
