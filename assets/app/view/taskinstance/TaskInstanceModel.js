Ext.define('App.view.taskinstance.TaskInstanceModel', {
    extend  : 'Ext.app.ViewModel',
    alias   : 'viewmodel.taskinstance',

    stores : {
        plans: {
            source  : 'PlanStore'
        },
        logs : {
            fields: [
                {
                    name: 'status',
                    type: 'string'
                },
                {
                    name: 'log',
                    type: 'string'
                },
                {
                    name: 'createdAt',
                    type: 'date'
                },
                {
                    name: 'owner',
                    type: 'auto'
                },
                {
                    name: 'ownerName',
                    calculate: function(d){
                        return d.owner?d.owner.name:'System';
                    }
                }
            ],
            pageSize : 0,
            proxy : {
                type: 'ajax',
                url: '/log/taskInstance/:id',
                reader: {
                    type: 'json'
                }
            },

            sorters : [
                {
                    property: 'createdAt',
                    direction:'DESC'
                }
            ],

            loadStore: function(id){
                this.proxy.url = '/log/taskInstance/{}'.format(id);
                this.load();
            }
        },
        connections: {
            source : 'ConnectionStore'
        },
        predecessors: {
            model: 'App.model.TaskInstanceModel',
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/taskInstance/searchLatestByName',
                reader: {
                    type: 'json'
                }
            }
        }
    }

});

