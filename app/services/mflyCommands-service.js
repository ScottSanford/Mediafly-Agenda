angular.module('agendaApp').factory("mfly", function($q) {
    return  {

                getFolder: function(folderID) {
                    var deferred = $q.defer();
                    mflyCommands.getFolder(folderID)
                        .done(function(data){
                            deferred.resolve(data);
                        })
                        return deferred.promise;
                },

                getItem: function(folderID) {
                    var deferred = $q.defer();
                    mflyCommands.getItem(folderID)
                        .done(function(data){
                            deferred.resolve(data);
                        })
                        return deferred.promise;
                },

                openFolder: function(folderID) {
                    console.log("folderID :: " + folderID);
                    window.location = 'mfly://folder/' + folderID;    
                    // mflyCommands.openFolder(folderID);
                }, 

                close: function() {
                    mflyCommands.close();
                }, 

                search: function() {
                    var deferred = $q.defer();
                    mflyCommands.search('@agendaslide')
                        .done(function(data){
                            deferred.resolve(data);
                        })
                        return deferred.promise;
                }, 

                putValue: function(key, value) {
                    mflyCommands.putValue(key, value);
                }, 

                getValue: function(key) {
                   return mflyCommands.getValue(key);
                }

            }
});