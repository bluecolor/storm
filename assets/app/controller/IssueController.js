Ext.define('App.controller.IssueController',{
    extend: 'Ext.app.Controller',

    views : [
        'App.view.issues.Issues'
    ],

    refs : [
        {
            ref         : 'issues',
            xtype       : 'issues',
            autoCreate  : true,
            selector    : 'issues'
        }
    ],


    init: function() {

        this.listen({
            controller: {
                '*': {
                    'showissues'    : this.onShowIssues,
                    'createissue'   : this.onCreateIssue,
                    'deleteissue'   : this.onDeleteIssue
                }
            }
        });
    },

    onShowIssues: function(o){
        this.getIssues().display(o);
    },

    onCreateIssue: function(issue){
        App.lib.Message.ext.progress('Saving issue ...');
        var success = function () {
            Message.growl.success('Success, saved issue.');
        };
        var error   = function () {
            Message.growl.error('Failed to save issue!');
        };
        var always  = function () {
            Ext.MessageBox.hide();
        };
        var promise = App.lib.ajax.Issue.create(issue);
        promise.success(success).fail(error).always(always);
    },

    onDeleteIssue: function(id){
        App.lib.Message.ext.progress('Deleting issue ...');
        var success = function () {
            Message.growl.success('Success, saved issue.');
        };
        var error   = function () {
            Message.growl.error('Failed to delete issue!');
        };
        var always  = function () {
            Ext.MessageBox.hide();
        };
        var promise = App.lib.ajax.Issue.destroy(id);
        promise.success(success).fail(error).always(always);
    }



});
