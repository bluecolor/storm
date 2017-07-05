Ext.define('App.view.intercept.NoGroupInterceptController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.nogroupintercept',

    onCreateGroup: function(){
        this.fireEvent('displaygroupcreate');
        this.getView().close();
    }

});