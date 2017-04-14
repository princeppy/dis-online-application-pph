(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('dataService', dataService);

  dataService.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function dataService($http, $q, exception, logger) {
    var service = {
      getDatas: getDatas,
      getAcademicYears: getAcademicYears,
      getTowns: getTowns,
    };

    return service;

    function getAcademicYears() {
      return $http.get('/api/academicYears')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getAcademicYears')(e);
      }
    }

    function getTowns() {
      return $http.get('/api/towns')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getTowns')(e);
      }
    }

    function getDatas(type) {
      type = (type || '').trim();
      var url = '/api/datas';

      if (type.length !== 0) { url += '/' + type; }
      else { url = '/api/grouped/datas'; }

      return $http.get(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getTowns')(e);
      }
    }
  }
})();
