angular.module('agendaApp')

	.controller('agendaListCtrl', function($scope, $filter, $rootScope, $routeParams, $location, $window, $route, mfly, MflyDataService, EditControlsService, InitAgendaService, NewAgendaService, DialogService, ngDialog){

        function initalizeAgenda() {
            mfly.getValue('agendaList').then(function(response){
                var data = JSON.parse(response);
                console.log(data);

                for (var i = 0; i < data.length; i++) {

                    if ($routeParams.id === undefined) {

                            $scope.newAgenda = {
                                title: NewAgendaService.title
                            }

                            $scope.agendaList = NewAgendaService.items;


                            $routeParams.id = undefined;

                    } 

                    else if ($routeParams.id === data[i].id) {
                        
                        $scope.newAgenda = {
                            title: data[i].title
                        }
                        
                        $scope.agendaList = data[i].items[i].itemName;              
                    }
                }
            });
        }

        initalizeAgenda();


        $scope.openMenu = function() {
            $scope.showActions = true;
        }

        // new agenda
        $rootScope.createNewAgenda = function() {
            initalizeAgenda();
            $window.location.href = 'http://127.0.0.1:8000/';
            // $window.location.href = 'mfly://';
        }

        // load button
        $rootScope.savedAgendasDialogBox = function() {
            DialogService.createDialogBox('partials/saved-agendas.html', 'ngdialog-theme-plain custom-width', 'SavedAgendasCtrl');
        }

        $scope.loadAgendaFromTemplate = function() {
            MflyDataService.load('agendaList', false).then(function(result){
                console.log(result.data);
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
            console.log(item);

            var newAgendaItemArray = NewAgendaService.items;

            $scope.delagendaList = item;

            if (areItemsChecked(newAgendaItemArray)) {

                ngDialog.openConfirm({
                    template: 'partials/delete-items.html', 
                    className: 'ngdialog-theme-plain', 
                    scope: $scope, 
                    controller: function($scope) {
                        $scope.closeDialogBox = function() {
                            console.log('clicked');
                            $scope.closeThisDialog();
                        }
                    }
                });

                $scope.deleteItems = function() {
                    $scope.agendaList = $filter('filter')($scope.agendaList, {checked: false});
                    console.log($scope.agendaList);
                    ngDialog.closeAll();
                }


            }      


        };

        $scope.closeDialogBox = function() {
            console.log('clicked');
            $scope.closeThisDialog();
        }

        function areItemsChecked(array) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].checked) {
                    return true;
                }
            }
            return false;
        }

        $scope.saveDialogBox = function() { 
                DialogService.createDialogBox('partials/save-load-agenda.html', 'ngdialog-theme-plain', 'SaveAgendaCtrl', $scope);
        };


	})