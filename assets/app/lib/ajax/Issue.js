Ext.define('App.lib.ajax.Issue',{
    singleton: true,
    alternateClassName: ['AsyncIssue'],

    create: function(issue){
        return $.ajax({
            type       : 'POST',
            url        : 'issue',
            contentType: 'application/json',
            dataType   : 'json',
            data       : JSON.stringify(issue)
        });
    },

    destroy: function(id){
        return $.ajax({
            type       : 'DELETE',
            url        : 'issue/{}'.format(id),
            contentType: 'application/json',
            dataType   : 'json'
        });
    },

    update: function(issue){
        return $.ajax({
            type       : 'DELETE',
            url        : 'issue/{}'.format(issue.id),
            contentType: 'application/json',
            dataType   : 'json',
            data       : JSON.stringify(issue)
        });
    }



});