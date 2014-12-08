angular.module('getFreeStuff.getDataController', [
  'getFreeStuff.services'
  ])

.controller('getDataController', function ($scope, $http) {

  $scope.freeStuff = [];
  $scope.filtered = [];
  $scope.address = 'east palo alto';

  $scope.getFreeStuff = function (string) {
    return $http({
      method: 'GET',
      url: 'http://free4allapi.herokuapp.com/things'
    })
    .success(function (data) {
      console.log(data);
      angular.forEach(data, function (item) {
        $scope.freeStuff.push(item);  
      });
    })
  };

  $scope.getLocation = function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          // gets area of address
          $scope.address = {};
          // this is liable to break because you can't guarantee same results...
          $scope.address = results[2].address_components[0].long_name.toLowerCase();  
          console.log($scope);     
        } 
      });
    });
  }

  // get all free stuff in current location
  $scope.freeArea = function() {
    // returns true if location is matching current location
    var matching = function (currentLocation, location) {
      var regex = new RegExp(currentLocation, 'g'); // hard coded
      return location.match(regex) ? true : false;
    }

    // loop through freeStuff
    angular.forEach($scope.freeStuff, function (item) {
      if (matching($scope.address, item.location)) {
        $scope.filtered.push(item);
      }
    });
    console.log($scope);
  }
});