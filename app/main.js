angular.module('agendaApp',[
		'ngRoute', 
		'ngAnimate', 
		'ngTouch', 
		'hmTouchEvents',
		'Mediafly.services', 
		'ngDialog',
		'ng-sortable', 
		'ngMessages'
	])

	.config(function ($routeProvider, $compileProvider) {
			$compileProvider.imgSrcSanitizationWhitelist(/^(mfly:\/\/data\/image|http:\/\/)/);	
			$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|mfly):/);        
	        $routeProvider
	        	.when('/:id', {
	        		templateUrl: "partials/agenda.html",
	        		controller: 'agendaListCtrl',
	        		resolve: {
							agendaData: function(InitAgendaService){
								return InitAgendaService.get();
							}, 
							lastAgenda: function($q, mfly, $route) {
								mfly.putValue('lastAgenda', $route.current.params.id);
							}
						}    		
	        	})
	        	.when('/', {
	        		templateUrl: "partials/agenda.html",
	        		controller: 'agendaListCtrl',
	        		resolve: {
							agendaData: function($location, $q, InitAgendaService, mfly){
								var deferred = $q.defer();
								var initAgendaPromise = InitAgendaService.get();
								var lastAgendaPromise =	mfly.getValue('lastAgenda');

								$q.all([initAgendaPromise, lastAgendaPromise])
									.then(function(results) {

										var lastAgenda = results[1];

										if (lastAgenda) {
											deferred.reject();
											$location.url('/' + lastAgenda);
										}
										else {
											deferred.resolve(results[0]);
										}
									}, function(response){

										mfly.putValue('lastAgenda', '');
										deferred.resolve([]);

									});

								return deferred.promise;
								
							}
						}    		
	        	})
	            .otherwise({
	                redirectTo: '/'
	            });
	})

