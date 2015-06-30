angular.module('agendaApp')

	.controller('DeleteItemCtrl', function($scope, $routeParams, EditControlsService, InitAgendaService, NewAgendaService){

      	function isItemSelected(element, index, array) {
      		return element.checked;
      	}

            // display items to be deleted
             if ($routeParams.id === undefined) {
                $scope.title = NewAgendaService.title;
                
                var initDeletedList = NewAgendaService.items.filter(isItemSelected);
                $scope.agendaList = initDeletedList;
            } else {
                  for (var i = 0; i < InitAgendaService.data.length; i++) {
                        if ($routeParams.id === InitAgendaService.data[i].id) {
                          $scope.title = InitAgendaService.data[i].title;

                          var deletedList = InitAgendaService.data[i].items.filter(isItemSelected);
                          $scope.agendaList = deletedList;
                        }
                  }
            }

            // delete items from array
            $scope.deleteItems = function() {
                  if ($routeParams.id === undefined) {
                        console.log(NewAgendaService);
                        EditControlsService.deleteAgendaItems();
                        $scope.closeThisDialog();
                        console.log("After :: " , NewAgendaService.items);
                  } 
                  // else {
                  //   for (var i = 0; i < InitAgendaService.data.length; i++) {
                  //     if ($routeParams.id === InitAgendaService.data[i].id) {
                  //           EditControlsService.deleteAgendaItems(i,1);
                  //     }
                  //   } 
                  // }
                  // $scope.closeThisDialog();
            }

            $scope.closeDialogBox = function() {
                  $scope.closeThisDialog();
            }
	});