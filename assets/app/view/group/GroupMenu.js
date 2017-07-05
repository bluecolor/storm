Ext.define('App.view.group.GroupMenu',{
    extend : 'Ext.menu.Menu',
    xtype  : 'groupmenu',

    items  : [
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
        }
    ]
});