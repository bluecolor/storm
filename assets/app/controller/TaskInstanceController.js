Ext.define('App.controller.TaskInstanceController', {
    extend: 'Ext.app.Controller',

    views : [
        'App.view.taskinstance.TaskInstance',
        'App.view.taskinstance.dependency.TaskInstanceDependency',
        'App.view.taskinstance.TaskInstanceMenu',
        'App.view.taskinstance.TaskInstancesMenu',
        'App.view.messagebox.KillTaskMessage'
    ],

    refs  : [
        {
            ref         : 'killTaskMessage',
            xtype       : 'killtaskmessage',
            selector    : 'killtaskmessage',
            autoCreate  : true,
            forceCreate : true
        },
        {
            ref         : 'taskInstanceMenu',
            xtype       : 'taskinstancemenu',
            selector    : 'taskinstancemenu',
            autoCreate  : true,
            forceCreate : true
        },
        {
            ref         : 'taskInstancesMenu',
            xtype       : 'taskinstancesmenu',
            selector    : 'taskinstancesmenu',
            autoCreate  : true,
            forceCreate : true
        },
        {
            ref         : 'taskInstance',
            xtype       : 'taskinstance',
            selector    : 'taskinstance',
            autoCreate  : true
        },
        {
            xtype       : 'taskinstancedependency',
            ref         : 'taskInstanceDependency',
            selector    : 'taskinstancedependency',
            autoCreate  : true
        }
    ],

    init: function() {
        this.listen({
            controller: {
                '*': {
                    'displaytaskinstancemenu'       : this.onDisplayTaskInstanceMenu,
                    'displaytaskinstancesmenu'      : this.onDisplayTaskInstancesMenu,
                    'displaytaskinstanceview'       : this.onDisplayTaskInstanceView,
                    'displaytaskinstanceedit'       : this.onDisplayTaskInstanceEdit,
                    'makereadytaskinstance'         : this.onMakeReadyTaskInstance,
                    'blocktaskinstance'             : this.onBlockTaskInstance,
                    'excludetaskinstance'           : this.onExcludeTaskInstance,
                    'killtaskinstance'              : this.onKillTaskInstance,
                    'updatetaskinstance'            : this.onUpdateTaskInstance,
                    'includetaskinstance'           : this.onIncludeTaskInstance,
                    'displaytaskinstancelogs'       : this.onDisplayTaskInstanceLogs,
                    'showtaskinstancedependencies'  : this.onShowDependencies
                }
            }
        });
        this.listenSocket();
    },

    onDisplayTaskInstanceMenu: function(o){
        var me= this,
            m = this.getTaskInstanceMenu(),
            r = o.record;

        var sm= o.view.getSelectionModel();
        sm.deselectAll();
        sm.select([r]);
        m.showAt(o.event.getXY());

        var options = {
            cb: {
                success: function(){
                    sm.deselectAll();
                }
            }
        };

        m.on('click',function(m, i, e){

            switch (i.name){

                case 'view'          : me.onDisplayTaskInstanceView (r.data,options);   break;
                case 'edit'          : me.onDisplayTaskInstanceEdit (r.data,options);   break;
                case 'makeReady'     : me.onMakeReadyTaskInstance(r.data.id,options);   break;
                case 'block'         : me.onBlockTaskInstance(r.data.id,options);       break;
                case 'exclude'       : me.onExcludeTaskInstance(r.data.id,options);     break;
                case 'include'       : me.onIncludeTaskInstance(r.data.id,options);     break;
                case 'dependencies'  : me.onShowDependencies(r.data,options);           break;
                case 'kill'          : me.onKillTaskInstance(r.data.id,options);        break;
            }
        });
    },

    onDisplayTaskInstancesMenu: function(o){
        var me = this;
        var m = this.getTaskInstancesMenu();
        m.showAt(o.event.getXY());
        var records = o.view.getSelectionModel().getSelection();
        var ids = _.map(records,function(r){ return r.data.id; });

        m.on('click',function(m, i, e){
            switch (i.name){
                case 'makeReady': me.onMakeReadyTaskInstance(ids);    break;
                case 'block'    : me.onBlockTaskInstance(ids);        break;
                case 'exclude'  : me.onExcludeTaskInstance(ids);      break;
                case 'include'  : me.onIncludeTaskInstance(ids);      break;
                case 'kill'     : me.onKillTaskInstance(ids);         break;
            }
        });
    },

    onKillTaskInstance: function(ids){
        var cb = function(){
            AsyncTaskInstance.kill(ids);
        };
        this.getKillTaskMessage().ask(ids,cb);
    },

    onShowDependencies: function(instance){
        this.getTaskInstanceDependency().setRoot(instance).show()
    },


    onDisplayTaskInstanceLogs: function(t){

        var me = this;
        if(_.isObject(t)){
            var w = me.getTaskInstance().view(t);
            w.down('tabpanel').setActiveItem(w.down('taskinstancelogs'));
            return;
        }

        Message.ext.progress("Please wait...",Constants.Icon.MULTI_GEAR);
        var promise = AsyncTaskInstance.find(t);
        var success = function(data){
            var s = Ext.create('Ext.data.Store',{model:'App.model.TaskInstanceModel'});
            s.loadRawData(data);
            var w = me.getTaskInstance().view(s.getAt(0).data);
            w.down('tabpanel').setActiveItem(w.down('taskinstancelogs'));
        };
        var error = function(e){
            console.log(e,t);
            Message.growl.error("Failed to get task instance");
        };

        var always = function(){
            Ext.MessageBox.hide();
        };

        promise.success(success).fail(error).always(always);
    },

    onDisplayTaskInstanceView : function(t, options){
        var me = this;
        if(_.isObject(t)){
            if(options && options.cb && options.cb.success){
                options.cb.success();
            }
            me.getTaskInstance().view(t);
            return;
        }


        Message.ext.progress("Please wait...",Constants.Icon.MULTI_GEAR);
        var promise = AsyncTaskInstance.find(t);
        var success = function(data){
            var s = Ext.create('Ext.data.Store',{model:'App.model.TaskInstanceModel'});
            s.loadRawData(data[0]);
            me.getTaskInstance().view(s.getAt(0).data);

            if(options && options.cb && options.cb.success){
                options.cb.success();
            }
        };
        var error = function(e){
            console.log(e,t);
            Message.growl.error("Failed to get task instance");
        };

        var always = function(){
            Ext.MessageBox.hide();
        };

        promise.success(success).fail(error).always(always);
    },

    onDisplayTaskInstanceEdit : function(t, options){
        this.getTaskInstance().edit(t);
        if(options && options.cb && options.cb.success){
            options.cb.success();
        }
    },

    onMakeReadyTaskInstance : function(t,o){
        var cb = function(b){
            if(b == 'ok'){
                AsyncTaskInstance.makeReady(t,o);
            }
        };
        Message.ext.ask(cb);
    },

    onBlockTaskInstance : function(t,o){
        var cb = function(b){
            if(b == 'ok'){
                AsyncTaskInstance.block(t,o);
            }
        };
        Message.ext.ask(cb);
    },

    onExcludeTaskInstance : function(t,o){
        var cb = function(b){
            if(b == 'ok'){
                AsyncTaskInstance.exclude(t,o);
            }
        };
        Message.ext.ask(cb);
    },

    onIncludeTaskInstance : function(t,o){
        var cb = function(b){
            if(b == 'ok'){
                AsyncTaskInstance.include(t,o);
            }
        };
        Message.ext.ask(cb);
    },

    onUpdateTaskInstance: function(instance,o){
        var cb = function(b){
            if(b == 'ok'){
                AsyncTaskInstance.update(instance,o);
            }
        };
        Message.ext.ask(cb);
    },


    listenSocket: function(){
        var me = this,
            errorStack = [];

        var onError = function(e, silent){
            if(silent == undefined){
                silent = false;
            }
            var error = {
                    title   : 'Error - {}'.format(e.data.task.name),
                    body    : 'Click here to see logs ...',
                    notifyClick: function(){
                        me.fireEvent('displaytaskinstancelogs',e.data.id);
                    }
                    //body : e.message
                };
            if(!silent && User.options.deno && User.options.deno.taskStatusWarn){
                Message.notify.error(error);
            }

            var ti = Ext.getStore(Constants.Store.TASK_INSTANCE).getById(e.data.id);
            if(ti){
                ti.set('status',Constants.Status.ERROR);
            }

            var i = _.find(me.errorStack,{id:e.data.id});
            if(!i){
                errorStack.push(e.data);
                if(!silent){
                    me.fireEvent('taskinstanceerrorstackchange',errorStack);
                }
            }
        };

        var onStatusUpdate = function(m){
            var instances   = m.data,
                stackChanged= false;

            _.each(instances, function(instance){
                var e = _.find(errorStack,{id:instance.id}),
                    danger = [Constants.Status.KILLED,Constants.Status.ERROR];

                if(e && danger.indexOf(instance.status) == -1 ){
                    stackChanged = true;

                    errorStack = _.remove(errorStack,function(e){
                        return e.id != instance.id;
                    });

                }else if(!e && danger.indexOf(instance.status) > -1){
                    stackChanged = true;
                    errorStack.push(instance);
                }
            });

            if(stackChanged){
                me.fireEvent('taskinstanceerrorstackchange',errorStack);
            }
        };

        var listen = function(){
            io.socket.on('TaskInstanceError', function (e) {
                onError(e);
            });

            io.socket.on('TaskInstanceStatusUpdate',function(m){
                onStatusUpdate(m);
            });
        };

        AsyncTaskInstance.findErrors().success(function(instances){
            _.each(instances,function(instance){
                var error = {
                    data: instance
                };
                onError(error,true);
            });
            me.fireEvent('taskinstanceerrorstackchange',errorStack);
        }).always(listen);

    }


});