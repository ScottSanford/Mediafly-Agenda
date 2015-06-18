angular.module('agendaApp')

	.controller('DeleteItemCtrl', function($scope, EditControlsService, InitAgendaService){

      	function isItemSelected(element, index, array) {
      		return element.checked;
      	}

      	var deletedList = InitAgendaService.data.filter(isItemSelected);
      	$scope.agendaList = deletedList;

            $scope.deleteItems = function() {
            	console.log(InitAgendaService.data);
            	for (var i = InitAgendaService.data.length - 1; i >= 0; i--) {
            		if (InitAgendaService.data[i].checked) {
            			EditControlsService.deleteAgendaItems();
            			$scope.closeThisDialog();
            		}
            	}
            }

            $scope.closeDialogBox = function() {
                  $scope.closeThisDialog();
            }
	});