'use strict';

describe('myApp.cadastroPromocoes module', function() {

  beforeEach(module('myApp.cadastroPromocoes'));

  describe('cadastroPromocoes controller', function(){
	var $controller, cadPrpCtrl;
    var $rootScope, $scope;
	
	beforeEach(inject(function(_$controller_, _$rootScope_) {
	  $controller = _$controller_;
	  $scope = _$rootScope_.$new();
	  cadPrpCtrl = $controller('cadPrpCtrl', {
	   $scope: $scope,
	  });
	}));
	
	// Testa se o controller da view foi instanciado corretamente
    it('"cadPrpCtrl" controller should be defined', inject(function($controller) {
      expect(cadPrpCtrl).toBeDefined();
    }));

  });
});