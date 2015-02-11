;(function () {
'use strict'

angular
  .module('app.core')
  .config(config);

  function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $stateProvider
    
    .state('freeStuff', {
      url:'/',
      views: {
        'list': {
          templateUrl:'/free/free.html',
          controller:'FreeController as vm'
        },
        'map': {
          templateUrl:'/map/map.html',
          controller:'FreeController as vm' 
        }
      }
    })

    $locationProvider.html5Mode(true)
  }

}).call(this);