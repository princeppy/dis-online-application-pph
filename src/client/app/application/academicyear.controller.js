(function() {
  'use strict';

  angular
    .module('app.application')
    .controller('AcademicYearController', AcademicYearController);

  AcademicYearController.$inject = ['$q', '$state', 'dataService', 'logger'];
  /* @ngInject */
  function AcademicYearController($q, $state, dataService, logger) {
    var vm                      = this;
    vm.title                    = 'Academic Year';
    vm.academicSession          = '';
    vm.academicSessions         = [];
    vm.getSelectedAcademicYear  = getSelectedAcademicYear;
    vm.setAcademicYear          = setAcademicYear;
  
    activate();
    function activate() {
      dataService.getAcademicYears().then(function(data) {
        vm.academicSessions = data;
        logger.info('Activated Application (AcademicYear) View');
        return vm.academicSessions;
      });
    }
    
    function getSelectedAcademicYear(ac){
      var acs = vm.academicSessions.filter(function(a) {
        return a.code.trim() === (ac||'').trim();
      });
      return (acs||[{code:''}])[0];
    }
    
    function setAcademicYear(ac){
      console.log('setAcademicYear');
      var acs = (vm.academicSessions.filter(function(a) {
        return a.code.trim() === (ac||'').trim();
      })||[{code:''}])[0];
      if(acs.code.trim().length!==0){
        $state.go('application',{'academicyear':acs.code.trim()});
        console.log(acs.code.trim());
      }
    }

  }
})();
