angular.module('gtfsApp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };


})

.controller('LineeCtrl', function($scope, $stateParams, Restangular, Type) {


  $scope.linee = [];
  $scope.pagina  = 0 ;
  $scope.updatig = false;
  $scope.filters = {
                  data: true, 
                  tipo :
                  [  { id:0, type: 'tram',  state : true} ,
                     { id:1, type: 'metro',  state : false} ,
                     { id:2, type: 'treno',  state : true} ,
                     { id:3, type: 'bus',  state : true} ,             
                     { id:4, type: 'barca',  state : true} ,
                     { id:5, type: 'funivia',  state : false} ,
                     { id:6, type: 'gondola',  state : true} ,
                     { id:7, type: 'funicolare',  state : true} 
                  ]
                  };

//console.log(_.where($scope.filter, {state:false}));


console.log(_.where($scope.filters.tipo, {state:false}));


//console.log($scope.filter[1])
//  console.log(Type.humanize(3));

  var updateLineeFromServer = function(page){
      $scope.updatig = true;
      //var params = angular.copy($scope.filters); se ci sono parametri
      var params = [];
      params.page = page;
      if(page == 1){
          $scope.linee = [];
      }
      Restangular.all('routes').getList(params)
      .then(function(data){
          $scope.linee = $scope.linee.concat(data);
          $scope.metadata = data.metadata;
          $scope.updatig = false;          
      });
  };

  $scope.updateLinee = function(){
      if($scope.updating){ $scope.$broadcast('scroll.infiniteScrollComplete'); return;}
      if($scope.metadata && $scope.metadata.next){
        $scope.pagina = $scope.pagina + 1;
        updateLineeFromServer($scope.pagina);
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
  };


  $scope.filtraLinee = function(){
    return function(linea){
//console.log(_.where($scope.filters.tipo, {state:false, id:linea.rtype}).length);
      if (_.where($scope.filters.tipo, {state:false, id:linea.rtype}).length>0) {
          return false;}      
      return true;
    }
  };


  updateLineeFromServer(1);

})

.controller('LineaCtrl', function($scope, $stateParams) {
// todo
})



.controller('FermateCtrl', function($scope, $stateParams, Restangular) {

  $scope.fermate = [];

  $scope.pagina  = 0 ;

  console.log($scope.fermate);

  $scope.updatig = false;

  var updateFermateFromServer = function(page){
      $scope.updatig = true;
      //var params = angular.copy($scope.filters); se ci sono parametri
      var params = [];
      params.page = page;
      if(page == 1){
          $scope.fermate = [];
      }
      Restangular.all('stops').getList(params)
      .then(function(data){
          $scope.fermate = $scope.fermate.concat(data);
          $scope.metadata = data.metadata;
          $scope.updatig = false;          
      });
  };

  $scope.updateFermate = function(){
      if($scope.updating){ $scope.$broadcast('scroll.infiniteScrollComplete'); return;}
      if($scope.metadata && $scope.metadata.next){
        $scope.pagina = $scope.pagina + 1;
        updateFermateFromServer($scope.pagina);
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
  };

  updateFermateFromServer(1);


})

.controller('MapCtrl', function($scope, $stateParams) {
// todo
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('InfoCtrl', function($scope, $stateParams) {
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});

