Ext.define('App.view.taskinstance.dependency.TaskInstanceDependency',{
    extend: 'Ext.window.Window',
    xtype : 'taskinstancedependency',

    requires : [
        'App.view.taskinstance.dependency.TaskInstanceDependencyController',
        'App.view.taskinstance.dependency.TaskInstanceGraph'
    ],

    controller  : 'taskinstancedependency',

    modal       : true,
    collapsible : false,
    maximizable : true,
    minWidth    : 500,
    minHeight   : 500,
    layout      : 'fit',
    closeAction : 'destroy',
    maximized   : true,
    title       : 'Dependencies',

    root        : undefined,

    setRoot: function(root){
        this.root = root;
        return this;
    },

    items: [
        {
            xtype: 'taskinstancegraph'
        }
    ],

    constructor: function(){
        var me = this;
        this.callParent(arguments);
        this.down('taskinstancegraph').on('afterrender',function(g){
            g.init(me.root);
        });
    }

});