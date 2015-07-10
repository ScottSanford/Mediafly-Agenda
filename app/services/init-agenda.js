angular.module('agendaApp')


.factory('InitAgendaService',function ($q, mfly) {

	  var self = {};

	  self.get = function() {

		var deferred = $q.defer();

    mfly.getValue('agendalist').then(function (data) {

        self.data = data;
			  deferred.resolve(data);

    }, function(error){

        self.data = [];
        deferred.resolve([]);

    });
    
    return deferred.promise; 
	  }

	  return self;
    
});
