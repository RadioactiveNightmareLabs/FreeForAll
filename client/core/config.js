;(function () {
'use strict'

angular
  .module('app.core')
  .config(config);

  function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $stateProvider
    
    .state('freeStuff', {
      url:'/',
      templateUrl:'/free/free.html',
      controller:'FreeController as vm'
    })

    // $urlRouterProvider.otherwise('/');
  }

}).call(this);