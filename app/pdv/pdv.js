'use strict';

angular.module('myApp.pdv', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pdv', {
    templateUrl: 'pdv/pdv.html',
    controller: 'PdvCtrl'
  });
}])

.controller('PdvCtrl', [ '$scope', function($scope) {
	// Array com os itens adicionados no PDV
	$scope.itensPdv = [];
	
	// Le os produtos salvos no BD local
	$scope.produtos = JSON.parse(localStorage.getItem("QikServe.produtos"));
	

	// Função ara adicionar um novo item na venda
	$scope.incluirProduto = function() {
		var nr = $scope.itensPdv.length+1;
		
		$scope.itensPdv.push(
			{
				nr:nr, 
				descricao: $scope.pdv.listproduto.descricao, 
				qtd: $scope.pdv.qtd, 
				precoUnit: $scope.pdv.listproduto.preco,
				preco: $scope.pdv.qtd * $scope.pdv.listproduto.preco,
				desconto:0,
				produto_id: $scope.pdv.listproduto.id,
				promocao: $scope.pdv.listproduto.promocao
			}
		);	
		
		$scope.calculaTotais();
		
		$scope.pdv.listproduto.descricao = '';
		$scope.pdv.qtd = '';
	
	}
	
	// Função para calcular os totais da venda
	$scope.calculaTotais = function() {
		$scope.pdv.total = 0;
		$scope.pdv.descontos = 0;
		$scope.pdv.totalAPagar = 0;
		// Calcula a soma total bruta
		for(var i in $scope.itensPdv) {
			$scope.pdv.total += $scope.itensPdv[i].preco;
		}
		
		
		// Verifica quais promoções estão envolvidas nesta venda
		$scope.pdv.promocoes = [];
		for(var i in $scope.itensPdv) {
			var promocao = $scope.itensPdv[i].promocao;
			if($scope.pdv.promocoes[promocao.id])
				continue;
			$scope.pdv.promocoes[promocao.id] = promocao; 
		}
		
		// Analisa cada promoção envolvida
		for(var p in $scope.pdv.promocoes) {
			var qtdMin_atual = 0;
			// Verica se o item participa da promoção atual (sendo analisada)
			// e se a quantidade mínima de cada ítem é atingida
			// para que se aplique o desconto da promoção
			for(var i in $scope.itensPdv) {
				$scope.itensPdv[i].desconto = 0;
				// Verifica se o item participa da promoção atual (sendo analisada)
				// caso contrário pula para o próximo item
				if( $scope.itensPdv[i].promocao.id != $scope.pdv.promocoes[p].id )
					continue;
				// Verifica se o critério da qtd mínima é atingido no pedido
				// e cada vez que for atingido, aplica o desconto no item e recomeça a contagem
				for(var q =0; q <$scope.itensPdv[i].qtd; q++) {
					qtdMin_atual += $scope.itensPdv[i].qtd;
					if(qtdMin_atual >= $scope.pdv.promocoes[p].qtdMin){
						var pu = $scope.itensPdv[i].precoUnit; // Preço unitário
						var pd = $scope.pdv.promocoes[p].porcentagem_desconto / 100; // Porcentagem de desconto
						// Aplica o desconto no item
						$scope.itensPdv[i].desconto += parseFloat(pu * pd);
						// Soma no total de descontos aplicados
						$scope.pdv.descontos += parseFloat(pu * pd);
						// reseta a qtdMin para que continue a contagem e aplicacao de desconto 
						// nos demais itens
						qtdMin_atual -= $scope.pdv.promocoes[p].qtdMin;	
						// Seta a promoção atual como ativa
						$scope.pdv.promocoes[p].ativa = true;
					}
				}
			}
		}
		// Total a pagar
		$scope.pdv.totalAPagar = $scope.pdv.total - $scope.pdv.descontos;
		
	}
}]);