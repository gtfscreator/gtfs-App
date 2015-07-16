angular.module('gtfsApp.services', [])


.factory('Type', function() {

  var dizType = {
    1 : 'ciao',
    2 : 'Metropolitana',
    3 : 'bus',
    4 : 'nave',
    5 : 'mboooo'
  };

  var tipo = function(id){
  return dizType[id];
  console.log(dizType[id]);
  //console.log('ciao');
  }

  return { 'humanize' : tipo };


})


.factory('Filtri', function($window) {


  var filters = {
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

  $window.localStorage['filters'] = JSON.stringify(filters);



  var tipo = function(id){
//  return JSON.parse($window.localStorage['filters']).tipo[id];
// agiungere where che selesziona un certo nome a partire da un id
  }

  return {
    detail: function() {
      return JSON.parse($window.localStorage['filters']);
    },
    'addfiltertype' : tipo,
    'ritornaFiltri' : tipo,
  };



})
