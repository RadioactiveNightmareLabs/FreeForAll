(function () {
  'use strict';
  
  angular
  .module('app.map')
  .controller('MapController', MapController);

  MapController.$inject = ['FreeFactory','$scope', '$rootScope', '$stateParams', '$q', '$timeout', '$http'];

  function MapController(FreeFactory, $scope, $rootScope, $stateParams, $q, $timeout, $http){
    var vm = this;
    vm.freeMarkers = [];
    $scope.map = { center: { latitude: 37.774929, longitude: -122.419416 }, zoom: 12, bounds: {}    };
  
    vm.markers = [];
    
    vm.events = {
      'click': function(Marker, eventName, model, args) {
        console.log(model);
      }
    }
  }
})();
    

