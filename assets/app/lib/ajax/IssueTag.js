Ext.define('App.lib.ajax.IssueTag',{
    singleton: true,
    alternateClassName: ['AsyncIssueTag'],

    create: function (tag) {
        return $.ajax({
            type        : 'POST',
            url         : 'issueTag',
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(tag)
        });
    },

    destroy: function(id){
        return $.ajax({
            type : 'DELETE',
            url  : 'issueTag/{}'.format(id),
            dataType    : 'json',
            contentType : 'application/json'
        });
    },

    update: function(tag){
        return $.ajax({
            type        : 'PUT',
            url         : 'issueTag/{}'.format(tag.id),
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(tag)
        });
    }

});