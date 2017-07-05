Ext.define('App.lib.ajax.User',{
    singleton: true,
    alternateClassName : ['AsyncUser'],

    
    findTasksByStatus: function(userId, status){
        var promise =
            $.ajax({
                type : 'GET',
                url  : 'user/{}/tasks/{}'.format(userId,status),
                dataType : 'json',
                contentType : 'application/json'
            });

        return promise;
    },
    
    
    me : function(){
        var promise =
            $.ajax({
                type : 'GET',
                url  : 'user/me',
                dataType : 'json',
                contentType : 'application/json'
            });

        return promise;
    },
    create : function(u, o){
        Message.ext.progress();
        var me = this;
        var always = function(){
            try {
                Ext.MessageBox.hide();
            }catch(e) {
                console.log(e.message);
            }
        };
        var error = function(r, o){
            console.log(r,o);
            Message.growl.error('Failed to create user. {}'.format(r.responseText));
        };
        var success = function(r){
            Ext.getStore(Constants.Store.USER).loadRawData(r,true);
            Message.growl.success('Saved changes.');
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
            url         : 'user',
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(u),
            success     : success,
            error       : error}).always(always);
    },
    update : function(u, o){

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
            Message.growl.error('Failed to update user {}'.format(r.responseText));
        };
        var success = function(r){

            var s = Ext.getStore(Constants.Store.USER);
            s.loadRawData(r,true);
            Message.growl.success('Updated user');
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
            url         : 'user',
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(u),
            success     : success,
            error       : error
        }).always(always);
    },
    destroy: function(u, o){
        Message.ext.progress();

        var url = undefined,data = {id:u};

        if(_.isArray(u)){
            url = 'user'
        }else if(_.isString(u)){
            url = 'user/{0}'.format(u);
        }else {
            Message.growl.error('Unexpected Error');
            Ext.MessageBox.hide();
            return;
        }

        var success = function(u){
            var s = Ext.getStore(Constants.Store.USER);
            _.each(u,function(user){
                var r = s.getById(user.id);
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
    saveOptions : function(o,silent){

        o = !o ? App.lib.User.options:o;
        silent = silent == undefined? false:silent;

        var me = this;
        if(!silent){
            Message.ext.showWait();
        }

        var success = function(){
            if(!silent){
                Message.growl.success('Saved changes.');
            }
        };
        var error   = function(x,o,e){
            Message.growl.error(x.responseText);
            console.log(x);
        };
        var always  = function(){
            try {
                Ext.MessageBox.hide();
            }catch(except) {
                console.log(except.message);
            }
        };

        return $.ajax({
            type : 'POST',
            url  : 'user/options',
            data : JSON.stringify(o),
            dataType    : 'json',
            contentType : 'application/json',
            success : success,
            error   : error
        }).always(always);
    },

    savePassword: function(p){
        var me = this;
        Message.ext.showWait();

        var success = function(){
            Message.growl.success('Saved password.');
        };
        var error   = function(x,o,e){
            Message.growl.error(x.responseText);
            console.log(x);
        };
        var always  = function(){
            try {
                Ext.MessageBox.hide();
            }catch(except) {
                console.log(except.message);
            }
        };

        return $.ajax({
            type : 'POST',
            url  : 'user/password',
            data : JSON.stringify(p),
            dataType    : 'json',
            contentType : 'application/json',
            success : success,
            error   : error
        }).always(always);
    }

});