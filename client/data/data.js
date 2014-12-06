angular.module('seekFreeStuff.data', [])
.controller('DataController', function ($scope, Locator) {
  // $scope.categories = ["Events", "Free stuff", "Art & museums"];
  // grab data from API server and put into data object on scope
  $scope.data = [];
  $scope.currentLocation;
  // $scope.distanceBetween = function(a, b){
  //   return google.maps.geometry.spherical.computeDistanceBetween(a, b);
  // };

  var distanceService = new google.maps.DistanceMatrixService();

  var calculateDistance = function (positionObject, key, data){
    console.log(data);
    // take out google maps, use data from incoming object
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

  // takes in location object from HTML geolocation function, and queries Google  Places to find [location type] nearby. then iterates through returned data and hands off data to calculate Distance.
  var handleLocation = function (locationObject) {
    var latitude  = locationObject.coords.latitude;
    var longitude = locationObject.coords.longitude;
    $scope.currentLocation = new google.maps.LatLng(latitude, longitude);
    console.log('current location:', $scope.currentLocation);
    var request = {
      location: $scope.currentLocation,
      radius: 1000
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

  var getLocation = function (successHandler, failureHandler){
    navigator.geolocation.getCurrentPosition(successHandler, failureHandler);
  }

  getLocation();
});