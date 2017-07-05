Ext.define('App.controller.HelpController',{
    extend: 'Ext.app.Controller',

    views : [
        'App.view.help.updatecheck.UpdateCheckResult',
        'App.view.help.updatecheck.UpToDateMessage',
        'App.view.help.about.About',
        'App.view.schexp.ScheduleExpression'
    ],



    refs : [
        {
            ref         : 'scheduleExpression',
            xtype       : 'scheduleexpression',
            autoCreate  : true,
            selector    : 'scheduleexpression'
        },
        {
            ref         : 'updateCheckResult',
            xtype       : 'updatecheckresult',
            autoCreate  : true,
            selector    : 'updatecheckresult'
        },
        {
            ref         : 'upToDateMessage',
            xtype       : 'uptodatemessage',
            autoCreate  : true,
            selector    : 'uptodatemessage'
        },
        {
            ref         : 'about',
            xtype       : 'about',
            autoCreate  : true,
            selector    : 'about'
        }
    ],


    init: function() {

        this.listen({
            controller: {
                '*': {
                    'checkupdate' : this.onCheckUpdate,
                    'displayabout': this.onDisplayAbout,
                    'scheduleexpression': this.onScheduleExpression
                }
            }
        });
    },

    onScheduleExpression: function(){
        this.getScheduleExpression().show();
    },

    onDisplayAbout: function(){
        var me = this;
        var success = function(conf){
            me.getAbout().display(conf.value);
        };
        var error = function(){
            me.getAbout().display();
        };
        AsyncSystem.getVersion().success(success).fail(error);
    },

    onCheckUpdate: function(){

        var me = this;
        var cb = function(currentVersion,latestVersion){

            if(currentVersion.version != latestVersion.version){
                me.getUpdateCheckResult().display(currentVersion,latestVersion);
            }else{
                me.getUpToDateMessage().show();
            }
        };

        AsyncSystem.checkUpdate(cb);
    }

});
