'use strict';

describe('myApp.pdv module', function() {

  beforeEach(module('myApp.pdv'));

  describe('pdv controller', function(){
	var $controller, PdvCtrl;
    var $rootScope, $scope;
	
	beforeEach(inject(function(_$controller_, _$rootScope_) {
	  $controller = _$controller_;
	  $scope = _$rootScope_.$new();
	  PdvCtrl = $controller('PdvCtrl', {
	   $scope: $scope,
	  });
	}));
	
	// Testa se o controller da view foi instanciado corretamente
    it('"PdvCtrl" controller should be defined', inject(function($controller) {
      expect(PdvCtrl).toBeDefined();
    }));

  });
});