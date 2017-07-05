Ext.define('App.store.TaskStore',{
    extend   : 'App.store.BaseStore',

    requires : ['App.model.TaskModel'],


    id          : 'TaskStore',
    alias       : 'store.TaskStore',
    model       : 'App.model.TaskModel',
    groupField  : 'primaryGroupName',



    plan : undefined,


    proxy : {
        api : {
            create  : 'task',
            read    : undefined,
            update  : 'task',
            destroy : 'task',
            disable : 'task/disable',
            enable  : 'task/enable'
        }
    },

    sorters : [
        {
            property: 'primaryGroupName',
            direction:'ASC'
        },
        {
            property: 'name',
            direction:'ASC'
        }
    ],


    displayField    : 'name',
    createSuccess   : 'Created task',
    createError     : 'Failed to create task',

    updateSuccess   : 'Updated task',
    updateError     : 'Failed to update task',

    deleteSuccess   : 'Deleted task',
    deleteError     : 'Failed to delete task',


    setPlan : function(plan) {
        this.plan = plan;
        this.proxy.api.read = 'task/plan/{0}'.format(plan);
    },

    getPlan : function() {
        return this.plan;
    },

    loadStore : function(plan, callback){
        if(plan) {
            this.setPlan(plan);
        }
        if(this.proxy.api.read){
            this.load(callback);
        }else{
            this.removeAll() ;
        }
    },


    disableAndSync : function(data){
        this.setDisabledAndSync(true,data);
    },

    enableAndSync  : function(data){
        this.setDisabledAndSync(false,data);
    },

    setDisabledAndSync : function(disabled, data){
        var me = this;

        var always = function(){
            try {
                Ext.MessageBox.hide();
            }catch(except) {
                console.log(except.message);
            }
        };

        var error = function(r, o){
            Message.growl.error(me.getUpdateError(data));
            this.rejectChanges();
        };


        var success = function(r,o){
            me.findRecords(data).forEach(function(r){
                r.set('disabled',disabled);
            });
            Message.growl.success(me.getUpdateSuccess(data));
        };

        console.log(JSON.stringify(data));
        return $.ajax({
            type    : 'POST',
            url     : me.proxy.api[disabled?'disable':'enable'],
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(data),
            success     : success,
            error       : error,
            always      : always});
    },

    downloadTasks : function(tasks){
        window.location='/task/download/{0}'.format(tasks);
    },

    update : function(t){
        var me = this;

        _.chain(t).flatten().each(function(d){
            var r = me.getById(d.id);
            if(r){
                r.set('excluded',d.excluded);
            }
        }).value();

        me.commitChanges();
    }


});
