(function () {
  'use strict';

  angular
    .module('app.application')
    .factory('applicationdataService', applicationdataService);

  applicationdataService.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function applicationdataService($http, $q, exception, logger) {
    var service = {
      getDocument: getDocument,
      getLearningResourcesHealthInformation: getLearningResourcesHealthInformation,
    };

    return service;

    function getDocument() { return $http.get('/src/client/app/application/datas/Documents.json').then(success).catch(fail); }
    //function getTransportation() { return $http.get('/src/client/app/application/datas/Transportation.json').then(success).catch(fail); }
    function getLearningResourcesHealthInformation() { return $http.get('/src/client/app/application/datas/LearningResourcesHealthInformation.json').then(success).catch(fail); }


    function success(response) { return response.data; }
    function fail(e) { return exception.catcher('XHR Failed for getDocument')(e); }
  }
})();
