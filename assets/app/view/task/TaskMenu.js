Ext.define('App.view.task.TaskMenu',{
    extend  : 'Ext.menu.Menu',
    xtype   : 'taskmenu',

    items : [
        {
            name : 'view',
            text : 'View'
        },
        {
            name : 'edit',
            text : 'Edit'
        },
        {
            name : 'delete',
            text : 'Delete',
            iconCls : 'delete'
        },'-',
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
        },'-',
        {
            name : 'duplicate',
            text : 'Duplicate'
        },'-',
        {
            name : 'dependencies',
            text : 'Dependencies',
            iconCls: 'tree'
        }
    ]

});