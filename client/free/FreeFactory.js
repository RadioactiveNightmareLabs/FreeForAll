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
      console.log('getting places...');

      // $http({
      //   url: '/places',
      //   method: 'GET'
      // })
      // .success(function(data, status, headers, config) {
      //   console.log(status);
      // })
      // .error(function(data, status, headers, config) {
      //   console.log('error');
      // })

      $http.get('/places').success(function(data) {
        console.log(data);
        console.log('recieved data')
      }).error(function () {
        console.log('asdf');
      })
    }
    
    
  }
})();



