Ext.define('App.view.task.TaskModel', {
    extend  : 'Ext.app.ViewModel',
    alias   : 'viewmodel.task',

    stores : {
        owners: {
            source  : 'UserStore'
        },
        predecessors: {
            model: 'App.model.TaskModel',
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/task/searchByName',
                reader: {
                    type: 'json'
                }
            }
        },
        groups: {
            source  : 'GroupStore'
        },
        plans : {
            source  : 'PlanStore'
        },
        connections: {
            source : 'ConnectionStore'
        }

   }

});
