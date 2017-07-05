Ext.define('App.lib.ajax.System',{
    singleton: true,
    alternateClassName: ['AsyncSystem'],

    checkUpdate: function(cb){
        Message.ext.progress('Checking for updates ...',Constants.Icon.DOWNLOAD_CLOUD);

        var me = this;
        var success = function(confVersion){
            me.getConfig(Constants.SysConfParam.LATEST_VERSION_URL)
                .success(function(confUrl){
                    me.getLatestVersion(confUrl.value).success(function(lastVersion){
                        cb(confVersion.value,JSON.parse(lastVersion));
                    }).error(function(){
                        Message.growl.error('Failed to get latest version!');
                    }).always(function(){
                        Ext.MessageBox.hide();
                    });
                }).error(function(){
                    Message.growl.error('Failed to get sys conf param ' + Constants.SysConfParam.REMOTE_VERSION_URL);
                    Ext.MessageBox.hide();
                });
        };
        var error = function(){
            Message.growl.error('Failed to get current version!');
            Ext.MessageBox.hide();
        };

        me.getVersion().success(success).fail(error);

    },

    getConfig: function(parameter){
        var promise =
            $.ajax({
                type        : 'GET',
                url         : 'system/config/{}'.format(parameter),
                dataType    : 'json',
                contentType : 'application/json'
            });
        return promise;
    },

    getVersion: function(){
        var promise =
            $.ajax({
                type        : 'GET',
                url         : 'system/version',
                dataType    : 'json',
                contentType : 'application/json'
            });
        return promise;
    },

    getLatestVersion: function(url){
        var promise =
            $.ajax({
                type        : 'GET',
                url         : url,
                dataType    : 'text'
            });
        return promise;
    }


});