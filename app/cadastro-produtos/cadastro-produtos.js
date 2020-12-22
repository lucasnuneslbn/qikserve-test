'use strict';

angular.module('myApp.cadastroProdutos', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cadastro-produtos', {
    templateUrl: 'cadastro-produtos/cadastro-produtos.html',
    controller: 'cadProdCtrl'
  });
}])

.controller('cadProdCtrl', [ '$scope', '$window', function($scope, $window) {
	// Lê e tráz para o scopo os produtos salvos no BD local
	$scope.produtos = JSON.parse(localStorage.getItem("QikServe.produtos"));
	
	// Lê e tráz para o scopo os produtos salvos no BD local
	if(localStorage.getItem("QikServe.promocoes")) {
		$scope.promocoes = JSON.parse(localStorage.getItem("QikServe.promocoes"));
	}
	
	// Função ara adicionar um novo produto no BD local
	$scope.incluir = function() {
		$scope.produtos.push(
			{
				id: $scope.produtos.length,
				descricao: $scope.novocadastro.descricao, 
				preco: $scope.novocadastro.preco, 
				promocao: $scope.novocadastro.listpromocao
			}
		);	
		$scope.novocadastro.descricao = '';
		$scope.novocadastro.preco = '';
		$scope.novocadastro.listpromocao = '';
		$scope.salvarBD();
	}
	
	// Função para excluir um produto do BD local
	$scope.remove = function(index) {
		var descricao = $scope.produtos[index].descricao;
		if ($window.confirm("Quer mesmo remover o produto: " + descricao)) {
			 $scope.produtos.splice(index, 1);
		}
		$scope.salvarBD();
	}
	
	// Salva no BD local qualquer alteração na model
	$scope.salvarBD = function(data) {
		localStorage.setItem("QikServe.produtos", JSON.stringify($scope.produtos));	
	}
}]);