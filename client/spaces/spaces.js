angular.module('seekFreeStuff.spaces', [])
.controller('SpacesController', function ($scope, Locator) {
  $scope.categories = ["Events", "Free stuff", "Art & museums"];
  $scope.data = [];
  $scope.currentLocation;
  $scope.distanceBetween = function(a, b){
    return google.maps.geometry.spherical.computeDistanceBetween(a, b);
  };

  var distanceService = new google.maps.DistanceMatrixService();

  var calculateDistance = function (positionObject, key, data){
    console.log(data);
    var destination = new google.maps.LatLng(positionObject.geometry.location.k, positionObject.geometry.location.B);
    distanceService.getDistanceMatrix({
      origins: [$scope.currentLocation],
      destinations: [destination],
      travelMode: google.maps.TravelMode.WALKING,
    }, function(response, status) {
      var result = response.rows[0].elements[0];
      var walkingDistance = result.distance.text;
      var walkingTime = parseInt(result.duration.text);
      positionObject['walkingTime'] = walkingTime;
      positionObject['walkingDistance'] = walkingDistance;
      $scope.data.push(positionObject);
      console.log(positionObject);
      $scope.$apply();
    });
  }

  var handleLocation = function (locationObject) {
    var latitude  = locationObject.coords.latitude;
    var longitude = locationObject.coords.longitude;
    $scope.currentLocation = new google.maps.LatLng(latitude, longitude);
    console.log('current location:', $scope.currentLocation);
    var request = {
      location: $scope.currentLocation,
      radius: 1000,
      types: ['park']
    };
    var map = new google.maps.Map(document.getElementById('results'));
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function(data) {
      _.each(data, function(placeObject, key, data) {
        calculateDistance(placeObject, key, data);
      });
    })
  }
  var handleFailure = function (error) {
    console.log(error);
  }


  Locator.getLocation(handleLocation, handleFailure)
});