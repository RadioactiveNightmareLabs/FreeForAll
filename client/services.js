angular.module('freeForAll.services', [])

.factory('getData', function ($http) {

  var data = {};

  var getLinks = function(){
    return $http({
      method: 'GET',
      url: '/getData'
    })
    .then(function (res) {
      data.results = res.data;
    });
  };

  return {
    data: data,
    getLinks: getLinks
  };
})