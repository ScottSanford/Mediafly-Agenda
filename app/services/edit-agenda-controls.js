angular.module('agendaApp')


.factory('EditControlsService',function (InitAgendaService) {

	return {

		// pass $scope into function arguments
		addAgendaItem: function(agendaItem) {
			var newItem = {
		    	name: agendaItem,
				checked: false
			}	
			InitAgendaService.data[0].items.push(newItem);
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
			InitAgendaService.data[0].items.splice(index,1);
		}


	}
});
