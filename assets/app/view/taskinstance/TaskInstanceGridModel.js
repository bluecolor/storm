Ext.define('App.view.taskinstance.TaskInstanceGridModel',{
    extend: 'Ext.app.ViewModel',
    alias : 'viewmodel.taskinstancegrid',

    stores: {
        taskInstance : {
            source : Constants.Store.TASK_INSTANCE,
            groupField  : 'primaryGroupName'
        }
    }

});