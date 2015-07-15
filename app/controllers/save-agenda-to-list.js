angular.module('agendaApp')

	.controller('SaveAgendaCtrl', function($scope, $location, $routeParams, $q, MflyDataService, EditControlsService, InitAgendaService, NewAgendaService, DialogService, mfly){

        if ($routeParams.id === undefined) {
            $scope.newAgenda = {
                title: $scope.newAgenda.title
            }
        } else {
            for (var i = 0; i < InitAgendaService.data.length; i++) {
                if ($routeParams.id === InitAgendaService.data[i].id) {
                    $scope.title = InitAgendaService.data[i].title;         
                }
            }
        }
        $scope.agendaList = InitAgendaService.data;

        $scope.saveAgendatoList = function() {

            // push object into array
            EditControlsService.saveAndPushToAgendaList($scope.newAgenda.title, NewAgendaService.items);

            // save for local storage
            var savedAgendaList = InitAgendaService.data;

            mfly.putValue('agendalist', JSON.stringify(savedAgendaList));

            // open Load Agenda Modal
            DialogService.createDialogBox('partials/load-agenda.html', 'ngdialog-theme-plain', 'LoadAgendaCtrl');

        	console.log("Saved Agendas ==> " , InitAgendaService.data);
        	$scope.closeThisDialog();
        }

        $scope.closeDialogBox = function() {
            $scope.closeThisDialog();
        }

	});