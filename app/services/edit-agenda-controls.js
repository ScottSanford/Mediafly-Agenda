angular.module('agendaApp')


.factory('EditControlsService',function (InitAgendaService) {

	return {

		// pass $scope into function arguments
		addAgendaItem: function(agendaItem, agendaTitle) {
			var newAgendaItem = {
		    	name: agendaItem,
				title: agendaTitle,
				checked: false
			}	
			InitAgendaService.data.push(newAgendaItem);
		},

		saveAndLoadAgenda: function() {
			
		},

		saveEditedAgendaText: function() {

		}, 

		deleteAgendaItems: function(index) {
			InitAgendaService.data.splice(index,1);
		}

	}
});
