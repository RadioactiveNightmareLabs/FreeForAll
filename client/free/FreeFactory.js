(function() {

  angular
    .module('app.free')
    .factory('FreeFactory', FreeFactory);

  function FreeFactory($http, $q,$timeout){

    var things = [];
    var places = [];
    var events = [];

    var services = {
      getFree: getFree,
      freeApi: freeApi
    }

    return services;

    function getFree (type) {
      console.log(type);
    }

    function freeApi (type) {
      $http.get('http://free4allapi.herokuapp.com/' + type)
        .success(function(data, status, headers, config) {
          // clear array
          console.log(type + 'data received');
          type = [];
          type.push(data);
          getFree(type);
        })
        .error(function(data, status, headers, config) {
          console.log(status);
        });
    }
    
  }
})();



