angular.module('getFreeStuff.services', [])

.factory('getFree', function ($http) {

  var freeStuff = [];

  var getFreeStuff = function ( ) {
    return $http({
      method: 'GET',
      url: 'http://free4allapi.herokuapp.com/things'
    })
    .success(function (data) {
      angular.forEach(data, function (item) {
        freeStuff.push(item);  
      });
      return freeStuff;
    });
  };

  return { freeStuff: freeStuff, getFreeStuff: getFreeStuff };
});

// move google api here