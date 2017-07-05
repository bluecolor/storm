Ext.define('App.view.navigator.navsettings.NavSettingsController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.navsettings',


    onNavSettingSelection : function( g, td, c, r, tr, rIdx, e, eOpts) {
        var me = this;
        switch(r.get('val')){
            case Constants.ID.Settings.users        : me.onDisplayUsers(); break;
            case Constants.ID.Settings.connections  : me.onDisplayConnections(); break;
            case Constants.ID.Settings.options      : me.onDisplayOptions(); break;
            case Constants.ID.Settings.system       : me.onDisplayAppSettings(); break;
            case Constants.ID.Settings.schedulers   : this.onDisplaySchedulers(); break;
            case Constants.ID.Settings.parameters   : this.onDisplayParameters(); break;
            case Constants.ID.Settings.password     : this.onChangePassword(); break;
        }
    },

    onDisplayUsers : function(){
        this.fireEvent('displayuserview');
    },
    onDisplayConnections : function(){
        this.fireEvent('displayconnectionview');
    },
    onDisplaySchedulers : function(){
        this.fireEvent('displayschedulerview');
    },
    onDisplayParameters : function(){
        this.fireEvent('displayparameterview');
    },

    onDisplayOptions : function(){
        this.fireEvent('displayoptions');
    },

    onDisplayAppSettings : function(){
        this.fireEvent('displayappsettings');
    },

    onChangePassword: function(){
        this.fireEvent('changepassword');
    }

});
