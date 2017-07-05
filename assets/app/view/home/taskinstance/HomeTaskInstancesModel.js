Ext.define('App.view.home.taskinstance.HomeTaskInstancesModel',{
    extend: Ext.app.ViewModel,
    alias : 'viewmodel.hometaskinstances',

    stores: {

        sessions: {
            source: 'SessionStore'
        },
        taskInstances: {
            source: 'TaskInstanceStore',
            groupField: 'primaryGroupName'
        }
    }

});