Ext.define('App.view.reports.Reports',{
    extend  : 'Ext.panel.Panel',
    xtype    : 'reports',
    requires : [
        'App.view.reports.ReportsController',
        'App.view.reports.ReportsModel',
        'App.view.reports.livesession.LiveSessionReport',
        'App.view.reports.owner.OwnerReport',
        'App.view.reports.system.SystemLogsReport',
        'App.view.reports.scheduler.SchedulerReport'
    ],

    controller : 'reports',
    viewModel  : 'reports',

    layout  : {
        type:'card',
        deferredRender:true
    },
    activeItem: 0,
    reference : 'Reports',


    items : [
        {
            xtype : 'systemlogsreport'
        },
        {
            xtype : 'schedulerreport'
        },
        {
            xtype : 'livesessionreport'
        },
        {
            xtype : 'ownerreport'
        }
    ]

});