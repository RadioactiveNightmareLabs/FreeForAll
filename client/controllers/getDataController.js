
/*
Order of operations

populate the data with freeStuff/Places/Events
  populate filter with objects
    filter data by stuff/places/events
      calculate distance from current position to each item
        add filtered items to filteredItems
          view is updated with filtered items
*/

angular.module('getFreeStuff.getDataController', [
  'getFreeStuff.services'
  ])

.controller('getDataController', function ($scope, $http) {

  $scope.freeStuff = [{name: 'burgers', location: 'SOMA', type: 'foo'}];
  $scope.freePlaces = [];
  $scope.freeEvents = [];

  // used to filter the items
  $scope.filter = {};
  $scope.filteredItems = [];

  $scope.addressCoords = {};
  $scope.addressString = {};

  var distanceService = new google.maps.DistanceMatrixService();


  // finds distance between destination position and current location
  // calculatDistance({lat: 46.5, lng: -122.5});
  $scope.calculateDistance = function (positionObject) {
    // take out google maps, use data from incoming object
    var destination = new google.maps.LatLng(positionObject.lat, positionObject.lng);

    distanceService.getDistanceMatrix({
      origins: [$scope.addressCoords],
      destinations: [destination],
      travelMode: google.maps.TravelMode.WALKING,
    }, function(response, status) {
      var result = response.rows[0].elements[0];

      var walkingDistance = result.distance.text;
      var walkingTime = parseInt(result.duration.text);
      
      positionObject['walkingTime'] = walkingTime;
      positionObject['walkingDistance'] = walkingDistance;

      console.log(positionObject);
      $scope.$apply(); // not sure if this is needed
    });
  };

  // add distance and time after arr has been populated
  $scope.addDistanceTime = function (arr) {
    // loop through places or events array
    arr.forEach(function (item) {
      // apply calculateDistance to each item
      $scope.calculateDistance(item.location);
        // add walking time and walking distance property to each item
    });
  }

  $scope.getLocation = function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

      geocoder.geocode({'latLng': latlng}, function(results, status) {
        console.log(results);
        if (status == google.maps.GeocoderStatus.OK) {
          console.log('address acquired!');
          // gets area of address
          // this is liable to break because you can't guarantee same results...
          $scope.addressString = results[3].address_components[0].long_name.toLowerCase();  
          $scope.addressCoords = {lat: position.coords.latitude, lng: position.coords.longitude};
          console.log($scope.addressString);
          console.log($scope.addressCoords);
        } 
      });
    });
  }

  $scope.getFreePlaces = function () {
    return $http({
      method: 'GET',
      url: "http://free4allapi.herokuapp.com/places"
    })
    .success(function (data) {
      angular.forEach(data, function (item) {
        $scope.freePlaces.push(item);
      })
      console.log($scope.freePlaces);
    })
  }
  
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

      $scope.freeArea();
    })
  };

  // get all free stuff in current location
  $scope.freeArea = function() {
    // returns true if location is matching current location
    var matching = function (currentLocation, location) {
      var regex = new RegExp(currentLocation, 'g');
      var result = location.match(regex);
      return location.match(regex) ? result : false;
    }

    // loop through freeStuff
    angular.forEach($scope.freeStuff, function (item) {
      console.log(item.location);
      console.log($scope.address);
      if (matching($scope.address, item.location)) {
        $scope.filtered.push(item);
      }
    });
    console.log($scope);
  }

  // filters freeStuff array
  // ex.
  // $scope.freeStuff = [{name: 'party', type: 'event'},{name: 'unwanted dog', type: 'thing'},{name: 'half baked idea', type: 'food'}];
  // $scope.filter = { events: 'event' , food: 'food'}
  // $scope.filterize (array, filter)
  // -> [{name: 'party', type: 'event'}, {name: 'half baked idea', type: 'food'}]
  $scope.filterize = function (array, filter) {
    array.forEach(function (item) {
      if (filter[item.type]) {
        $scope.filteredItems.push(item);
      }
    })
  }

  // inialize on controller load
  // $scope.getLocation();
});