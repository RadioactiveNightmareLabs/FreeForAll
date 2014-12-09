angular.module('getFreeStuff.getDataController', [
  'getFreeStuff.services',
  'ngFx'
  ])

.controller('getDataController', function ($scope, $http, $timeout) {

  $scope.freeStuff = [];
  $scope.freePlaces = [];
  $scope.freeEvents = [];
  $scope.freeAry = [];

  // used to filter the items
  $scope.filter = {};

  $scope.data = {
    filteredItems: []
  }

  $scope.addressCoords = {};
  $scope.addressString = {};

  // $scope.data.filteredItems.forEach(function (item, index) {
  //     $timeout(function() {
  //       $scope.freeAry.push(item, 100*index);
  //     });
  // })

  // var index = 1;

  var distanceService = new google.maps.DistanceMatrixService();

  $scope.getLocation = function (callback) {
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

          callback();
        } 
      });
    });
  }

  // $scope.getFreeStuff = function () {
  //   $scope.data.filteredItems = [];
  //   return $http({
  //     method: 'GET',
  //     url: 'http://free4allapi.herokuapp.com/things'
  //   })
  //   .success(function (data) {
  //       angular.forEach(data, function (item) {
  //       c
  //       });
  //   })
  // };

  $scope.getFreePlaces = function () {
    $scope.data.filteredItems = [];
    return $http({
      method: 'GET',
      url: "http://free4allapi.herokuapp.com/things"
    })
    .success(function (data) {
      angular.forEach(data, function (item) {
        $scope.calculateDistance(item); 
      })
    })
  }

  // $scope.getFreeEvents = function () {
  //   $scope.data.filteredItems = [];
  //   return $http({
  //     method: 'GET',
  //     url: 'http://free4allapi.herokuapp.com/events'
  //   })
  //   .success(function (data) {
  //       angular.forEach(data, function (item) {
  //       $scope.data.filteredItems.push(item); 
  //   });

  //     $scope.addDistanceTime($scope.data.filteredItems);
  //   })
  // };

    // add distance and time after arr has been populated
  // $scope.addDistanceTime = function (arr) {
  //   arr.forEach(function (item) {
  //     $scope.calculateDistance(item.location);
  //   });

  //   $scope.filteredItems = arr;
  // }

  // finds distance between destination position and current location
  // calculatDistance({lat: 46.5, lng: -122.5});
  $scope.calculateDistance = function (positionObject) {
    console.log('POSITION OBJ:', positionObject.location.lat);
    
    var destination = {
      lat: parseInt(positionObject.location.lat),
      lng: parseInt(positionObject.location.lng)
    };
    // async function
    distanceService.getDistanceMatrix({
      origins: [$scope.addressCoords],
      destinations: [destination],
      travelMode: google.maps.TravelMode.WALKING,
    }, function(response, status) {
      console.log('STATUS:', status)
      var result = response.rows[0].elements[0];

      console.log('RESULT:', result)
      var walkingDistance = result.distance.text;
      var walkingTime = result.duration.text;
      
      positionObject['walkingTime'] = walkingTime;
      positionObject['walkingDistance'] = walkingDistance;
      $scope.$apply();
      $scope.data.filteredItems.push(positionObject);
      $scope.$apply();
    });
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
      if (matching($scope.address, item.location)) {
        $scope.filtered.push(item);
      }
    });   
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
        $scope.data.filteredItems.push(item);
      }
    })
  }

  // inialize on controller load
  $scope.getLocation($scope.getFreePlaces);
});