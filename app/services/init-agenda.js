angular.module('agendaApp')


.factory('InitAgendaService',function ($http , $q) {

	var self = {};
	self.get = function() {
		var deferred = $q.defer();

   //      $http.get('/data/init-data.json').success(function (data) {
   //      	self.data = data;
			// deferred.resolve(data);
   //      });
        $http.get('/data/test-data.json').success(function (data) {
        	self.data = data;
			deferred.resolve(data);
        });
    
        return deferred.promise; 
	}

	return self;
});
