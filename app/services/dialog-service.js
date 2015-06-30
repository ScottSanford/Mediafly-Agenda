angular.module('agendaApp')


.factory('DialogService',function (ngDialog, $rootScope, $routeParams, InitAgendaService, NewAgendaService) {

	return {

		// pass $scope into function arguments
		createDialogBox: function(tmpl, clName, ctrl, s) {
			ngDialog.openConfirm({
                template: tmpl,
                className: clName, 
                controller: ctrl, 
                scope: s
            });
		}

}
});
