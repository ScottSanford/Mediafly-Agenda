angular.module('agendaApp')


.factory('EditControlsService',function (InitAgendaService, $routeParams) {

	return {

		// pass $scope into function arguments
		addAgendaItem: function(agendaItem) {
			var newItem = {
		    	name: agendaItem,
				checked: false
			}	
			if ($routeParams.id === undefined) {
				InitAgendaService.data[0].items.push(newItem);
			} else {
				for (var i = 0; i < InitAgendaService.data.length; i++) {
	                if ($routeParams.id === InitAgendaService.data[i].id) {
						InitAgendaService.data[i].items.push(newItem);
	                }
	            }
			}
		},

		// pass $scope into function arguments
		saveAndLoadAgenda: function(agendaTitle, itemName) {
			var newAgendaList = {
				title: agendaTitle, 
				id: '_' + Math.random().toString(36).substr(2, 9), 
				dateCreated: Date.now(),
				items: [{itemName}]
			}
			InitAgendaService.data.push(newAgendaList);
		},

		saveEditedAgendaText: function() {

		}, 

		deleteAgenda: function(index) {
			InitAgendaService.data.splice(index,1);
		},

		deleteAgendaItems: function(index) {
			for (var i = 0; i < InitAgendaService.data.length; i++) {
				InitAgendaService.data[i].items.splice(index,1);
            }
		}


	}
});
