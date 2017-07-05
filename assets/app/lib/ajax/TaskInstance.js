Ext.define('App.lib.ajax.TaskInstance',{
    singleton: true,
    alternateClassName : ['AsyncTaskInstance'],


    findErrors: function(){
        return $.ajax({
            type        : 'GET',
            url         : 'taskInstance/errors',
            contentType : 'application/json',
            dataType    : 'json'
        });
    },

    find : function(id){
        return $.ajax({
            type        : 'GET',
            url         : 'taskInstance/{}'.format(id),
            contentType : 'application/json',
            dataType    : 'json'});
    },

    findBySession: function(sid){
        return $.ajax({
            type        : 'GET',
            url         : 'taskInstance/session/{}'.format(sid),
            contentType : 'application/json',
            dataType    : 'json'});
    },

    kill: function(id,o){

        Message.ext.showWait();

        var url = undefined,data = {id:id};

        if(_.isArray(id)){
            url = 'taskInstance/kill';
        }
        else if(_.isString(id)){
            url = 'taskInstance/kill/{}'.format(id);
        }else {
            Message.growl.error('Unexpected Error');
            console.log('String id expected for task instance');
            console.log('Encountered ' + id);
            Ext.MessageBox.hide();
            return;
        }

        var success = function(tasks){
            var s = Ext.getStore(Constants.Store.TASK_INSTANCE);

            if(_.isEmpty(tasks)){
                return;
            }
            _.each(_.map(tasks,'id'),function(id){
                var task = s.getById(id);
                if(task){
                    task.set('status',Constants.Status.KILLED);
                }
            });
            s.commitChanges();
            try {
                if(o && o.cb && o.cb.success){
                    o.cb.success();
                }
            }catch(e){console.log(e);}
            Message.growl.success('Saved changes');
        };
        var error   = function(e){
            Message.growl.error(e.responseText);
            console.log(e);
        };
        var always  = function(){
            if(o && o.cb && o.cb.always){
                o.cb.always();
            }
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

    makeReady   : function(id,o){

        Message.ext.showWait();

        var url = undefined,data = {id:id};

        if(_.isArray(id)){
            url = 'taskInstance/makeReady';
        }
        else if(_.isString(id)){
            url = 'taskInstance/makeReady/{}'.format(id);
        }else {
            Message.growl.error('Unexpected Error');
            console.log('String id expected for task instance');
            console.log('Encountered ' + id);
            Ext.MessageBox.hide();
            return;
        }


        var success = function(tasks){

            var s = Ext.getStore(Constants.Store.TASK_INSTANCE);

            if(_.isEmpty(tasks)){
                return;
            }
            _.each(_.map(tasks,'id'),function(id){
                var task = s.getById(id);
                if(task){

                    task.set('status',Constants.Status.READY);
                }
            });
            s.commitChanges();
            try {
                if(o && o.cb && o.cb.success){
                    o.cb.success();
                }
            }catch(e){console.log(e);}
            Message.growl.success('Saved changes');
        };
        var error   = function(e){
            Message.growl.error(e.responseText);
            console.log(e);
        };
        var always  = function(){

            if(o && o.cb && o.cb.always){
                o.cb.always();
            }

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

    block : function(id,o) {

        Message.ext.showWait();

        var url = undefined,data = {id:id};

        if(_.isArray(id)){
            url = 'taskInstance/block';
        }
        else if(_.isString(id)){
            url = 'taskInstance/block/{}'.format(id);
        }else {
            Message.growl.error('Unexpected Error');
            console.log('String id expected for task instance');
            console.log('Encountered ' + id);
            Ext.MessageBox.hide();
            return;
        }

        var success = function(tasks){
            var s = Ext.getStore(Constants.Store.TASK_INSTANCE);

            if(_.isEmpty(tasks)){
                return;
            }
            _.each(_.map(tasks,'id'),function(id){
                var task = s.getById(id);
                if(task){
                    task.set('status',Constants.Status.BLOCKED);
                }
            });
            try {
                if(o && o.cb && o.cb.success){
                    o.cb.success();
                }
            }catch(e){console.log(e);}
            s.commitChanges();
            Message.growl.success('Saved changes');
        };
        var error   = function(x,o,e){
            Message.growl.error(x.responseText);
            console.log(x);
        };
        var always  = function(){
            if(o && o.cb && o.cb.always){
                o.cb.always();
            }
            try {
                Ext.MessageBox.hide();
            }catch(except) {
                console.log(except.message);
            }
        };

        $.ajax({
            type : 'PUT',
            url  : url,
            dataType    : 'json',
            data        : JSON.stringify(data),
            contentType : 'application/json',
            success : success,
            error   : error
        }).always(always);
    },
    exclude     : function(t) {
        this.setExcluded(t,true);
    },
    include     : function(t){
        this.setExcluded(t,false);
    },

    update: function(t,o){


        Message.ext.showWait();
        var url = 'taskInstance/{}'.format(t.id);

        var success = function(instances){

            var s = Ext.getStore(Constants.Store.TASK_INSTANCE);

            if(_.isEmpty(instances)){
                return;
            }

            s.loadRawData(instances, true);

            Message.growl.success('Saved changes');
        };
        var error   = function(x,o,e){
            Message.growl.error(x.responseText);
            console.log(x);
        };
        var always  = function(){
            if(o && o.cb && o.cb.always){
                o.cb.always();
            }
            try {
                Ext.MessageBox.hide();
            }catch(except) {
                console.log(except.message);
            }
        };

        $.ajax({
            type : 'PUT',
            url  : url,
            dataType    : 'json',
            data        : JSON.stringify(t),
            contentType : 'application/json',
            success : success,
            error   : error
        }).always(always);
    },

    setExcluded : function(id,e,o){
        Message.ext.showWait();
        var url  = undefined,
            data = {id:id},
            text = e?'exclude':'include';

        if(_.isArray(id)){
            url = 'taskInstance/{}'.format(text);
        }else if(_.isString(id)){
            url = 'taskInstance/{0}/{1}'.format(text,id);
        }else {
            Message.growl.error('Unexpected Error');
            console.log('String id expected for task instance');
            console.log('Encountered ' + id);
            Ext.MessageBox.hide();
            return;
        }

        var success = function(tasks){
            var s = Ext.getStore(Constants.Store.TASK_INSTANCE);

            if(_.isEmpty(tasks)){
                return;
            }
            _.each(_.map(tasks,'id'),function(id){
                var task = s.getById(id);
                if(task){
                    task.set('excluded',e);
                }
            });
            try {
                if(o && o.cb && o.cb.success){
                    o.cb.success();
                }
            }catch(e){console.log(e);}
            s.commitChanges();
            Message.growl.success('Saved changes');
        };
        var error   = function(x,o,e){
            Message.growl.error(x.responseText);
            console.log(x);
        };
        var always  = function(){
            if(o && o.cb && o.cb.always){
                o.cb.always();
            }
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
    }

});