(function() {
  'use strict';

  angular
    .module('app.application')
    .controller('ApplicationController', ApplicationController);

  ApplicationController.$inject = ['$stateParams','$q', 'dataService', 'applicationdataService', 'logger'];
  /* @ngInject */
  function ApplicationController($stateParams, $q, dataService, applicationdataService, logger) {
    var vm              = this;
    vm.title            = 'Application';
    vm.academicYear     = '';
    vm.academicYears    = [];
    vm.towns            = [];
    vm.datas            = {};
    vm.documents        = [];
    vm.LearningResourcesHealthInformation = [];

    activate();
    function activate() {
      console.log("vm.documents=",vm.documents);
      vm.academicYear = ($stateParams.academicyear||'').trim();
      if(vm.academicYear.trim().length===0) {

        logger.error('Unable to Identify academic year, please close the application and start from beinging');
        return;
      }
      
      var promises = [
        getDocument(),
        getLearningResourcesHealthInformation(),
        getDatas(),
        getAcademicYears(),
        getTowns()
      ];
      return $q.all(promises).then(function () {
        logger.info('Activated Application View');
      });      
    }

    function getAcademicYears() {
      return dataService.getAcademicYears().then(function(data) {
        vm.academicSessions = data;
      });
    }

    function getTowns(){
      return dataService.getTowns().then(function (data) {
        vm.towns = data;
        return data;
      });
    }

    function getDatas(){
      return dataService.getDatas().then(function (data) {
        vm.datas = {};
        data.forEach(function(e) {
          vm.datas[e.key]=e.items;
        }, this);
        console.log(vm.datas);
        return data;
      });
    }

    function getDocument(){
      return applicationdataService.getDocument().then(function (data) {
        vm.documents = data;
        return data;
      });
    }

    function getLearningResourcesHealthInformation(){
      return applicationdataService.getLearningResourcesHealthInformation().then(function (data) {
        vm.LearningResourcesHealthInformation = data;
        return data;
      });
    }
    
  }
})();
