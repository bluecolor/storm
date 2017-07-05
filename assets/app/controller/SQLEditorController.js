Ext.define('App.controller.SQLEditorController',{
    extend: 'Ext.app.Controller',

    views : [
        'App.view.sqleditor.SQLEditor'
    ],

    refs : [
        {
            ref         : 'SQLEditor',
            xtype       : 'sqleditor',
            autoCreate  : true,
            selector    : 'sqleditor'
        }
    ],


    init: function() {

        this.listen({
            controller: {
                '*': {
                    'displaysqleditor' : this.onDisplaySQLEditor
                }
            }
        });
    },

    onDisplaySQLEditor: function(){
        this.getSQLEditor().show();
    }
});
