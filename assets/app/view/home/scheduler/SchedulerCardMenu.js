Ext.define('App.view.home.scheduler.SchedulerCardMenu',{
    extend : 'Ext.menu.Menu',
    xtype  : 'schedulercardmenu',

    items  : [
        {
            text : 'Go to Scheduler',
            name : 'go'
        },
        {
            text : 'Refresh',
            name : 'refresh'
        },
        {
            text    : 'Delete',
            name    : 'delete',
            iconCls : 'delete'
        },'-',
        {
            text : 'New Task',
            name : 'newTask'
        },
        {
            text : 'New Group',
            name : 'newGroup'
        },
        {
            text : 'New Plan',
            name : 'newPlan'
        }
    ]


});