angular.module('agendaApp')


.factory('InitAgendaService',function ($q, mfly, NewAgendaService) {

	  var self = {};

	  self.get = function() {

		var deferred = $q.defer();

    mfly.getValue('agendalist').then(function (data) {

        self.data = JSON.parse(data);
			  deferred.resolve(JSON.parse(data));

    }, function(error){

        self.data = [];
        deferred.resolve([]);

    });
    
    return deferred.promise; 
	  }

	  return self;
    
});
