Ext.define('App.view.settings.user.UserTasks',{
    extend : 'App.view.pool.grid.GridWithAction',
    xtype  : 'usertasks',

    requires  : [
        'App.view.pool.column.GearActionColumn',
        'App.view.pool.textfield.SearchTextField'
    ],


    reference : 'UserTasks',
    header    : false,
    columnLines: false,

    emptyText : 'User does not have any task!',

    tbar : {
        name  : 'tbar',
        setReadOnly : function(b){
            this.down('[name=clear]').setVisible(!b);
            this.down('[name=save]').setVisible(!b);
        },
        items : [
            {
                name    : 'back',
                iconCls : 'back',
                tooltip : 'Back to users',
                handler : 'onActivateUserGrid'
            },'-',
            {
                xtype   : 'searchtextfield',
                flex    : 1,
                listeners: {
                    change: function(f,v){
                        this.lookupController().onSearchTask(v);
                    }
                }
            }
        ]
    },

    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name} ({rows.length} Task{[values.rows.length > 1 ? "s" : ""]})',
        hideGroupedHeader: true,
        startCollapsed: true,
        id: 'taskGrouping'
    }],

    viewConfig: {
        markDirty : false,
        mouseOverOutBuffer : false,

        getRowClass : function(r) {
            var active = r.get('active');
            if(!active){
                return 'inactive';
            }
        }
    },

    bind: {
        store: '{userTasks}'
    },


    columns : [
        {
            dataIndex   : 'excluded',
            width       : 24,
            sortable    : false,
            hideable    : false,
            menuDisabled: true,
            renderer  : function(v, m){
                var s = v ? Constants.Status.EXCLUDED : Constants.Status.READY;
                var tag = Constants.Icon.getIconClsByStatus(s);
                m.css=  m.css + ' '+tag+' ';
                m.tdAttr = 'data-qtip="' + s + '"';
            }
        },
        {
            name     : 'scheduler',
            text     : 'Scheduler',
            dataIndex: 'schedulerName'
        },
        {
            name     : 'plan',
            text     : 'Plan',
            dataIndex: 'planName'
        },
        {
            name     : 'name',
            text     : 'Name',
            dataIndex: 'name',
            flex     : 1
        },
        {
            text : 'Predecessors',
            name : 'predecessors',
            dataIndex : 'predecessors',
            align: 'center',
            renderer : function(v,m,r){
                if(_.isEmpty(v)){return 0;}
                m.style = 'cursor:pointer;';
                return v.length;
            }
        }
    ],

    listeners : {
        cellclick : function(g, td, ci, r, tr, ri, e, eo){
            var n = g.getGridColumns()[ci].dataIndex;
            if(n=='predecessors'){
                this.lookupController().fireEvent('displaytaskpredecessors',r.data,e);
            }
        }
    }

});