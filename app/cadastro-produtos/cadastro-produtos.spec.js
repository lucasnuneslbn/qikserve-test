'use strict';

describe('myApp.cadastroProdutos module', function() {

  beforeEach(module('myApp.cadastroProdutos'));

  describe('cadastroProdutos controller', function(){
	var $controller, cadProdCtrl;
    var $rootScope, $scope;
	
	beforeEach(inject(function(_$controller_, _$rootScope_) {
	  $controller = _$controller_;
	  $scope = _$rootScope_.$new();
	  cadProdCtrl = $controller('cadProdCtrl', {
	   $scope: $scope,
	  });
	}));
	
	// Testa se o controller da view foi instanciado corretamente
    it('"cadProdCtrl" controller should be defined', inject(function($controller) {
      expect(cadProdCtrl).toBeDefined();
    }));

  });
});