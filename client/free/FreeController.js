(function () {
  'use strict';
  
  angular
  .module('app.free')
  .controller('FreeController', FreeController);

  FreeController.$inject = ['FreeFactory','$scope', '$rootScope', '$stateParams', '$q', '$timeout', '$http'];

  function FreeController(FreeFactory, $scope, $rootScope, $stateParams, $q, $timeout, $http){
    var vm = this;
    vm.free = [];
    vm.freeMarkers = [];
    $scope.map = { center: { latitude: 37.774929, longitude: -122.419416 }, zoom: 11, bounds: {}    };
  
    $scope.markers = [];

    $scope.$watch('vm.freeMarkers', function(newValue, oldValue) {
      console.log('vm.freeMarkers updated', newValue)
    })

    function creatMarker(obj, id) {
      var marker = {
        latitude: obj.location.lat,
        longitude: obj.location.lng,
        id: id
      }

      marker.options = {
        draggable: true,
        labelContent: "woot",
        labelAnchor: "100 0",
        labelClass: "marker-labels"
      };
      return marker;
    }

    $scope.events = {
      'click': function(Marker, eventName, model, args) {
        console.log(Marker);
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

          angular.forEach(vm.free, function (item, index) {
            $scope.markers.push(creatMarker(item, index));
          })
          console.log('markers',$scope.markers.length, vm.free.length);
        })
      })
    }

    init();  
  }
})();
    

