angular.module('agendaApp')

	.controller('DeleteItemCtrl', function($scope, EditControlsService, InitAgendaService){

      	function isItemSelected(element, index, array) {
      		return element.checked;
      	}

      	var deletedList = InitAgendaService.data[0].items.filter(isItemSelected);
      	$scope.agendaList = deletedList;

            $scope.deleteItems = function() {
            	for (var i = InitAgendaService.data[0].items.length - 1; i >= 0; i--) {
            		if (InitAgendaService.data[0].items[i].checked) {
            			EditControlsService.deleteAgendaItems(i,1);
            			$scope.closeThisDialog();
            		}
            	}
            }

            $scope.closeDialogBox = function() {
                  $scope.closeThisDialog();
            }
	});