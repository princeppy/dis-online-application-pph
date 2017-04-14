/* jshint -W117, -W030 */
describe('application routes', function() {
  describe('state', function() {
    var view = 'app/application/academicyear.html';

    beforeEach(function() {
      module('app.application', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    it('should map state admin to url /admin ', function() {
      expect($state.href('application', {})).to.equal('/application');
    });

    it('should map /application route to admin View template', function() {
      expect($state.get('application').templateUrl).to.equal(view);
    });

    it('of admin should work with $state.go', function() {
      $state.go('application');
      $rootScope.$apply();
      expect($state.is('application'));
    });
  });
});
