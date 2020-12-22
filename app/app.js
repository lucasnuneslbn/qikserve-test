'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'myApp.pdv',
  'myApp.cadastroProdutos',
  'myApp.cadastroPromocoes',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
  
  // Verifica se existe já o BD local (salvo no navegador)
  if(!localStorage.getItem("QikServe.produtos")){
	  var promocaoAtiva = {id:"1", descricao:"Promoção de natal", qtdMin:1, porcentagem_desconto:10.00};
	 
	  var produtosIniciais = [
	  	{id:"1",descricao:"Produto a",preco:20, promocao:promocaoAtiva},
		{id:"2",descricao:"Produto b",preco:99, promocao:promocaoAtiva},
		{id:"3",descricao:"Produto c",preco:10, promocao:{}},
		{id:"4",descricao:"Produto d",preco:2.50, promocao:promocaoAtiva},
		{id:"5",descricao:"Produto e",preco:150, promocao:{}},
		{id:"6",descricao:"Produto f",preco:50, promocao:promocaoAtiva},
		{id:"7",descricao:"Produto g",preco:78.8, promocao:{}},
		{id:"8",descricao:"Produto h",preco:19.90, promocao:promocaoAtiva},
		{id:"9",descricao:"Produto i",preco:15, promocao:promocaoAtiva}
	   ]
	   
	   // Registra no BD local
	   localStorage.setItem("QikServe.promocoes",JSON.stringify([promocaoAtiva]));
	   localStorage.setItem("QikServe.produtos",JSON.stringify(produtosIniciais));
  }
}]);
