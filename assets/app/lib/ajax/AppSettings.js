Ext.define('App.lib.ajax.AppSettings',{
    singleton : true,
    alternateClassName: ['AsyncAppSettings'],

    find : function(){
        return $.ajax({
            type        : 'GET',
            url         : 'app/conf',
            contentType : 'application/json',
            dataType    : 'json'});
    },

    save : function(s,o){
        Message.ext.progress();
        var me = this;

        var always= function(){
            try {
                Ext.MessageBox.hide();
            }catch(e) {
                console.log(e.message);
            }
        };
        var error = function(r){
            Message.growl.error('Failed to save settings');
        };
        var success = function(r){
            Message.growl.success('Saved settings');
            try {
                if(o && o.cb && o.cb.success){
                    o.cb.success();
                }
            }catch(e){
                console.log(e)
            }
        };

        return $.ajax({
            type        : 'PUT',
            url         : 'app/conf',
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(s),
            success     : success,
            error       : error
        }).always(always);
    },

    testMailServer: function(ms,email){
        Message.ext.progress('Testing ...');
        var me = this;

        var always= function(){
            try {
                Ext.MessageBox.hide();
            }catch(e) {
                console.log(e.message);
            }
        };
        var error = function(r){
            Message.growl.error('Failed connect!');
        };
        var success = function(r){
            Message.growl.success('Success');
            try {
                if(o && o.cb && o.cb.success){
                    o.cb.success();
                }
            }catch(e){
                console.log(e)
            }
        };

        return $.ajax({
            type        : 'POST',
            url         : 'appSettings/test/mailServer',
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify({
                ms: ms,
                email: email
            }),
            success     : success,
            error       : error
        }).always(always);
    }

});