'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'myApp.pdv'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
  
  // Verifica se existe já o BD local (salvo no navegador)
  if(!localStorage.getItem("QikServe.produtos")){
	  var promocoesAtivas = [
	  	{id:"1", titulo:"Promoção de natal", qtdMin:1, porcentagem_desconto:10.00}	
	  ]
	  var produtosIniciais = [
	  	{id:"1",descricao:"Produto a",preco:20, promocoes:promocoesAtivas},
		{id:"1",descricao:"Produto b",preco:99, promocoes:promocoesAtivas},
		{id:"1",descricao:"Produto c",preco:10, promocoes:{}},
		{id:"1",descricao:"Produto d",preco:2.50, promocoes:promocoesAtivas},
		{id:"1",descricao:"Produto e",preco:150, promocoes:{}},
		{id:"1",descricao:"Produto f",preco:50, promocoes:promocoesAtivas},
		{id:"1",descricao:"Produto g",preco:78.8, promocoes:{}},
		{id:"1",descricao:"Produto h",preco:19.90, promocoes:promocoesAtivas},
		{id:"1",descricao:"Produto i",preco:15, promocoes:promocoesAtivas}
	   ]
	   localStorage.setItem("QikServe.produtos",JSON.stringify(produtosIniciais));
  }
}]);
