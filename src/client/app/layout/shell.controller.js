(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger'];
  /* @ngInject */
  function ShellController($rootScope, $timeout, config, logger) {
    var vm = this;
    var events = config.events;

    vm.busyMessage = 'Please wait ...';
    vm.isBusy = true;
    $rootScope.showSplash = true;
    vm.navline = {
      title: config.appTitle,
      text: 'Created by John Papa',
      link: 'http://twitter.com/john_papa'
    };
    vm.spinnerOptions = {
      radius: 40,
      lines: 7,
      length: 0,
      width: 30,
      speed: 1.7,
      corners: 1.0,
      trail: 100,
      color: '#F58A00'
    };

    activate();

    function activate() {
      logger.success(config.appTitle + ' loaded!', null);
      hideSplash();
    }

    function hideSplash() {
      //Force a 1 second delay so we can see the splash.
      $timeout(function () {
        $rootScope.showSplash = false;
      }, 1000);
    }

    function toggleSpinner(on) { vm.isBusy = on; }

    $rootScope.$on('$routeChangeStart',
      function (event, next, current) { toggleSpinner(true); }
    );

    $rootScope.$on(events.controllerActivateSuccess,
      function (data) { toggleSpinner(false); }
    );

    $rootScope.$on(events.spinnerToggle,
      function (data) { toggleSpinner(data.show); }
    );
  }
})();
