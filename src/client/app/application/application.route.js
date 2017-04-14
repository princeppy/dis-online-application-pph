(function() {
  'use strict';

  angular
    .module('app.application')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'academicyear',
        config: {
          url: '/',
          templateUrl: 'app/application/academicyear.html',
          controller: 'AcademicYearController',
          controllerAs: 'vm',
          title: 'AcademicYear',
          settings: {
            nav: 2,
            content: '<i class="fa fa-lock"></i> AcademicYear'
          }
        }
      },{
        state: 'application',
        config: {
          url: '/application/:academicyear?',
          params: { academicyear: {squash: true, value: null} },
          templateUrl: 'app/application/application.html',
          controller: 'ApplicationController',
          controllerAs: 'vm',
          title: 'Application',
          settings: {
            nav: 1,
            content: '<i class="fa fa-dashboard"></i> Application'
          }
        }
      }
    ];
  }
})();
