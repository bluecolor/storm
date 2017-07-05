Ext.define('App.controller.IssueTagController',{
    extend: 'Ext.app.Controller',

    views : [
        'App.view.issues.IssueTag'
    ],

    refs : [
        {
            ref         : 'issueTag',
            xtype       : 'issuetag',
            autoCreate  : true,
            selector    : 'issuetag'
        }
    ],


    init: function() {

        this.listen({
            controller: {
                '*': {
                    'showissuetag'  : this.onShowIssues,
                    'createissuetag': this.onCreateIssueTag,
                    'removeissuetag': this.onRemoveIssueTag
                }
            }
        });
    },

    onShowIssues: function(o){
        this.getIssueTag().display(o);
    },

    onCreateIssueTag: function(tag){
        App.lib.Message.ext.progress("Creating tag...");
        var success = function (r) {
            Message.growl.success('Created tag {}'.format(tag.tag));
            Ext.getStore(Constants.Store.ISSUE_TAG).loadRawData(r,true);
        };
        var error   = function () {
            Message.growl.error('Failed to create tag {}'.format(tag.tag));
        };
        var always  = function(){
            Ext.MessageBox.hide();
        };
        var promise = AsyncIssueTag.create(tag);
        promise.success(success).fail(error).always(always);
    },

    onRemoveIssueTag: function(id){
        var store= Ext.getStore(Constants.Store.ISSUE_TAG),
            tag  = store.getById(id);

        App.lib.Message.ext.progress("Removing tag...");
        var success = function (r) {
            Message.growl.success('Removed tag {}'.format(tag.data.tag));
            store.remove(tag);
        };
        var error   = function () {
            Message.growl.error('Failed to remove tag {}'.format(tag.data.tag));
        };
        var always  = function(){
            Ext.MessageBox.hide();
        };

        var cb = function(b){
            if(b=='ok'){
                var promise = AsyncIssueTag.destroy(id);
                promise.success(success).fail(error).always(always);
            }
        };
        Message.ext.ask(cb);
    }

});
