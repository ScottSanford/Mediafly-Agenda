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

			mfly.getValue('agendalist').then(function(response){
	            var data = JSON.parse(response);
	            console.log("Saved Agendas :: " , data);

	            // new agenda
                if ($routeParams.id === undefined) {
					NewAgendaService.items.push(items);
					console.log("init" , NewAgendaService.items);
			    } 

			    // saved agenda
			    for (var i = 0; i < data.length; i++) {
					if ($routeParams.id === data[i].id) {
		                InitAgendaService.data[i].items.push(items);    
		                console.log("after adding item :: " , data);       
		            }		    	
			    }
        });
		},

		// pass $scope into function arguments
		saveAndPushToAgendaList: function(agendaTitle, items) {
			var newAgendaList = {
				title: agendaTitle, 
				id: '_' + Math.random().toString(36).substr(2, 9), 
				dateCreated: Date.now(),
				items: [{items}]
			}

			InitAgendaService.data.push(newAgendaList);
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
