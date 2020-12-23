'use strict';

angular.module('myApp.cadastroPromocoes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cadastro-promocoes', {
    templateUrl: 'cadastro-promocoes/cadastro-promocoes.html',
    controller: 'cadPrpCtrl'
  });
}])

.controller('cadPrpCtrl', [ '$scope', '$window', function($scope, $window) {
	// Le os produtos salvos no BD local
	$scope.promocoes = [];
	if(localStorage.getItem("QikServe.promocoes")) {
		$scope.promocoes = JSON.parse(localStorage.getItem("QikServe.promocoes"));
	}
	
	// Função ara adicionar um novo produto no BD local
	$scope.incluir = function() {
		$scope.promocoes.push(
			{
				id: $scope.promocoes.length,
				descricao: $scope.novocadastro.descricao, 
				qtdMin: $scope.novocadastro.qtdMin, 
				porcentagem_desconto: $scope.novocadastro.porcentagem_desconto
			}
		);	
		$scope.novocadastro.descricao = '';
		$scope.novocadastro.qtdMin = '';
		$scope.novocadastro.porcentagem_desconto = '';
		$scope.salvarBD();
	}
	
	// Função para excluir um produto do BD local
	$scope.remove = function(index) {
		var descricao = $scope.promocoes[index].descricao;
		if ($window.confirm("Quer mesmo remover a promoção: " + descricao)) {
			 $scope.promocoes.splice(index, 1);
		}
		$scope.salvarBD();
	}
	
	// Salva no BD local qualquer alteração na model
	$scope.salvarBD = function(data) {
		localStorage.setItem("QikServe.promocoes", JSON.stringify($scope.promocoes));	
		// Atualiza os dados das promoções vigentes em cada produto
		var produtos = JSON.parse(localStorage.getItem("QikServe.produtos"));
		for(var p in  produtos) {
			var encontrouPromocao = false;
			for(var o in $scope.promocoes) {
				if(produtos[p].promocao.id == $scope.promocoes[o].id){
					produtos[p].promocao = $scope.promocoes[o];
					encontrouPromocao = true;	
					break;
				}
			}
			if(!encontrouPromocao) {
				produtos[p].promocao = {};	
			}
		}
		localStorage.setItem("QikServe.produtos", JSON.stringify(produtos));	
	}
}]);