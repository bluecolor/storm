Ext.define('App.lib.ajax.Group',{
    singleton: true,
    alternateClassName: ['AsyncGroup'],

    findTasks: function(gid){
        return $.ajax({
            type        : 'GET',
            url         : 'group/{}/tasks'.format(gid),
            contentType : 'application/json',
            dataType    : 'json'});
    },

    find    : function(id) {
        Message.ext.progress(undefined,'processing');
        return $.ajax({
            type        : 'GET',
            url         : 'group/{}'.format(id),
            contentType : 'application/json',
            dataType    : 'json'});
    },

    findByScheduler: function(schedulerId){
        schedulerId = schedulerId ? schedulerId : App.lib.Session.getSchedulerId();

        return $.ajax({
            type        : 'GET',
            url         : 'group/scheduler/{}'.format(schedulerId),
            contentType : 'application/json',
            dataType    : 'json'});
    },

    destroy : function(g,o){
        var url = undefined,data = {id:g};

        if(_.isArray(g)){
            url = 'group'
        }else if(_.isString(g)){
            url = 'group/{0}'.format(g);
        }else {
            Message.growl.error('Unexpected Error');
            Ext.MessageBox.hide();
            return;
        }

        var success = function(groups){
            var s = Ext.getStore(Constants.Store.GROUP);
            _.each(groups,function(group){
                var r = s.getById(group.id);
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
    update  : function(g,o){
        Message.ext.progress();
        var me = this;
        var always = function(){
            try {
                Ext.MessageBox.hide();
            }catch(except) {
                console.log(except.message);
            }
        };
        var error = function(r){
            Message.growl.error('Failed to update group');
            Ext.getStore(Constants.Store.GROUP).rejectChanges();
        };
        var success = function(r){
            var s = Ext.getStore(Constants.Store.GROUP);
            s.loadRawData(r,true);
            Message.growl.success('Updated group');
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
            url         : 'group/'+g.id,
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(g),
            success     : success,
            error       : error
        }).always(always);
    },
    create  : function(g,o){
        Message.ext.progress();
        var me = this;

        var always = function(){
            try {
                Ext.MessageBox.hide();
            }catch(except) {
                console.log(except.message);
            }
        };
        var error = function(r, o){
            Message.growl.error('Failed to create group');
            Ext.getStore(Constants.Store.GROUP).rejectChanges();
        };

        var success = function(r){

            if(r.scheduler == App.lib.Session.getSchedulerId()){
                Ext.getStore(Constants.Store.GROUP).loadRawData(r, true);
            }
            Message.growl.success('Created group');
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
            url         : 'group',
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(g),
            success     : success,
            error       : error}).always(always);
    }

});