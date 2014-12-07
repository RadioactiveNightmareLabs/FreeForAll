//Seek Nature App
angular.module('seekFreeStuff',[
  'seekFreeStuff.data',
  'ui.router',
  'snap',
  ])
//snapper options
  .config(function(snapRemoteProvider) {
    snapRemoteProvider.globalOptions = {
      disable: 'right',
      hyperextensible: 'false',
      // ... others options
    }
  })
// use HTML5 Geolocation API to grab current position
.config(function($urlRouterProvider, $httpProvider, $stateProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('data', {
      url: '/',
      templateUrl: 'data/data.html',
      controller: 'DataController'
    })
})
// .run(function(Locator) {
//     if (!navigator.geolocation){
//     output.innerHTML = "<p>Geolocation is not supported by your browser :(</p>";
//     return;
//   }
// });
