//Seek Nature App
angular.module('seekFreeStuff',[
  'seekFreeStuff.locator',
  'seekFreeStuff.spaces',
  'ui.router',
  'snap',
  'seekFreeStuff.getData',
  'seekFreeStuff.services',
  'freeFilter'
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
  $urlRouterProvider.otherwise('/spaces');
  $stateProvider
    .state('spaces', {
      url: '/spaces',
      templateUrl: 'spaces/spaces.html',
      controller: 'SpacesController'
    })
})
.run(function(Locator) {
    if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser :(</p>";
    return;
  }
});
