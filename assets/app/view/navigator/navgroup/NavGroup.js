Ext.define('App.view.navigator.navgroup.NavGroup',{
    extend  : 'App.view.pool.grid.GridWithAction',
    xtype   : 'navgroup',

    requires: [
        'App.view.navigator.navgroup.NavGroupController',
        'App.view.pool.column.GearActionColumn'
    ],

    controller : 'navgroup',

    iconCls : 'box-filled',

    enableColumnHide:false,
    columnLines : false,
    rowLines    : false,
    hideHeaders : true,

    tbar : {
        name : 'tbar',
        items: [
            {
                xtype   : 'textfield',
                name    : 'search',
                flex    : 1,
                listeners : {
                    change : 'onSearchGroups'
                }
            },
            {
                iconCls : 'reload',
                tooltip : 'Refresh',
                name    : 'reload',
                handler : 'onReloadGroups'
            },
            {
                iconCls : 'plus',
                tooltip : 'Add Plan Template',
                name    : 'add',
                handler : 'onDisplayGroupCreate'
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
            xtype : 'gearactioncolumn',
            listeners : {
                'actionclick' : 'onNavGroupActionMenu'
            }
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
            handler : function(g, ri, ci,i ,e, r){
                this.lookupController().onDisplayGroupEdit(r.data.id);
            }
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
            handler : function(g, ri, ci,i ,e, r){
                this.lookupController().onDeleteGroup(r.data.id);
            }
        }
    ],

    listeners : {
        cellclick : function( g, td, cIdx, r, tr, rIdx, e, eOpts) {

            if(this.columns[cIdx].name === 'name') {
                this.fireEvent('infogroup', r)
            }
        }
    },

    constructor : function(){
        this.store =  Ext.create('Ext.data.ChainedStore',{
            source :  Ext.getStore(Constants.Store.GROUP)
        });
        this.callParent(arguments);
    }


});
