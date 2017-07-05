Ext.define('App.view.taskinstance.TaskInstancePredecessors',{
    extend  : 'App.view.pool.list.BasicList',
    xtype   : 'taskinstancepredecessors',


    reference   : 'TaskInstancePredecessors',
    name        : 'taskInstancePredecessors',

    columns : [
        {
            name : 'statusTag',
            dataIndex   : 'status',
            width       : 24,
            sortable    : false,
            hideable    : false,
            menuDisabled: true,
            renderer  : function(v, m,r){
                var e = r.get('excluded'),
                    s = e ? Constants.Status.EXCLUDED:v,
                    tag = Constants.Icon.getIconClsByStatus(s);

                m.style='cursor:pointer';
                m.css=  m.css + ' '+tag+' ';
                m.tdAttr = 'data-qtip="' + s + '"';
            }
        },
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
            return {
                id:t.id,
                excluded : t.excluded,
                task: t.task?t.task.id:undefined
            };
        };
        return _.map(items,map);
    },

    setValues : function(p){
        this.store.loadRawData(p);
        return this;
    },

    setReadOnly : function(b){

    },

    constructor: function(){
        this.store = Ext.create('Ext.data.Store',{
            autoLoad: false,
            model   : 'App.model.TaskInstanceModel'
        });
        this.callParent(arguments);
    }


});
