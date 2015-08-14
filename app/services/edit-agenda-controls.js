angular.module('agendaApp')


.factory('EditControlsService',function (InitAgendaService, NewAgendaService, $routeParams, $location, mfly) {

	function isItemSelected(element, index, array) {
      	return element.checked;
	}

	return {

		// pass $scope into function arguments
		addAgendaItem: function(agendaItem) {
			var items = {
		    	name: agendaItem,
				checked: false
			}	


	        // new agenda
            if ($routeParams.id === undefined) {
            	
				NewAgendaService.items.push(items);
				
		    } 

		    else {
				for (var i = 0; i < InitAgendaService.data.length; i++) {
					if ($routeParams.id === InitAgendaService.data[i].id) {

						var itemsArray = InitAgendaService.data[i].items;

						itemsArray.push(items);

						var savedAgendaList = InitAgendaService.data;
            			mfly.putValue('agendalist', JSON.stringify(savedAgendaList));
					}
				}
		    }

		},

		// pass $scope into function arguments
		saveAndPushToAgendaList: function(agendaTitle, agendaItems) {
			var newAgendaList = {
				title: agendaTitle, 
				id: '_' + Math.random().toString(36).substr(2, 9), 
				dateCreated: Date.now(),
				items: agendaItems
			}

			InitAgendaService.data.push(newAgendaList);
		},

		replaceSavedAgenda: function(agendaTitle, agendaId, agendaItems) {
			var savedAgendaList = {
				title: agendaTitle, 
				id: agendaId, 
				dateCreated: Date.now(),
				items: agendaItems
			}

			// InitAgendaService.data.push(savedAgendaList);
		},

		saveEditedAgendaText: function() {

		}, 

		deleteAgenda: function(list) {

			var unDeletedAgendas = [];

	        unDeletedAgendas = InitAgendaService.data.filter(function(item){
		        	if ($routeParams.id !== item.id) {
		            	return item;
		        	}		
	        });

	        // update $scope
	        console.log(unDeletedAgendas);
            list = unDeletedAgendas;

            // update local storage
            // mfly.putValue('agendalist', JSON.stringify(unDeletedAgendas));
			
		}

	}
});
