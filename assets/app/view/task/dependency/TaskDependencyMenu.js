Ext.define('App.view.task.dependency.TaskDependencyMenu',{
    extend  : 'Ext.menu.Menu',
    xtype   : 'taskdependencymenu',

    items : [
        {
            name : 'activate',
            text : 'Activate'
        },
        {
            name : 'deactivate',
            text : 'Deactivate',
            iconCls : 'cancel'
        },'-',
        {
            name : 'include',
            text : 'Include'
        },
        {
            name : 'exclude',
            text : 'Exclude',
            iconCls : 'tag-excluded'
        }
    ]

});