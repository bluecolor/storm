Ext.define('App.view.home.session.HomeSessionsController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.homesessions',

    requires: [
    ],

    onReloadSessions: function(){
        Ext.getStore(Constants.Store.SESSION).load();
    },

    onSessionMenu: function(g,ri,e,r){
        this.fireEvent('displaysessionmenu',r.data,e);
    },

    onShowAllSessions: function(){
        this.fireEvent('allsessions');
    }

});