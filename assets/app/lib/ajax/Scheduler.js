Ext.define('App.lib.ajax.Scheduler',{

    singleton: true,
    alternateClassName: ['AsyncScheduler'],


    download: function(schedulerId,o){

        Message.ext.progress();

        var options = '';

        _.forOwn(o,function(value,key){
            options += (value? key:'') + ',';
        });

        options = _.trimEnd(options,',');
        window.location= 'scheduler/download/'+schedulerId+'/options/'+options;
        Ext.MessageBox.hide();
    },


    planTaskStatusStats: function(schedulerId){
        var schedulerId = schedulerId?schedulerId:App.lib.Session.getSchedulerId();
        return $.ajax({
            type        : 'GET',
            url         : 'scheduler/planTaskStatusStats/'+schedulerId,
            contentType : 'application/json',
            dataType    : 'json'
        });
    },



    checkSession: function(s){
        var sch = App.lib.Session.getScheduler();
        if(sch.id){
            return;
        }
        Message.ext.progress('Initializing session ...');
        App.lib.Session.setScheduler(s);
        Ext.MessageBox.hide();
    },

    create : function(s, o){
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
            Message.growl.error('Failed to create scheduler');
        };

        var success = function(r){
            Ext.getStore(Constants.Store.SCHEDULER).loadRawData(r,true);
            Message.growl.success('Created scheduler');
            try {
                if(o && o.cb && o.cb.success){
                    o.cb.success(r.id);
                }
            }catch(e){
                console.log(e)
            }

            me.checkSession(r);
        };

        return $.ajax({
            type        : 'POST',
            url         : 'scheduler',
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(s),
            success     : success,
            error       : error}).always(always);
    },
    update : function(s, o){
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
            Message.growl.error('Failed to update scheduler');
        };
        var success = function(r){
            var s = Ext.getStore(Constants.Store.SCHEDULER);
            s.loadRawData(r,true);
            Message.growl.success('Updated scheduler');
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
            url         : 'scheduler',
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(s),
            success     : success,
            error       : error
        }).always(always);
    },
    destroy: function(s, o){

        Message.ext.progress();

        var url = undefined,data = {id:s};

        if(_.isArray(s)){
            url = 'scheduler'
        }else if(_.isString(s)){
            url = 'scheduler/{0}'.format(s);
        }else {
            Message.growl.error('Unexpected Error');
            Ext.MessageBox.hide();
            return;
        }

        var success = function(sch){
            var s = Ext.getStore(Constants.Store.SCHEDULER);
            var ids = [];
            _.each(sch,function(sch){
                var r = s.getById(sch.id);
                ids.push(sch.id);
                if(r){
                    s.remove(r);
                    s.commitChanges();
                }
            });
            if(o && o.cb && o.cb.success){
                o.cb.success(ids);
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