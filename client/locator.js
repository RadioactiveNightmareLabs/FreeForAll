angular.module('seekNature.locator',[])
.factory('Locator', function (){

  var getLocation = function (successHandler, failureHandler){
    navigator.geolocation.getCurrentPosition(successHandler, failureHandler);
  }

  return {
    getLocation: getLocation
  }

});
