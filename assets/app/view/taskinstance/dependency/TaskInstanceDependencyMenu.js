Ext.define('App.view.taskinstance.dependency.TaskInstanceDependencyMenu',{
    extend  : 'Ext.menu.Menu',
    xtype   : 'taskinstancedependencymenu',

    items : [
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
        }
    ]

});