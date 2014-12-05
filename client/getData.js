angular.module('seekFreeStuff.getData', [])

.controller('getDataController', function ($scope, getData) {
  angular.extend($scope, getData);

  $scope.getFreeData();

  // returns freeStuff
  // usage:
  // item in freeStuff.results
  // item.name
  // item.location
  // item.date
  // item.type
  // item.href
});