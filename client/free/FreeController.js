(function () {
  'use strict';
  
  angular
  .module('app.free')
  .controller('FreeController', FreeController);

  FreeController.$inject = ['FreeFactory','$scope', '$rootScope', '$stateParams', '$q', '$timeout', '$http'];

  function FreeController(FreeFactory, $scope, $rootScope, $stateParams, $q, $timeout, $http){
    var vm = this;

    FreeFactory.getPlaces();

  }
})();
    

