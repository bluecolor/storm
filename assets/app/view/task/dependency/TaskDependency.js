Ext.define('App.view.task.dependency.TaskDependency',{
    extend: 'Ext.window.Window',
    xtype : 'taskdependency',

    requires : [
        'App.view.task.dependency.TaskDependencyController',
        'App.view.task.dependency.TaskGraph'
    ],


    controller  : 'taskdependency',

    modal       : true,
    collapsible : false,
    maximizable : false,
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
            xtype: 'taskgraph'
        }
    ],

    constructor: function(){
        var me = this;
        this.callParent(arguments);
        this.down('taskgraph').on('afterrender',function(g){
            g.init(me.root);
        });
    }

});