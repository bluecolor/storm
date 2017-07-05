Ext.define('App.view.sqleditor.SQLEditorController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.sqleditor',

    requires: [
        'App.view.sqleditor.SQLEditorConnection',
        'App.view.sqleditor.SQLEditorPage'
    ],

    onTestConnection: function(conId){
        if(!conId){
            Message.growl.warn('No Connection Selected!');
            return;
        }

        Message.ext.progress('Testing connection...');

        var promise = AsyncSQL.testConnection(conId);
        var success = function(){
            Message.growl.success('Success');
        };
        var error   = function(){
            Message.growl.success('Failed to Connect!');
        };
        var always  = function(){
            Ext.MessageBox.hide();
        };

        promise.success(success).fail(error).always(always);

    },
    onAddSQLEditorConnection: function(plus){
        var v = this.lookupReference('SQLEditorConnectionContainer'),
            c  = Ext.create( 'App.view.sqleditor.SQLEditorConnection');
        v.insert(v.items.indexOf(plus),c);
        v.setActiveTab(c);
    },

    pageCount: 1,
    onAddSQLEditorPage : function(plus) {
        var cc   = this.lookupReference('SQLEditorConnectionContainer').getActiveTab(),
            pc   = cc.down('[name=pageContainer]'),
            page = Ext.create('App.view.sqleditor.SQLEditorPage');

        page.setTitle("Page {}".format(++this.pageCount));
        pc.insert(pc.items.indexOf(plus),page);
        pc.setActiveTab(page);
    },

    onExecuteQuery: function(page,query){

        var st = SQL.getStatementType(query);

        switch (st){
            case Constants.SQL.Statement.type.DML.SELECT:

        }

    },

    onExecuteSelect: function(page, query){

    }







});