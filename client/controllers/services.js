angular.module('getFreeStuff.services', [])

.factory('getFreeStuff', function ($scope, $http) {

  // var freeStuff = [];

  // var getFreeStuff = function ( ) {
  //   return $http({
  //     method: 'GET',
  //     url: 'http://free4allapi.herokuapp.com/places'
  //   })
  //   .success(function (data) {
  //     console.log(data);
  //     angular.forEach(data, function (item) {
  //       freeStuff.push(item);  
  //     });
  //   });

  //   return freeStuff;
  // };

  // return { freeStuff: freeStuff, getFreeStuff: getFreeStuff, hey: hey };
});

// move google api here