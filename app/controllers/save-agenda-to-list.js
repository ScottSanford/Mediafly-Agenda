angular.module('agendaApp')

	.controller('SaveAgendaCtrl', function($scope, $location, $routeParams, $q, MflyDataService, EditControlsService, InitAgendaService, NewAgendaService, DialogService, mfly){

        $scope.newAgenda = {
            title: $scope.newAgenda.title
        }

        $scope.agendaList = InitAgendaService.data;

        $scope.saveAgendatoList = function() {

            // push object into array
            // for (var i = 0; i < NewAgendaService.items.length; i++) {
                EditControlsService.saveAndPushToAgendaList($scope.newAgenda.title, NewAgendaService.items);
            // }

            // save for local storage
            var savedAgendaList = InitAgendaService.data;

            mfly.putValue('agendalist', JSON.stringify(savedAgendaList));

        	console.log("Saved Agendas ==> " , InitAgendaService.data);
        	$scope.closeThisDialog();

        }

        $scope.closeDialogBox = function() {
            $scope.closeThisDialog();
        }

	});