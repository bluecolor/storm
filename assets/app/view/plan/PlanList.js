Ext.define('App.view.plan.PlanList',{
    extend  : 'App.view.pool.grid.GridWithAction',
    xtype   : 'planlist',

    reference : 'PlanList',

    requires: [
        'App.view.pool.textfield.SearchTextField'
    ],

    iconCls     : 'square-dashed',

    enableColumnHide:false,
    columnLines : false,
    rowLines    : false,
    hideHeaders : true,

    bind : {
        store : '{plans}'
    },

    viewConfig  : {
        markDirty   : false,
        mouseOverOutBuffer : false,
        getRowClass : function(r) {
            var active = r.get('active');
            if(!active){
                return 'inactive';
            }
        }
    },

    tbar : {
        name : 'tbar',
        items: [
            {
                xtype   : 'searchtextfield',
                name    : 'search',
                flex    : 1,
                listeners : {
                    change : 'onSearchPlan'
                }
            },
            {
                iconCls : 'reload',
                tooltip : 'Refresh',
                name    : 'reload',
                handler : 'onReloadPlans'
            },
            {
                iconCls : 'plus',
                tooltip : 'Add Plan',
                name    : 'add',
                handler : 'onCreatePlan'
            }
        ]
    },

    columns : [
        {
            name      : 'name',
            dataIndex : 'name',
            flex      : 1
        },
        {
            name    : 'edit',
            xtype   : 'actioncolumn',
            iconCls : 'x-hidden',
            icon    : 'resources/img/pencil-16.png',
            sortable: false,
            resizable : false,
            width   : 30,
            menuDisabled : true,
            handler : 'onEditPlan'
        },
        {
            name    : 'delete',
            xtype   : 'actioncolumn',
            icon    : 'resources/img/delete-16.png',
            iconCls : 'x-hidden',
            sortable: false,
            resizable : false,
            width   : 30,
            menuDisabled : true,
            handler : 'onDeletePlan'
        }
    ],

    listeners : {
        cellclick : 'onSelectPlan'
    }

});
