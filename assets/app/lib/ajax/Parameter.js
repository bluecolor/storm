Ext.define('App.lib.ajax.Parameter',{

    singleton: true,
    alternateClassName: ['AsyncParameter'],

    create : function(p, o){

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
            Message.growl.error('Failed to create parameter');
        };

        var success = function(r){
            Ext.getStore(Constants.Store.PARAMETER).loadRawData(r,true);
            Message.growl.success('Created parameter');
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
            url         : 'parameter',
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(p),
            success     : success,
            error       : error}).always(always);
    },
    update : function(p, o){
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
            Message.growl.error('Failed to update parameter');
        };
        var success = function(r){
            var s = Ext.getStore(Constants.Store.PARAMETER);
            s.loadRawData(r,true);
            Message.growl.success('Updated parameter');
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
            url         : 'parameter',
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(p),
            success     : success,
            error       : error
        }).always(always);
    },
    destroy: function(p, o){

        Message.ext.progress();

        var url = undefined,data = {id:p};

        if(_.isArray(p)){
            url = 'parameter'
        }else if(_.isString(p)){
            url = 'parameter/{0}'.format(p);
        }else {
            Message.growl.error('Unexpected Error');
            Ext.MessageBox.hide();
            return;
        }

        var success = function(p){
            var s = Ext.getStore(Constants.Store.PARAMETER);
            _.each(p,function(p){
                var r = s.getById(p.id);
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
    }
});