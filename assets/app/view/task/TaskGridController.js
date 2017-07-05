Ext.define('App.view.task.TaskGridController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.taskgrid',

    requires: [
        'App.view.task.TaskMenu',
        'App.view.task.TasksMenu'
    ],

    mixins: [
        'App.view.task.TaskGridControllerMixin'
    ],

    listen: {
        component: {
        },

        controller: {
            '*' : {
                'reloadtasks' : function(){
                    this.onReloadTasks();
                },
                'searchtask' : function(text){
                    this.onSearchTask(text);
                },
                'showtasksmenu' : function(e){
                    this.onTasksMenu(e);
                }
            }
        }
    },

    onTasksMenu : function(e){
        var me=this,m = Ext.create('App.view.task.TasksMenu');
        m.showAt(e.getXY());

        var onTasksMenuItemClick = function(m,i){
            var sel = me.getView().getSelectionModel().getSelection();
            var t = _.map(sel,function(r){return r.data.id;});

            switch(i.name){
                case 'delete'       : this.onDeleteTask(t); break;
                case 'deactivate'   : this.onSetActive(false,t); break;
                case 'activate'     : this.onSetActive(true,t); break;
                case 'include'      : this.onSetExcluded(false,t); break;
                case 'exclude'      : this.onSetExcluded(true,t); break
            }
        };

        m.on('click',onTasksMenuItemClick,this);
    },

    onSetExcluded: function(excluded,t){
        var cb = function(b){
            if(b == 'ok'){
                AsyncTask.setExcluded(excluded,t);
            }
        };
        Message.ext.ask(cb);
    },

    onDeleteTask : function(taskId){
        this.fireEvent('deletetask',taskId);
    },

    onReloadTasks : function(){
        Ext.getStore(Constants.Store.TASK).loadStore();
    },

    onTaskMenu : function(grid,rowIndex,e,r){
        var o = {
            record: r,
            view  : grid,
            event : e
        };
        this.fireEvent('displaytaskmenu',o)
    }

});