(function () {
  'use strict';
  
  angular
    .module('app.free')
    .controller('FreeController', FreeController);

    FreeController.$inject = ['$scope', '$rootScope', '$stateParams', '$q', '$timeout', '$http'];

    function FreeController(StuffFactory, $scope, $rootScope, $stateParams, $q, $timeout, $http){
      var vm = this;
      
    }
})();
    

