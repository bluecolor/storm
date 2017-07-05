Ext.define('App.view.home.schedulerdetail.HomeSchedulerDetail',{
    extend: 'Ext.container.Container',
    xtype : 'homeschedulerdetail',

    requires: [
        'App.view.home.taskinstance.HomeTaskInstancesContainer',
        'App.view.home.schedulerdetail.HomeSchedulerDetailController',
        'App.view.home.session.HomeSessionsContainer',
        'App.view.home.task.HomeTasksContainer',
        'App.view.home.graph.HomeGraphContainer',
        'App.view.home.plan.HomePlansContainer',
        'App.view.home.schedulerdetail.EmptyScheduler',
        'App.view.home.group.HomeGroupsContainer'
    ],

    controller: 'homeschedulerdetail',

    border: false,


    items: [
        {
            layout      : 'card',
            reference   : 'DetailContainer',
            activeItem  : 0,
            items : [
                {
                    xtype : 'emptyscheduler'
                },
                {
                    cls   : 'card scheduler-detail',
                    name  : 'schdetail',
                    xtype : 'tabpanel',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'homeplanscontainer',
                            title: 'Plans'
                        },
                        {
                            xtype: 'homegroupscontainer',
                            title: 'Groups'
                        },
                        {
                            title: 'Tasks',
                            xtype: 'hometaskscontainer'
                        },
                        {
                            title: 'Instances',
                            xtype: 'hometaskinstancescontainer'
                        },
                        {
                            title: 'Sessions',
                            xtype: 'homesessionscontainer'
                        },
                        {
                            title: 'Graphs',
                            xtype: 'homegraphcontainer'
                        }
                    ]
                }
            ]
        }
    ]

});