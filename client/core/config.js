;(function () {
'use strict';

angular
  .module('app.core')
  .config(config);

  function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $stateProvider

    .state('freeStuff', {
      url: '/freeStuff',
      templateUrl: 'app/free/free.html',
      controller: 'FreeController as vm'
    });
  }

}).call(this);