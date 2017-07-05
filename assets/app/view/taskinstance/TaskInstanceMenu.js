Ext.define('App.view.taskinstance.TaskInstanceMenu',{
    extend  : 'Ext.menu.Menu',
    xtype   : 'taskinstancemenu',

    items : [
        {
            name : 'view',
            text : 'View'
        },
        {
            name : 'edit',
            text : 'Edit'
        },'-',
        {
            name : 'exclude',
            text : 'Exclude',
            iconCls : 'tag-excluded'
        },
        {
            name : 'include',
            text : 'Include'
        },'-',
        {
            name : 'kill',
            text : 'Kill',
            iconCls : 'kill'
        },
        {
            name : 'makeReady',
            text : 'Make Ready'
        },
        {
            name : 'block',
            text : 'Block'
        },'-',
        {
            name : 'dependencies',
            text : 'Dependencies',
            iconCls: 'tree'
        }

    ]

});