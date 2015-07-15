angular.module('agendaApp')

	.controller('agendaListCtrl', function($scope, $filter, $rootScope, $routeParams, $location, $window, $route, mfly, MflyDataService, EditControlsService, InitAgendaService, NewAgendaService, DialogService, ngDialog, agendaData){

        function initalizeAgenda() {

                    if ($routeParams.id === undefined) {

                            $scope.newAgenda = {
                                title: NewAgendaService.title
                            }

                            $scope.agendaList = NewAgendaService.items;

                            $routeParams.id = undefined;           

                    } 

                    else {
                        var launchSavedAgenda = agendaData.filter(function(item) {
                            return item.id === $routeParams.id;
                        });

                        $scope.newAgenda = {
                            title: launchSavedAgenda[0].title
                        }
                        console.log(launchSavedAgenda);
                        $scope.agendaList = launchSavedAgenda[0].items[0].items;  
                    } 
                    InitAgendaService.data = agendaData;            
        }

        initalizeAgenda();


        $scope.openMenu = function() {
            $scope.showActions = true;
        }

        // new agenda
        $rootScope.createNewAgenda = function() {
            $window.location.href = 'http://localhost:8000/';
            // $window.location.href = 'mfly://';
            initalizeAgenda();
        }

        // load button
        $rootScope.savedAgendasDialogBox = function() {
            DialogService.createDialogBox('partials/saved-agendas.html', 'ngdialog-theme-plain custom-width', 'SavedAgendasCtrl');
        }

        $scope.loadAgendaFromTemplate = function() {
            MflyDataService.load('agendaList', false).then(function(result){
                $scope.agendaList = result.data;
                $scope.saveAgenda();
            });
            MflyDataService.load('agendaTitle', false).then(function(result){
                $scope.agenda.title = result.data;
            })
        }

        // Edit Controls (add, save, edit, delete)

        $scope.addDialogBox = function() {
            DialogService.createDialogBox('partials/add-item.html', 'ngdialog-theme-plain', 'AddAgendaItemCtrl');
        };

        $scope.editDialogBox = function(item){
             DialogService.createDialogBox('partials/edit-text.html', 'ngdialog-theme-plain', 'EditTextCtrl', $scope);
        };

        $scope.deleteDialogBox = function(item) { 
            var newAgendaItemArray = NewAgendaService.items;

            // open dialog if an item is checked
            if (areItemsChecked(newAgendaItemArray)) {

                ngDialog.openConfirm({
                    template: 'partials/delete-items.html', 
                    className: 'ngdialog-theme-plain', 
                    scope: $scope, 
                    controller: function($scope) {
                        $scope.delagendaList = item;
                        $scope.closeDialogBox = function() {
                            $scope.closeThisDialog();
                        }   
                    }
                });

                $scope.deleteItems = function() {   
                    var wantedItems = [];

                    wantedItems = NewAgendaService.items.filter(function(item){
                        return !item.checked;
                    });

                    $scope.agendaList = wantedItems;
                    NewAgendaService.items = wantedItems;

                    ngDialog.closeAll();
                } 
            }  



        };

        function areItemsChecked(array) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].checked) {
                    return true;
                }
            }
            return false;
        }

        $scope.closeDialogBox = function() {
            $scope.closeThisDialog();
        }


        $scope.saveDialogBox = function() { 
                DialogService.createDialogBox('partials/save-load-agenda.html', 'ngdialog-theme-plain', 'SaveAgendaCtrl', $scope);
        };


	})