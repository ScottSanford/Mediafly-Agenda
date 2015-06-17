angular.module('agendaApp')


.factory('DialogService',function (ngDialog) {

	return {

		// pass $scope into function arguments
		createDialogBox: function(tmpl, ctrl) {
			ngDialog.open({
                template: tmpl,
                className: 'ngdialog-theme-plain', 
                controller: ctrl
            });
		}

}
});
