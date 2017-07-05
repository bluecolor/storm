Ext.define('App.view.task.TasksMenu',{
    extend  : 'Ext.menu.Menu',
    xtype   : 'tasksmenu',

    items : [
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
            name : 'activate',
            text : 'Activate'
        },
        {
            name : 'deactivate',
            text : 'Deactivate',
            iconCls : 'cancel'
        },'-',
        {
            name : 'delete',
            text : 'Delete',
            iconCls : 'delete'
        },'-',
        {
            name : 'download',
            text : 'Download Tasks'
        },
        {
            name : 'upload',
            text : 'Upload Tasks'
        }
    ]

});