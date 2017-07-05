Ext.define('App.view.group.GroupModel', {
    extend  : 'Ext.app.ViewModel',
    alias   : 'viewmodel.group',

    stores  : {
        scheduler : {
            source: 'SchedulerStore'
        },
        groups : {
            source: 'GroupStore'
        },
        tasks : {
            model: 'App.model.TaskModel',
            pageSize : 0,
            proxy : {
                type: 'ajax',
                url: '/task/searchByName',
                reader: {
                    type: 'json'
                }
            }
        }

    }


});