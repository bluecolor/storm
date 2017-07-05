Ext.define('App.view.task.TaskPredecessors',{
    extend  : 'App.view.pool.list.BasicList',
    xtype   : 'taskpredecessors',

    requires: [

    ],

    reference : 'TaskPredecessors',
    name : 'taskPredecessors',

    columns : [
        {
            name      : 'name',
            dataIndex : 'name',
            flex      : 1
        },
        {
            name    : 'exclude',
            xtype   : 'actioncolumn',
            icon    : 'resources/img/excluded-16.png',
            sortable: false,
            resizable : false,
            width   : 30,
            dataIndex : 'excluded',
            menuDisabled : true,
            tooltip : 'Exclude task',
            renderer: function(v, m){
                this.iconCls = v ? 'static' : 'x-hidden';
            },
            handler : function(g, ri, ci,i ,e, r){
                this.lookupController().onSetExcluded(!r.data.excluded,[r.data.id]);
            }
        },
        {
            name    : 'remove',
            xtype   : 'actioncolumn',
            icon    : 'resources/img/minus-16.png',
            iconCls : 'x-hidden',
            sortable: false,
            resizable : false,
            width   : 30,
            menuDisabled : true,
            tooltip : 'Remove from predecessors',
            handler : function(g, ri, ci,i ,e, r){
                this.lookupController().onRemovePredecessor([r.data.id]);
            }
        }

    ],

    getValues : function(){
        var me = this,
            items = _.map(me.store.data.items,'data');
        var map = function(t){
            return {id:t.id, excluded : t.excluded};
        };
        return _.map(items,map);
    },

    setValues : function(p){
        this.store.add(p);
        return this;
    },

    setReadOnly : function(b){

    },

    constructor : function(){
        this.store = Ext.create('App.store.TaskStore');
        this.callParent(arguments);
    }







});
