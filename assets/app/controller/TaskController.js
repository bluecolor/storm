Ext.define('App.controller.TaskController', {
    extend: 'Ext.app.Controller',

    views : [
        'App.view.task.Task',
        'App.view.widget.fileupload.FileUpload',
        'App.view.task.dependency.TaskDependency',
        'App.view.task.TaskMenu',
        'App.view.task.TasksMenu',
        'App.view.messagebox.DeleteTaskMessage'
    ],

    refs  : [
        {
            xtype       : 'deletetaskmessage',
            ref         : 'deleteTaskMessage',
            selector    : 'deletetaskmessage',
            autoCreate  : true
        },
        {
            xtype       : 'tasksmenu',
            ref         : 'tasksMenu',
            selector    : 'tasksmenu',
            autoCreate  : true,
            forceCreate : true
        },
        {
            xtype       : 'taskmenu',
            ref         : 'taskMenu',
            selector    : 'taskmenu',
            autoCreate  : true,
            forceCreate : true
        },
        {
            xtype       : 'task',
            ref         : 'task',
            selector    : 'task',
            autoCreate  : true
        },
        {
            xtype       : 'fileupload',
            ref         : 'fileUpload',
            selector    : 'fileupload',
            autoCreate  : true,
            forceCreate : true
        },
        {
            xtype       : 'taskdependency',
            ref         : 'taskDependency',
            selector    : 'taskdependency',
            autoCreate  : true
        }
    ],

    init: function() {
        this.listen({
            controller: {
                '*': {
                    'displaytaskpredecessors': this.onDisplayTaskPredecessors,
                    'displaytaskmenu'   : this.onDisplayTaskMenu,
                    'displaytasksmenu'  : this.onDisplayTasksMenu,
                    'displaytask'       : this.onDisplayTask,
                    'displaytaskdup'    : this.onDisplayTaskDup,
                    'displaytaskview'   : this.onDisplayTaskView,
                    'displaytaskedit'   : this.onDisplayTaskEdit,
                    'displaytaskcreate' : this.onDisplayTaskCreate,
                    'displaytaskcreateforsch' : this.onDisplayTaskCreateForSch,
                    'includetask'       : this.onIncludeTask,
                    'excludetask'       : this.onExcludeTask,
                    'deletetask'        : this.onDeleteTask,
                    'activatetask'      : this.onActivateTask,
                    'deactivatetask'    : this.onDeactivateTask,
                    'settaskactive'     : this.onSetTaskActive,
                    'createtask'        : this.onCreateTask,
                    'updatetask'        : this.onUpdateTask,
                    'downloadtask'      : this.onDownloadTask,
                    'uploadtask'        : this.onUploadTask,
                    'submittaskupload'  : this.onSubmitTaskUpload,
                    'showtaskdependencies'  : this.onShowDependencies
                }
            }
        });
    },

    onDisplayTaskPredecessors: function(task,e){
        var me = this;
        if(_.isEmpty(task.predecessors)){return;}

        var items = _.map(task.predecessors,function(p){
            var iconCls;

            if(!p.active){
                iconCls = 'tag-inactive';
            }else if(p.excluded){
                iconCls = 'tag-excluded';
            }else{
                iconCls = 'tag-active';
            }

            return {
                text : p.name,
                name : p.id,
                iconCls : iconCls
            };
        });
        var m = Ext.create('Ext.menu.Menu',{items:items});
        m.showAt(e.getXY());

        m.on('click',function(m,i){
            me.fireEvent('displaytask',i.name);
        });
    },

    onDisplayTasksMenu: function(options){
        var me= this;
        var m = me.getTasksMenu(),
            r = _.map(options.records,function(record){return record.data;}),
            ids = _.map(r,function(record){return record.id;});

        var sm= options.view.getSelectionModel();
        sm.deselectAll();
        sm.select(options.records);
        m.showAt(options.event.getXY());

        m.on('click',function(m, i, e){
            switch (i.name){
                case 'delete'       : me.onDeleteTask(ids);     break;
                case 'activate'     : me.onActivateTask(ids);   break;
                case 'deactivate'   : me.onDeactivateTask(ids); break;
                case 'include'      : me.onIncludeTask(ids);    break;
                case 'exclude'      : me.onExcludeTask(ids);    break;
                case 'download'     : me.onDownloadTask(ids);   break;
            }
        });
    },

    onDisplayTaskMenu : function(options){
        var me= this;
        var m = me.getTaskMenu(),
            r = options.record.data,
            ids = [r.id];


        var sm= options.view.getSelectionModel();
        sm.deselectAll();
        sm.select(options.record);
        m.showAt(options.event.getXY());

        m.on('click',function(m, i, e){
            switch (i.name){
                case 'view'         : me.onDisplayTaskView(r);  break;
                case 'edit'         : me.onDisplayTaskEdit(r);  break;
                case 'delete'       : me.onDeleteTask(ids);     break;
                case 'activate'     : me.onActivateTask(ids);   break;
                case 'deactivate'   : me.onDeactivateTask(ids); break;
                case 'include'      : me.onIncludeTask(ids);    break;
                case 'exclude'      : me.onExcludeTask(ids);    break;
                case 'duplicate'    : me.onDisplayTaskDup(r);   break;
                case 'dependencies' : me.onShowDependencies(r); break;
            }
        });
    },

    onDeleteTask: function(ids){
        var cb = function(){
            AsyncTask.destroy(ids);
        };
        this.getDeleteTaskMessage().ask(ids,cb);
    },

    onIncludeTask : function(t,o){

        var cb = function(b){
            if(b == 'ok'){
                AsyncTask.setExcluded(false,t,o);
            }
        };
        Message.ext.ask(cb);
    },

    onExcludeTask : function(t,o){

        var cb = function(b){
            if(b == 'ok'){
                AsyncTask.setExcluded(true,t,o);
            }
        };
        Message.ext.ask(cb);
    },


    onShowDependencies: function(task){
        this.getTaskDependency().setRoot(task).show()
    },


    onSubmitTaskUpload: function(form, fileUploadWindow){

        if(form.isValid()){
            form.submit({
                url: 'task/upload',
                waitMsg: 'Uploading tasks ...',
                success: function(f, r) {
                    try{
                        var tasks = JSON.parse(r.response.responseText).tasks;
                        Message.growl.success('Uploaded {0} task{1}'.format(tasks.length,tasks.length>1?'s':''))
                    }catch(e){
                        Message.growl.warning('Uploaded file with error in response!');
                        Message.growl.error(e);
                    }
                    Ext.getStore(Constants.Store.TASK).load();
                    if(fileUploadWindow){
                        fileUploadWindow.close();
                    }
                },
                failure: function(f, a){
                    Message.growl.error('Unable to upload file!');
                    console.log('error',a);
                }
            });
        }
    },

    onUploadTask: function(){
        this.getFileUpload()
            .setContentType(Constants.FileContentType.TASK)
            .show();
    },

    onDownloadTask : function(tasks){
        AsyncTask.download(tasks);
    },

    onDisplayTaskDup : function(t){
        this.getTask().dup(t);
    },

    onDisplayTaskView: function(t){
        var me = this;
        if (_.isObject(t)){
            me.getTask().view(t);
            return;
        }
        Message.ext.showWait();

        var done = function(task){
            me.getTask().view(task);
        };

        var always = function(){
            try {
                Ext.MessageBox.hide();
            }catch(except) {
                console.log(except.message);
            }
        };

        var fail = function(task){
            Message.growl.error('Unable to find task!');
        };

        AsyncTask.find(t)
            .done(done)
            .fail(fail)
            .always(always);
    },

    onDisplayTaskEdit: function(t){
        this.getTask().edit(t);
    },
    /* for future releases */
    onDisplayTask : function(id){
        Message.ext.progress();
        var me = this;
        var success = function(r){
            me.getTask().edit(r);
        };
        var error   = function(e){
            Message.growl.error('Unable to find task');
        };
        var always  = function(){
            try{Ext.MessageBox.hide();}catch(e){};
        };
        AsyncTask.find(id).success(success).error(error).always(always);
    },

    onDisplayTaskCreate : function(planId) {

        planId = planId?planId:Ext.getStore(Constants.Store.TASK).getPlan();

        var schId,
            me   = this,
            plan= Ext.getStore(Constants.Store.PLAN).getById(planId);

        if(plan){
            schId = plan.get('scheduler').id;
        }

        AsyncGroup.findByScheduler(schId).success(function(groups){
            if(_.isEmpty(groups)){
                me.fireEvent('nogroupintercept',schId);
            }else{
                me.getTask().create().setPlan(planId);
            }
        }).fail(function(){
            Message.growl.error('Failed to get Group info for scheduler');
        });
    },

    onDisplayTaskCreateForSch: function(schedulerId){
        this.getTask().setScheduler(schedulerId).create();
    },


    onCreateTask: function(t,o){
        Message.ext.showWait();
        AsyncTask.create(t,o);
    },
    onUpdateTask: function(t, o){
        Message.ext.showWait();
        AsyncTask.update(t,o);
    },


    onActivateTask      : function(t,o){
        this.onSetTaskActive(true,t,o);
    },
    onDeactivateTask    : function(t,o){
        this.onSetTaskActive(false,t,o);
    },
    onSetTaskActive     : function(a,t,o){
        var cb = function(b){
            if(b=='ok'){
                AsyncTask.setActive(a,t,o);
            }
        };
        Message.ext.ask(cb);
    }

});