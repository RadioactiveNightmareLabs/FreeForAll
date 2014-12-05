angular.module('freeForAll.getData', [])

.controller('getDataController', function ($scope, getData) {
  angular.extend($scope, getData);

  $scope.getData();
});