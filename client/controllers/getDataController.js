
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
  'getFreeStuff.services',
  'ngFx'
  ])

.controller('getDataController', function ($scope, $http, $timeout) {

  $scope.freeStuff = [{name: 'burgers', location: 'SOMA', type: 'foo'}];
  $scope.freePlaces = [];
  $scope.freeEvents = [];
  $scope.freeAry = [];

  // used to filter the items
  $scope.filter = {};
  $scope.filteredItems = [
  {"name":"Free working RCA 32 inch tv You Haul","location":"(concord / pleasant hill / martinez)","date":"2014-12-08 08:53","type":"thing","href":"http://sfbay.craigslist.org/eby/zip/4795894704.html"},{"name":"Free dirt //// soil clean fill","location":"(danville / san ramon)","date":"2014-12-08 08:52","type":"thing","href":"http://sfbay.craigslist.org/eby/zip/4795892297.html"},{"name":"Free Garden Bathtub ( Palamores Hills/Castro Valley)","location":"(hayward / castro valley)","date":"2014-12-08 08:51","type":"thing","href":"http://sfbay.craigslist.org/eby/zip/4795891175.html"},{"name":"Free VHS movies","location":"(santa rosa)","date":"2014-12-08 08:51","type":"thing","href":"http://sfbay.craigslist.org/nby/zip/4795890491.html"},{"name":"Women's Casual Clothing","location":"(santa rosa)","date":"2014-12-08 08:45","type":"thing","href":"http://sfbay.craigslist.org/nby/zip/4795835317.html"},{"name":"Free Entertainment Center","location":"(brentwood / oakley)","date":"2014-12-08 08:42","type":"thing","href":"http://sfbay.craigslist.org/eby/zip/4789043522.html"},{"name":"Free \"BROKEN\" Wood Pallets (FIREWOOD)","location":"(santa rosa)","date":"2014-12-08 08:42","type":"thing","href":"http://sfbay.craigslist.org/nby/zip/4765535433.html"},{"name":"Free reclinable brown Chair","location":"(brentwood / oakley)","date":"2014-12-08 08:42","type":"thing","href":"http://sfbay.craigslist.org/eby/zip/4789037412.html"},{"name":"Free working Sony Wega Trinitron 36 in flatscreen TV HEAVY you haul","location":"(concord / pleasant hill / martinez)","date":"2014-12-08 08:35","type":"thing","href":"http://sfbay.craigslist.org/eby/zip/4795859758.html"},{"name":"Free Rubble / Dirt","location":"(ingleside / SFSU / CCSF)","date":"2014-12-08 08:34","type":"thing","href":"http://sfbay.craigslist.org/sfc/zip/4795858944.html"},{"name":"Free boxes, packing paper, scrap cardboard","location":"(Oakland)","date":"2014-12-08 08:34","type":"thing","href":"http://sfbay.craigslist.org/eby/zip/4795857203.html"},{"name":"Free moving boxes","location":"(santa rosa)","date":"2014-12-08 08:32","type":"thing","href":"http://sfbay.craigslist.org/nby/zip/4795854447.html"},{"name":"Free 8 foot artificial green Christmas tree","location":"(healdsburg / windsor)","date":"2014-12-08 08:31","type":"thing","href":"http://sfbay.craigslist.org/nby/zip/4795852922.html"},{"name":"This is what is left of the grad sale","location":"(santa clara)","date":"2014-12-08 08:31","type":"thing","href":"http://sfbay.craigslist.org/sby/zip/4795851684.html"},{"name":"Free ski boots, jumper cables","location":"(inner sunset / UCSF)","date":"2014-12-08 08:28","type":"thing","href":"http://sfbay.craigslist.org/sfc/zip/4795846750.html"},{"name":"Free leather sofa and chair / Ottoman","location":"(santa clara)","date":"2014-12-08 08:23","type":"thing","href":"http://sfbay.craigslist.org/sby/zip/4795836552.html"},{"name":"FREE COFFEE TABLE ROUND GLASS","location":"(milpitas)","date":"2014-12-08 08:21","type":"thing","href":"http://sfbay.craigslist.org/sby/zip/4795833532.html"}
  ];

  $scope.addressCoords = {};
  $scope.addressString = {};
  $scope.filteredItems.forEach(function(item, index){
     $timeout(function(){$scope.freeAry.push(item)}, 100*index);
  });

  var distanceService = new google.maps.DistanceMatrixService();

  // add distance and time after arr has been populated
  $scope.addDistanceTime = function (arr) {
    // loop through places or events array
    arr.forEach(function (item) {
      // apply calculateDistance to each item
      $scope.calculateDistance(item.location);
    });

    $scope.filteredItems = arr;
  }

  // finds distance between destination position and current location
  // calculatDistance({lat: 46.5, lng: -122.5});
  $scope.calculateDistance = function (positionObject) {
    // take out google maps, use data from incoming object
    var destination = new google.maps.LatLng(positionObject.lat, positionObject.lng);

    // async function
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

      $scope.$apply(); // not sure if this is needed
    });
  };


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