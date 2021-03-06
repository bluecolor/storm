Ext.define('App.view.taskinstance.TaskInstanceGroups',{
    extend  : 'App.view.pool.list.BasicList',
    xtype   : 'taskinstancegroups',

    requires: [

    ],

    name      : 'taskInstanceGroups',
    reference : 'TaskInstanceGroups',

    hideHeaders : true,

    title: 'Groups',


    columns : [
        {
            name      : 'name',
            dataIndex : 'name',
            flex      : 1
        },
        {
            name     : 'primary',
            dataIndex: 'primary',
            renderer: function(v,m, r){
                var p = v ?  'primary-group' : 'non-primary-group';
                m.css = '{0} {1} {2}'.format(m.css,'task-group', p);
                return 'primary';
            }
        },
        {
            name    : 'remove',
            xtype   : 'actioncolumn',
            icon    : 'resources/img/minus-16.png',
            iconCls : 'x-hidden',
            sortable: false,
            resizable : false,
            tooltip : 'Remove group from task',
            width   : 30,
            menuDisabled : true,
            handler : 'onRemoveGroup'
        }
    ],

    setValues : function(groups){
        this.store.add(groups);
        return this;
    },

    getValues : function(){
        var g =  Ext.Array.pluck(this.store.data.items, 'data');
        return Ext.Array.pluck(g, 'id');
    },

    getPrimaryGroup : function(){
        var g =  Ext.Array.pluck(this.store.data.items, 'data');

        for(var i = 0; i< g.length; i++){
            if(g[i].primary) {
                return g[i].id;
            }
        }
    },

    setReadOnly : function(b){

    },

    listeners : {
        cellclick : function( g, td, cIdx, r, tr, rIdx, e, eOpts) {
            var me = this;
            if(this.columns[cIdx].name === 'primary') {
                me.lookupController().onMakeGroupPrimary(r.data, g.store);
            }
        }
    },

    constructor : function(){
        this.store = Ext.create('App.store.GroupStore');
        this.callParent(arguments);
    }



});
