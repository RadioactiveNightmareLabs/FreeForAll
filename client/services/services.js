angular.module('seekFreeStuff.services', [])

.factory('getData', function ($http) {

  var freeStuff = {};

  var getFreeData = function(){
    return $http({
      method: 'GET',
      url: 'http://free4allapi.herokuapp.com/things'
    })
    .then(function (res) {
      console.log('haz data: ', res);
      freeStuff.results = res.data;
    });
  };

  return {
    data: freeStuff,
    getFreeData: getFreeData
  };
})