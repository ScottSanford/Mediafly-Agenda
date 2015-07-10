angular.module('agendaApp')

	.controller('SavedAgendasCtrl', function($scope, $rootScope, $location, $routeParams, EditControlsService, InitAgendaService, NewAgendaService, ngDialog, mfly){

        mfly.getValue('agendaList').then(function(response){
            $scope.agendaList = JSON.parse(response);
        });

        $scope.deleteAgendaDialogBox = function(agenda) {
            if ($routeParams.id === agenda.id) {
                $scope.title = agenda.title;
            };

            // combine everything into one controller
            $scope.deleteAgendaFromList = function() {
                if ($routeParams.id === agenda.id) {
                    var index = $scope.agendaList.indexOf(agenda);
                    EditControlsService.deleteAgenda(index,1);
                    // $scope.closeThisDialog();
                }
            }
            
         	ngDialog.openConfirm({
                template: 'partials/double-check-dialogbox.html', 
                className: 'ngdialog-theme-plain', 
                scope: $scope
            });
        }


        $scope.closeDialogBox = function() {
            $scope.closeThisDialog();
        }

	});