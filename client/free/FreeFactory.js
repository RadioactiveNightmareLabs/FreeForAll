(function() {

  angular
  .module('app.free')
  .factory('FreeFactory', FreeFactory);

  function FreeFactory($http, $q, $timeout){

    var services = {
      getPlaces: getPlaces
    }

    return services;

    function getPlaces() {
      return $http({
        url: '/places',
        method: 'GET'
      })
      .success(function(data) {
        console.log('places gotten!');
        console.log(data);
      })
      .error(function() {
        console.log('error');
      })
    }
    
    
  }
})();



