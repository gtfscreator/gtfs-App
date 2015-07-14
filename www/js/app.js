// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'restangular', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, RestangularProvider) {

  // server locale davide -------------------------------
  //var baseServerUrl = 'http://localhost:8000/v1/api/';
  // -------------------------------------------------------

  var baseServerUrl = 'http://audacepalestre.com/v1/api/';
  RestangularProvider.setBaseUrl(baseServerUrl);

  //Caching should be used, but the cache must be cleared when needed, for example when creating a new item!!!
  //RestangularProvider.setDefaultHttpFields({cache: true});

  RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
        var newResponse;
        if (operation === "getList") {
            newResponse = response.results != undefined ? response.results : response;
            newResponse.metadata = {
              count : response.count,
              next : response.next,
              previous : response.previous
            }
        } else {
            newResponse = response;
        }
        return newResponse;
    });
  
  RestangularProvider.setRequestSuffix('/?');

  
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })


  .state('app.linee', {
    abstract : true,
    views: {
      'menuContent': {
        template: "<ion-nav-view name='childView'></ion-nav-view>"
      }
    }

  })

  .state('app.linee.list', {
    url: "/linee",
    views: {
      'childView': {
        templateUrl: "templates/linee.html",
        controller : "LineeCtrl"
      }
    }
  })

  .state('app.linee.detail', {
    url: "/linea/:lineaId",
    cache : false,
    views: {
      'childView': {
        templateUrl: "templates/linea.html",
        controller : "LineaCtrl"
      }
    }
  })


  .state('app.fermate', {
    url: "/fermate",
    views: {
      'menuContent': {
        templateUrl: "templates/fermate.html"
      }
    }
  })
    .state('app.map', {
      url: "/map",
      views: {
        'menuContent': {
          templateUrl: "templates/map.html",
          controller: 'MapCtrl'
        }
      }
    })

    .state('app.info', {
      url: "/info",
      views: {
        'menuContent': {
          templateUrl: "templates/info.html",
          controller: 'InfoCtrl'
        }
      }
    });


    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/linee');
});
