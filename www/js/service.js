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

