Ext.define('App.view.session.SessionController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.session',

    requires: [
    ],

    onSessionMenu : function(grid,rowIndex,e,r){
        this.fireEvent('displaysessionmenu',r.data,e);
    }

});

