(function () {
  'use strict';
  
  angular
  .module('app.free')
  .controller('FreeController', FreeController);

  FreeController.$inject = ['FreeFactory', 'MapFactory', '$scope', '$rootScope', '$stateParams', '$q', '$timeout', '$http'];

  function FreeController(FreeFactory, MapFactory, $scope, $rootScope, $stateParams, $q, $timeout, $http){
    var vm = this;
    vm.free = [];
    // vm.freeMarkers = [];
    vm.markers = [];

    $scope.map = { center: { latitude: 37.774929, longitude: -122.419416 }, zoom: 12, bounds: {}    };
  

    // $scope.$watch('vm.freeMarkers', function(newValue, oldValue) {
    //   console.log('vm.freeMarkers updated', newValue)
    // })

    vm.events = {
      'click': function(Marker, eventName, model, args) {
        console.log(model.options.labelContent);
      }
    }

    function init() {
      FreeFactory.getFree('places').then(function(places){
        vm.free = places;
        return places;
      }).then(function(places) {
        FreeFactory.getFree('events').then(function(events) {
          var tempEvents = events, tempPlaces = places;
          vm.free = events.concat(places);
          // add marker to map
          angular.forEach(vm.free, function (item, index) {
            vm.markers.push(MapFactory.creatMarker(item, index));
          })
          console.log('markers',vm.markers.length, vm.free.length);
        })
      })
    }

    init();  
  }
})();
    

