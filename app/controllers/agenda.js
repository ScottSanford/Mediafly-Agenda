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
                        console.log("Items in Agenda :: ", launchSavedAgenda[0].items);
                        $scope.agendaList = '';
                        $scope.agendaList = launchSavedAgenda[0].items;  
                    } 
                    InitAgendaService.data = agendaData;            
        }

        initalizeAgenda();


        $scope.openMenu = function() {
            $scope.showActions = true;
        }

        // new agenda
        $rootScope.createNewAgenda = function() {
            // $window.location.href = 'http://localhost:8000/';
            // $window.location.href = 'mfly://';
            // initalizeAgenda();
            $scope.newAgenda = {
                title: NewAgendaService.title
            }

            $scope.agendaList = NewAgendaService.items;

            $routeParams.id = undefined;  
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
            // new agenda items array
            var newAgendaItemArray = NewAgendaService.items;

            // saved agenda items array
            for (var i = 0; i < agendaData.length; i++) {
                if ($routeParams.id === agendaData[i].id) {

                    // use this variable in scope
                    var savedAgendaItemArray = agendaData[i].items;
                    console.log(typeof savedAgendaItemArray);


                }
            }

            // open dialog if an item is checked
            if (areItemsChecked(newAgendaItemArray) || areItemsChecked(savedAgendaItemArray)) {

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
                    if ($routeParams.id === undefined) {
    
                        var wantedItems = [];

                        wantedItems = NewAgendaService.items.filter(function(item){
                            return !item.checked;
                        });

                        $scope.agendaList = wantedItems;
                        NewAgendaService.items = wantedItems;

                        ngDialog.closeAll();
                        
                    } 
                    else {
                        for (var i = 0; i < i < agendaData.length; i++) {

                            if ($routeParams.id === agendaData[i].id) {
                                
                                var savedWantedItems = [];

                                savedWantedItems = savedAgendaItemArray.filter(function(item){
                                    return !item.checked;
                                });

                                $scope.agendaList = savedWantedItems;
                                savedAgendaItemArray = savedWantedItems; 
                                console.log("newly deleted list :: " , savedAgendaItemArray);

                                var autoSaveList = InitAgendaService.data;

                                mfly.getValue('agendalist').then(function(response){
                                        var data = JSON.parse(response);
                                        // console.log('saved agendas ==> ', data);
                                });

                                // save changes after the item has been deleted
                                mfly.putValue('agendalist', JSON.stringify(autoSaveList));

                                ngDialog.closeAll();

                            }

                        }
                    }
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
            if ($routeParams.id === undefined) {

                ngDialog.openConfirm({
                    template: 'partials/save-load-agenda.html', 
                    className: 'ngdialog-theme-plain', 
                    scope: $scope, 
                    controller: function($scope, $rootScope, $location, $routeParams, $q, MflyDataService, EditControlsService, InitAgendaService, NewAgendaService, DialogService, mfly) {
                        
                        $scope.newAgenda = {
                            title: $scope.newAgenda.title
                        }
                    
                        $scope.agendaList = InitAgendaService.data;

                        $scope.saveAgendatoList = function() {

                            // push object into array
                            EditControlsService.saveAndPushToAgendaList($scope.newAgenda.title, NewAgendaService.items);

                            // save for local storage
                            var savedAgendaList = InitAgendaService.data;

                            mfly.putValue('agendalist', JSON.stringify(savedAgendaList));

                            console.log("Saved Agendas ==> " , InitAgendaService.data);
                            $scope.closeThisDialog();

                            $rootScope.showEditButtons = false;

                        }

                        $scope.closeDialogBox = function() {
                            $scope.closeThisDialog();
                        } 
                    }
                });
            } else {
                // DialogService.createDialogBox('partials/replace-saved-agenda.html', 'ngdialog-theme-plain', 'ReplaceSavedCtrl', $scope);
                ngDialog.openConfirm({
                    template: 'partials/replace-saved-agenda.html', 
                    className: 'ngdialog-theme-plain', 
                    scope: $scope, 
                    controller: function($scope, $rootScope, $location, $routeParams, $q, MflyDataService, EditControlsService, InitAgendaService, NewAgendaService, DialogService, mfly) {
                        
                        for (var i = 0; i < InitAgendaService.data.length; i++) {
                            if ($routeParams.id === InitAgendaService.data[i].id) {
                                $scope.title = InitAgendaService.data[i].title;         
                            }
                        }

                        $scope.agendaList = InitAgendaService.data;

                        $scope.replaceSavedAgenda = function() {

                            function findAndReplace(object, title, id, items){
                              for(var prop in object){
                                if(object[prop] == $routeParams.id){ 
                                  object["title"] = title;
                                  object["id"] = id;
                                  object["items"] = items;
                                  break;
                                }
                              }
                            }

                            findAndReplace(InitAgendaService.data, $scope.newAgenda.title, $routeParams.id, $scope.agendaList);

                            // save for local storage
                            var savedAgendaList = InitAgendaService.data;

                            mfly.putValue('agendalist', JSON.stringify(savedAgendaList));

                            console.log("Saved Agendas ==> " , InitAgendaService.data);
                            $scope.closeThisDialog();

                            $rootScope.showEditButtons = false;

                        }

                        $scope.closeDialogBox = function() {
                            $scope.closeThisDialog();
                        }   
                    
                    }
                });
            }
        };

        $scope.sortableAgendaList = {
            handle: '.sortable-arrow', 
        }

	})