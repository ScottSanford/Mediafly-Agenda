angular.module('agendaApp')

	.controller('SavedAgendasCtrl', function($scope, $rootScope, $location, $routeParams, EditControlsService, InitAgendaService, NewAgendaService, ngDialog, mfly){

        // apparently this has stopped working and now have to use InitAgendaService.data to $scope...weird
        // mfly.getValue('agendalist').then(function(response){

        //     var savedAgendaList = JSON.parse(response);

        //     $scope.savedAgendas = savedAgendaList;

        // });

        $scope.savedAgendas = InitAgendaService.data;

        $scope.deleteAgendaDialogBox = function(agenda) {
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

                    mfly.putValue('agendalist', JSON.stringify(unDeletedAgendas));

                    // update $scope
                    console.log(unDeletedAgendas);
                    $scope.savedAgendas = unDeletedAgendas;

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
            $scope.closeThisDialog();
        }

	});