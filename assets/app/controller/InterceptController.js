Ext.define('App.controller.InterceptController', {
    extend: 'Ext.app.Controller',

    views : [
        'App.view.intercept.NoGroupIntercept',
        'App.view.intercept.DeleteIntercept'
    ],

    refs : [
        {
            ref         : 'noGroupIntercept',
            xtype       : 'nogroupintercept',
            autoCreate  : true,
            selector    : 'nogroupintercept'
        },
        {
            ref         : 'deleteIntercept',
            xtype       : 'deleteintercept',
            autoCreate  : true,
            forceCreate : true,
            selector    : 'deleteintercept'
        },
        {
            ref         : 'killIntercept',
            xtype       : 'killintercept',
            autoCreate  : true,
            forceCreate : true,
            selector    : 'killintercept'
        }
    ],

    init: function() {

        this.listen({
            controller: {
                '*': {
                    'nogroupintercept'  : this.onNoGroupIntercept,
                    'deleteintercept'   : this.onDeleteIntercept
                }
            }
        });
    },


    onDeleteIntercept : function(be,o){
        this.getDeleteIntercept().display(be,o);
    },

    onNoGroupIntercept: function(schId){
        this.getNoGroupIntercept().display(schId);
    }

});