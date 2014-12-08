angular.module('getFreeStuff.getDataController', [
  'getFreeStuff.services'
  ])

.controller('getDataController', function ($scope, $http) {

  $scope.freeStuff = [];
  $scope.freePlaces = [{name: "foo", location: {lat: 45, lng: -122}}];
  $scope.freeEvents = [];


  $scope.data = [];
  $scope.currentLocation = {};

  $scope.filter = {};
  $scope.filteredItems = [];
  $scope.address = {};

  // finds distance between destination position and current location
  // calculatDistance({lat: 46, lng: -122});
  $scope.calculateDistance = function (positionObject) {
    // take out google maps, use data from incoming object
    var destination = new google.maps.LatLng(positionObject.geometry.location.k, positionObject.geometry.location.B);
    // ex
    // {lat: 124, lng: 334}

    distanceService.getDistanceMatrix({
      origins: [$scope.address],
      destinations: [destination],
      travelMode: google.maps.TravelMode.WALKING,
    }, function(response, status) {
      var result = response.rows[0].elements[0];
      
      var walkingDistance = result.distance.text;
      var walkingTime = parseInt(result.duration.text);
      
      return ({walkingDistance: walkingDistance, walkingTime: walkingTime});

      $scope.$apply();
    });
  };

  // add distance and time after arr has been populated
  $scope.addDistanceTime = function (arr) {
    // loop through places or events array
    arr.forEach(function (item) {
      // apply calculateDistance to each item
      var distanceAndTime = $scope.calculateDistance(item.location);
        // add walking time and walking distance property to each item
        item.distanceAndTime = distanceAndTime;
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
    })
  }

  $scope.getLocation = function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          // gets area of address
          // this is liable to break because you can't guarantee same results...
          $scope.address = results[3].address_components[0].long_name.toLowerCase();  
          $scope.address = 'hayward';
          console.log('address acquired!');
          console.log($scope.address);

          $scope.getFreeStuff();  
        } 
      });
    });
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
  $scope.getLocation();
});