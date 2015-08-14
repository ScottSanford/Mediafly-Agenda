angular.module('agendaApp')

	.controller('SavedAgendasCtrl', function($scope, $rootScope, $location, $routeParams, EditControlsService, InitAgendaService, NewAgendaService, ngDialog, mfly){

        $scope.savedAgendas = InitAgendaService.data;

        $scope.launchSavedAgenda = function(agenda) {
            $location.url(agenda.id);
            ngDialog.closeAll();

            // mflyCommands.getValue
            if ($routeParams.id === agenda.id) {
                
            }

            console.log(InitAgendaService.data);

            // mflyCommands.getValue()
        }

        $scope.deleteAgendaDialogBox = function(agenda) {

            // works better in controller than setting url in the view 
            $location.url(agenda.id);


            if ($routeParams.id === agenda.id) {
                $scope.title = agenda.title;
            };

            // combine everything into one controller
            $scope.deleteAgendaFromList = function() {

                if ($routeParams.id === agenda.id) {

                    var index = $scope.savedAgendas.indexOf(agenda);

                    var unDeletedAgendas = [];

                    unDeletedAgendas = InitAgendaService.data.filter(function(item){

                            if ($routeParams.id !== item.id) {
                                return item;
                            }    

                    });

                    $scope.savedAgendas = unDeletedAgendas;

                        console.log(unDeletedAgendas);

                    mfly.putValue('agendalist', JSON.stringify(unDeletedAgendas));

                    $location.url('/');

                    ngDialog.closeAll();
                }
            }
            
         	ngDialog.openConfirm({
                template: 'partials/double-check-dialogbox.html', 
                className: 'ngdialog-theme-plain', 
                scope: $scope,
                controller: function($scope) {
                    $scope.title = agenda.title;
                }
            });
        }


        $scope.closeDialogBox = function() {
            ngDialog.closeAll();
        }

	});