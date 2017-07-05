Ext.define('App.view.settings.app.AppSettingsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.appsettings',

    onSaveAppSettings : function(){
        var s = this.getView().getValues();
        this.fireEvent('saveappsettings',s);
    },

    onTestMailServer: function(){
        var ms = this.lookupReference('MailServer').getValues();
        this.fireEvent('testmailserver',ms);
    }

});
