var app = angular.module("app" , [
    "ngAnimate", 
    "dndLists", 
    "xeditable", 
    "ui.sortable"
    ])

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});


function SortableCTRL($scope) {
   
    var sortableEle;
    
    $scope.sortableArray = 
        [{'Introductions', 'Objectives', 'Conclusions'}]

    $scope.trashcan = [];
    
    $scope.add = function() {
        // $scope.sortableArray.push('New Agenda Item #'+$scope.sortableArray.length);
        $scope.sortableArray.push($scope.AgendaText);
        $scope.AgendaText = '';
    }
        
    // sortableEle = $('#sortable').sortable({
    //     start: $scope.dragStart,
    //     update: $scope.dragEnd
    // });

    // $scope.sortableArray = {
    //   update: function(e, ui) {
    //     jQuery('#'+ui.item.attr('id')).remove();
    //   }
    // }

    $scope.editItem = function(item) {
        angular.element(document.getElementById("modal")).scope().item = item;
    };

    $scope.class_status = 1;
    
    $scope.toggleSingleClass = function() {

        $scope.class_status = !$scope.class_status;

    };

    $scope.models = {
        selected: null,
        lists: {"A": [], "B": []}
    };

}; // end of SortableCTRL 

app.directive('showonhover', function() {
      return {
         link : function(scope, element, attrs) {
            element.bind('mouseenter', function() {
                element.addClass('dottedline');
            });
            element.bind('mouseleave', function() {
                 element.removeClass('dottedline');
            });
       }
   };
});

$(document).ready(function(){

});
