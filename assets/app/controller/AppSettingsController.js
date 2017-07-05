Ext.define('App.controller.AppSettingsController',{
    extend: 'Ext.app.Controller',

    views : [
        'App.view.settings.app.AppSettings'
    ],

    refs : [
        {
            ref         : 'AppSettings',
            xtype       : 'appsettings',
            autoCreate  : true,
            selector    : 'appsettings'
        }
    ],


    init: function() {

        this.listen({
            controller: {
                '*': {
                    'displayappsettings' : this.onDisplayAppSettings,
                    'saveappsettings'    : this.onSaveAppSettings,
                    'testmailserver'     : this.onTestMailServer
                }
            }
        });
    },

    onDisplayAppSettings : function(){

        var me = this,promise = AsyncAppSettings.find();

        var success = function(confs){
            me.getAppSettings().display(confs);
        };
        var error = function(e){
            Message.growl.error('Usable to display settings!');
        };

        promise.success(success).error(error);

    },

    onSaveAppSettings : function(s){
        AsyncAppSettings.save(s);
    },

    onTestMailServer: function(ms){

        Ext.MessageBox.prompt('Please enter your email:',undefined, function(btn,email){
            if(btn=='ok'){
                AsyncSystemSettings.testMailServer(ms,email);
            }
        });

    }

});
