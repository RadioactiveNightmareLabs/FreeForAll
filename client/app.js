angular.module('seekFreeStuff',[
  'ui.router',
  'getFreeStuff.getDataController',
  'getFreeStuff.services',
  'seekFreeStuff.data',
  'snap',
  'ngFx'
])
.config(function(snapRemoteProvider) {
    snapRemoteProvider.globalOptions = {
      disable: 'right',
      hyperextensible: 'false',
    }
})

// use HTML5 Geolocation API to grab current position
.config(function($urlRouterProvider, $httpProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/icanhazfree');
  
  $stateProvider
    .state('index', {
      url: '/icanhazfree',
      templateUrl: 'views/free.html',
      controller: 'getDataController'
    })
})