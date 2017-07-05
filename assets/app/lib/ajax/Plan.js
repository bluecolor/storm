Ext.define('App.lib.ajax.Plan',{
    singleton: true,
    alternateClassName: ['AsyncPlan'],

    findTasksByStatus: function(sid, status){
        var url = 'plan/{}/tasks/{}'.format(sid,status);
        return $.ajax({
            type : 'GET',
            url  : url,
            dataType    : 'json',
            contentType : 'application/json'
        });
    },

    find : function(id){
        var url = id==undefined?'plan':'plan/id';
        var promise =
            $.ajax({
                type : 'GET',
                url  : url,
                dataType    : 'json',
                contentType : 'application/json'
            });
        return promise;
    },

    update   : function(p,o){

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
            Message.growl.error('Failed to update plan');
            Ext.getStore(Constants.Store.PLAN).rejectChanges();
        };
        var success = function(r){
            Ext.getStore(Constants.Store.PLAN).loadRawData(r,true);
            Message.growl.success('Updated plan');
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
            url         : 'plan',
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(p),
            success     : success,
            error       : error}).always(always);
    },
    create   : function(p, o){
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
            Message.growl.error('Failed to create plan');
            Ext.getStore(Constants.Store.PLAN).rejectChanges();
        };
        var success = function(r){

            if(r.scheduler == App.lib.Session.getSchedulerId()){
                Ext.getStore(Constants.Store.PLAN).loadRawData(r,true);
            }

            Message.growl.success('Created plan');
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
            url         : 'plan',
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(p),
            success     : success,
            error       : error}).always(always);
    },
    setActive: function(id,active){
        Message.ext.showWait();

        var url = undefined,data = {id:id};

        if(_.isArray(id)){
            url = 'plan/{}'.format(active?'activate':'deactivate');
        }
        else if(_.isString(id)){
            url = 'plan/{0}/{1}'.format(active?'activate':'deactivate', id);
        }else {
            Message.growl.error('Unexpected Error');
            console.log('String id expected for task instance');
            console.log('Encountered ' + id);
            Ext.MessageBox.hide();
            return;
        }

        var success = function(plans){
            var s = Ext.getStore(Constants.Store.PLAN);
            _.each(plans,function(p){
                var r = s.getById(p.id);
                if(r){
                    r.set('active',active);
                    s.commitChanges();
                }
            });
            Message.growl.success('Changes saved.');
        };
        var error   = function(e){
            Message.growl.error('Error while saving changes!');
            console.log(e);
        };
        var always  = function(){
            try {
                Ext.MessageBox.hide();
            }catch(except) {
                console.log(except.message);
            }
        };

        $.ajax({
            type : 'PUT',
            url  : url,
            data : JSON.stringify(data),
            dataType    : 'json',
            contentType : 'application/json',
            success : success,
            error   : error
        }).always(always);
    },
    activate : function(id){
        this.setActive(id,true);
    },
    deactivate : function(id){
        this.setActive(id, false);
    },
    setProtected : function(p,id){
        Message.ext.showWait();
        var url = undefined,data = {id:id};

        if(_.isArray(id)){
            url = 'plan/{}'.format(p?'protect':'unprotect');
        }
        else if(_.isString(id)){
            url = 'plan/{0}/{1}'.format(p?'protect':'unprotect', id);
        }else {
            Message.growl.error('Unexpected Error');
            console.log('String id expected for task instance');
            console.log('Encountered ' + id);
            Ext.MessageBox.hide();
            return;
        }

        var success = function(plans){
            Ext.getStore(Constants.Store.PLAN).setProtected(p,_.map(plans,'id'));
            Message.growl.success('Changes saved.');
        };
        var error   = function(e){
            Message.growl.error('Error while saving changes!');
            console.log(e);
        };
        var always  = function(){
            try {
                Ext.MessageBox.hide();
            }catch(except) {
                console.log(except.message);
            }
        };

        $.ajax({
            type : 'PUT',
            url  : url,
            data : JSON.stringify(data),
            dataType    : 'json',
            contentType : 'application/json',
            success : success,
            error   : error
        }).always(always);
    },
    protect : function(id){
        this.setProtected(true,id);
    },
    unprotect : function(id){
        this.setProtected(false,id);
    },
    destroy : function(p,o){

        Message.ext.progress();

        var url = undefined,data = {id:p};

        if(_.isArray(p)){
            url = 'plan'
        }else if(_.isString(p)){
            url = 'plan/{0}'.format(p);
        }else {
            Message.growl.error('Unexpected Error');
            Ext.MessageBox.hide();
            return;
        }

        var success = function(plans){
            var s = Ext.getStore(Constants.Store.PLAN);
            _.each(plans,function(plan){
                var r = s.getById(plan.id);
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

    validate: function(p){
        
    },

    getPlanTaskStatusStats: function(planId){
        var url = "plan/{}/stats/taskStatus".format(planId);
        var promise =
            $.ajax({
                type : 'GET',
                url  : url,
                dataType    : 'json',
                contentType : 'application/json'
            });
        return promise;
    }


});