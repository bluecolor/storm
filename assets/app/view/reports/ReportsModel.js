Ext.define('App.view.reports.ReportsModel',{
    extend: 'Ext.app.ViewModel',
    alias : 'viewmodel.reports',

    requires : [
        'App.model.SessionModel'
    ],

    stores: {
        schedulers: {
            source: 'SchedulerStore'
        },
        sessions: {
            autoLoad: false,
            model   : 'App.model.SessionModel',
            proxy : {
                type: 'ajax',
                _url: '/session/scheduler/{}',
                reader: {
                    type: 'json'
                }
            },
            sorters : [
                {
                    property: 'name',
                    direction:'DESC'
                }
            ]
        },

        logs: {
            autoLoad: true,
            fields: [
                {
                    name: 'level',
                    type: 'string'
                },
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
                    name: 'model',
                    type: 'string'
                },
                {
                    name: 'modelId',
                    type: 'string'
                },
                {
                    name: 'ownerName',
                    type: 'string',
                    calculate: function(d){
                        return d.owner?d.owner.name:'System';
                    }
                }
            ],
            pageSize : 0,
            proxy : {
                type: 'ajax',
                url: '/log',
                reader: {
                    type: 'json'
                }
            },

            sorters : [
                {
                    property: 'createdAt',
                    direction:'DESC'
                }
            ]
        }
    }

});