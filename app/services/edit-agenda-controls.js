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
			// if user wants to add new item to New Agenda
		
			// if user wants to add item to previously saved agenda

			mfly.getValue('agendaList').then(function(response){
	            var data = JSON.parse(response);
	            console.log(data);

	            for (var i = 0; i < data.length; i++) {
	                if ($routeParams.id === undefined) {
						NewAgendaService.items.push(items);
						console.log("init" , InitAgendaService.data);
				    } 
					else if ($routeParams.id === data[i].id) {
	                    InitAgendaService.data.items[i].push(items);           
	                }
	            }
        });
		},

		// pass $scope into function arguments
		saveAndPushToAgendaList: function(agendaTitle, itemName) {
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

		deleteAgenda: function(index, howmany) {
			if ($routeParams.id === InitAgendaService.data[index].id) {
				$location.url('/');
			}
			InitAgendaService.data.splice(index, howmany);
		},

		deleteAgendaItems: function(index, howmany) {

			NewAgendaService.items.splice(index, howmany)
			// if ($routeParams.id === undefined) {
			// 	for (var i = 0; i < NewAgendaService.items.length; i++) {
			// 		if (NewAgendaService.items[i].checked) {
			// 			NewAgendaService.items.splice(i, 1);
			// 			console.log(NewAgendaService.items);
			// 		}
			// 	}
			// } 
			// else {
			// 	for (var i = 0; i < InitAgendaService.data.length; i++) {
			// 		if ($routeParams.id === InitAgendaService.data[i].id) {
			// 			InitAgendaService.data[i].items.splice(i,1);
			// 		}	
	  //           }				
			// }
		}


	}
});
