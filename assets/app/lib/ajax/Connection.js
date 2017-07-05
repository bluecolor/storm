Ext.define('App.lib.ajax.Connection',{
    singleton: true,
    alternateClassName: ['AsyncConnection'],

    create  : function(c,o){
        Message.ext.progress();
        var me = this;

        var always  = function(){
            try {
                Ext.MessageBox.hide();
            }catch(except) {
                console.log(except.message);
            }
        };
        var error   = function(){
            Message.growl.error('Failed to create connection');
            Ext.getStore(Constants.Store.CONNECTION).rejectChanges();
        };
        var success = function(r){
            Ext.getStore(Constants.Store.CONNECTION).loadRawData(r,true);
            Message.growl.success('Created connection');
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
            url         : 'connection',
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(c),
            success     : success,
            error       : error}).always(always);
    },
    update  : function(c,o){
        Message.ext.progress();
        var me = this;

        var always  = function(){
            try {
                Ext.MessageBox.hide();
            }catch(except) {
                console.log(except.message);
            }
        };
        var error   = function(){
            Message.growl.error('Failed to update connection');
            Ext.getStore(Constants.Store.CONNECTION).rejectChanges();
        };
        var success = function(r){
            Ext.getStore(Constants.Store.CONNECTION).loadRawData(r,true);
            Message.growl.success('Updated connection');
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
            url         : 'connection',
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(c),
            success     : success,
            error       : error}).always(always);
    },
    destroy : function(c,o){
        var url = undefined,data = {id:c};

        if(_.isArray(c)){
            url = 'connection'
        }else if(_.isString(c)){
            url = 'connection/{0}'.format(c);
        }else {
            Message.growl.error('Unexpected Error');
            Ext.MessageBox.hide();
            return;
        }

        var success = function(cons){
            var s = Ext.getStore(Constants.Store.CONNECTION);
            _.each(cons,function(con){
                var r = s.getById(con.id);
                if(r){
                    s.remove(r);
                    s.commitChanges();
                }
            });
            if(o && o.cb && o.cb.success){
                o.cb.success();
            }
            Message.growl.success('Saved changes.');
        };
        var error   = function(x,o,e){
            if(o && o.cb && o.cb.error){
                o.cb.error();
            }
            Message.growl.error(x.responseText);
            console.log(x);
        };
        var always  = function(){
            try {
                if(o && o.cb && o.cb.always){
                    o.cb.always();
                }
                Ext.MessageBox.hide();
            }catch(except) {
                console.log(except.message);
            }
        };

        $.ajax({
            type : 'DELETE',
            url  : url,
            data : JSON.stringify(data),
            dataType    : 'json',
            contentType : 'application/json',
            success : success,
            error   : error
        }).always(always);
    },
    test    : function(c,o){
        var promise =
        $.ajax({
            type : 'POST',
            url  : 'connection/test',
            data : JSON.stringify(c),
            dataType    : 'json',
            contentType : 'application/json'
        });

        return promise;

    }
});