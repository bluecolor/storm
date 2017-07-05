Ext.define('App.lib.ajax.Session',{
    singleton : true,
    alternateClassName: ['AsyncSession'],

    findTasksByStatus: function(sid, status){
        var url = 'session/{}/tasks/{}'.format(sid,status);
        return $.ajax({
            type : 'GET',
            url  : url,
            dataType    : 'json',
            contentType : 'application/json'
        });

    },

    play : function(id,o){
        var me = this;
        Message.ext.showWait();

        var url = 'session/play',data = {id:id};

        if(_.isArray(id)){
            url = 'session/play';
        }else if(_.isString(id)){
            url = 'session/play/{}'.format(id);
        }else {
            Message.growl.error('Unexpected Error');
            console.log('String id expected for session');
            console.log('Encountered ' + id);
            Ext.MessageBox.hide();
            return;
        }

        var success = function(sessions){
            var s = Ext.getStore(Constants.Store.SESSION);
            _.each(sessions,function(session){
                var r = s.getById(session.id);
                if(r){
                    r.set('status',Constants.Status.READY);
                    s.commitChanges();
                }
            });

            try {
                if(o && o.cb && o.cb.success){
                    o.cb.success();
                }
            }catch(e){console.log(e);}

            Message.growl.success('Saved changes.');
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
            type : 'PUT',
            url  : url,
            data : JSON.stringify(data),
            dataType    : 'json',
            contentType : 'application/json',
            success : success,
            error   : error
        }).always(always);
    },
    replay: function(id,o){
        var me = this;
        Message.ext.showWait();

        var url = 'session/replay',data = {id:id};

        if(_.isArray(id)){
            url = 'session/replay';
        }else if(_.isString(id)){
            url = 'session/replay/{}'.format(id);
        }else {
            Message.growl.error('Unexpected Error');
            console.log('String id expected for session');
            console.log('Encountered ' + id);
            Ext.MessageBox.hide();
            return;
        }

        var success = function(sessions){
            var s = Ext.getStore(Constants.Store.SESSION);
            _.each(sessions,function(session){
                var r = s.getById(session.id);
                if(r){
                    r.set('status',Constants.Status.READY);
                    s.commitChanges();
                }
            });

            try {
                if(o && o.cb && o.cb.success){
                    o.cb.success();
                }
            }catch(e){console.log(e);}

            Message.growl.success('Saved changes.');
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
            type : 'PUT',
            url  : url,
            data : JSON.stringify(data),
            dataType    : 'json',
            contentType : 'application/json',
            success : success,
            error   : error
        }).always(always);
    },

    pause: function(id,o){

        var me = this;
        Message.ext.showWait();

        var url = 'session/pause',data = {id:id};

        if(_.isArray(id)){
            url = 'session/pause';
        }else if(_.isString(id)){
            url = 'session/pause/{}'.format(id);
        }else {
            Message.growl.error('Unexpected Error');
            console.log('String id expected for session');
            console.log('Encountered ' + id);
            Ext.MessageBox.hide();
            return;
        }

        var success = function(session){
            var s = Ext.getStore(Constants.Store.SESSION);
            var r = s.getById(session.id);
            if(r){
                r.set('status',Constants.Status.PAUSED);
                s.commitChanges();
            }
            try {
                if(o && o.cb && o.cb.success){
                    o.cb.success();
                }
            }catch(e){console.log(e);}

            Message.growl.success('Saved changes.');
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
            type : 'PUT',
            url  : url,
            data : JSON.stringify(data),
            dataType    : 'json',
            contentType : 'application/json',
            success : success,
            error   : error
        }).always(always);
    },
    destroy: function(id,o){

        Message.ext.showWait();

        var url = undefined,data = {id:id};

        if(_.isArray(id)){
            url = 'session'
        }else if(_.isString(id)){
            url = 'session/{0}'.format(id);
        }else {
            Message.growl.error('Unexpected Error');
            console.log('String id expected!');
            console.log('Encountered ' + id);
            Ext.MessageBox.hide();
            return;
        }

        var success = function(sessions){
            var s = Ext.getStore(Constants.Store.SESSION);
            _.each(sessions,function(session){
                var r = s.getById(session.id);
                if(r){
                    s.remove(r);
                    s.commitChanges();
                }
            });
            Message.growl.success('Saved changes.');
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

    findLastSessionOfPlan : function(p){
        var promise =
            $.ajax({
                type : 'GET',
                url  : 'session/last/plan/'+p,
                dataType    : 'json',
                contentType : 'application/json'
            });
        return promise;
    },

    setParallel: function(id,parallel,o){

        var me = this;
        Message.ext.showWait();

        var url = 'session/parallel',
            data = {
                id:id,
                parallel:parallel
            };

        if(_.isString(id)){
            url = 'session/parallel/{}'.format(id);
        }else {
            Message.growl.error('Unexpected Error');
            console.log('String id expected for session','Encountered ' + id);
            Ext.MessageBox.hide();
            return;
        }

        var success = function(session){
            var s = Ext.getStore(Constants.Store.SESSION);
            var r = s.getById(session.id);
            if(r){
                r.set('parallel',session.parallel);
                s.commitChanges();
            }
            try {
                if(o && o.cb && o.cb.success){
                    o.cb.success();
                }
            }catch(e){console.log(e);}

            Message.growl.success('Saved changes.');
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