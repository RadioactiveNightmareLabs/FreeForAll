;(function () {
'use strict';

angular
  .module('app.core')
  .config(config);

  function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $stateProvider
    
    .state('freeStuff', {
      url:'/stuff',
      templateUrl:'free/free.html',
      controller:'FreeController as vm'
    })

    .state('foobar', {
      url: '/test',
      template: '<div>HEEEEEEEY</div>',
      controller: 'FreeController as vm'
    });


    console.log('config');
    $urlRouterProvider.otherwise('/');
  }

}).call(this);