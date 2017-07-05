Ext.define('App.view.home.task.HomeTasksModel',{
    extend: 'Ext.app.ViewModel',
    alias : 'viewmodel.hometasks',

    stores: {
        tasks: {
            source      : 'TaskStore',
            groupField  : 'primaryGroupName'
        }
    }
});