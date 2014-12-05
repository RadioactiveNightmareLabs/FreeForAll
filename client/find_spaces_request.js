function initialize() {
  var currentLocation = new google.maps.LatLng(37.7838116, -122.4090075);

  var request = {
    location: currentLocation,
    radius: 500,
    types: ['park']
  };
  var map = new google.maps.Map(document.getElementById('results'));
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function(data){console.log(data)});
}