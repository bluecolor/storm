Ext.define('App.view.reports.scheduler.SchedulerReportModel',{
    extend: 'Ext.app.ViewModel',
    alias : 'viewmodel.schedulerreport',

    stores: {
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
                    property: 'shortName',
                    direction:'DESC'
                }
            ]
        },
        sessionTaskStats: {
            autoLoad: false,
            fields: ['status', 'count' ],
            proxy : {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            },
            sorters : [
                {
                    property: 'status',
                    direction:'ASC'
                }
            ]
        }
    }

});