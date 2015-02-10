(function () {
  'use strict';
  
  angular
  .module('app.free')
  .controller('FreeController', FreeController);

  FreeController.$inject = ['FreeFactory','$scope', '$rootScope', '$stateParams', '$q', '$timeout', '$http'];

  function FreeController(FreeFactory, $scope, $rootScope, $stateParams, $q, $timeout, $http){
    var vm = this;
    vm.free = [];

    function init() {
      FreeFactory.getFree('places').then(function(places){
        vm.free = places;
        return places;
      }).then(function(places) {
        FreeFactory.getFree('events').then(function(events) {
          var tempEvents = events, tempPlaces = places;
          vm.free = events.concat(places);
          console.log('free',vm.free)
        })
      })
    }

    init();  
  }
})();
    

