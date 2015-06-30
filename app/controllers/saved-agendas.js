angular.module('agendaApp')

	.controller('SavedAgendasCtrl', function($scope, $location, $routeParams, EditControlsService, InitAgendaService, NewAgendaService, DialogService){

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
            if ($routeParams.id === undefined) {
                EditControlsService.saveAndLoadAgenda($scope.newAgenda.title, NewAgendaService.items);
                DialogService.createDialogBox('partials/load-agenda.html', 'ngdialog-theme-plain', 'LoadAgendaCtrl');
            } else {
                for (var i = 0; i < InitAgendaService.data.length; i++) {
                    if ($routeParams.id === InitAgendaService.data[i].id) {
                        EditControlsService.saveAndLoadAgenda(InitAgendaService.data[i].title, InitAgendaService.data[i].items)
                        DialogService.createDialogBox('partials/load-agenda.html', 'ngdialog-theme-plain', 'LoadAgendaCtrl');
                    }
                }
            }
        	console.log(InitAgendaService.data);
        	$scope.closeThisDialog();
        }

        $scope.deleteAgendaDialogBox = function() {
         	DialogService.createDialogBox('partials/double-check-dialogbox.html', 'ngdialog-theme-plain', 'DoubleCheckCtrl');
        }

        $scope.closeDialogBox = function() {
            $scope.closeThisDialog();
        }

	});