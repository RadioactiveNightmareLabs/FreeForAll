function initialize() {

  // get current location on initialize

  // check if geo location is present
  
  // get Coordinates
  var getCurrentLocation = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var coordinates = {position.coords.latitude, position.coords.longitude};
        return coordinates;
      });
    } else {
      throw new Error;
    }
  };

  var currentCoordinates = getCurrentLocation();

  // create new googleMaps request object
  var googleMapsRequest = function (radius, type) {
    var currentCoords = new google.maps.LatLng(currentCoordinates);

    var googleMapsRequestObj = {
      location: currentCoords,
      radius: radius,
      type: type
    }

    return googleMapsRequestObj;
  };

  googleMapsRequest(1000, 'park');  // example

  var map = new google.maps.Map(document.getElementById('results'));
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function(data) {
    console.log(data)
  });
}

