Ext.define('App.lib.ajax.SQL',{
    singleton           : true,
    alternateClassName  : ['AsyncSQL'],
    
    testConnection: function(id){
        var promise =
            $.ajax({
                type        : 'GET',
                url         : 'sql/connection/{}/test'.format(id),
                dataType    : 'json',
                contentType : 'application/json'
            });
        return promise;
    },

    describeQuery: function(query){
        var promise =
            $.ajax({
                type        : 'POST',
                url         : 'sql/query/describe',
                data        : JSON.stringify({query:query}),
                dataType    : 'json',
                contentType : 'application/json'
            });
        return promise;
    },

    executeSelect: function(query){
        var promise =
            $.ajax({
                type        : 'POST',
                url         : 'sql/query/select',
                data        : JSON.stringify({query:query}),
                dataType    : 'json',
                contentType : 'application/json'
            });
        return promise;
    }
    
});