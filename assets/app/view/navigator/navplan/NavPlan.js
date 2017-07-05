Ext.define('App.view.navigator.navplan.NavPlan',{
    extend  : 'App.view.pool.grid.GridWithAction',
    xtype   : 'navplan',

    requires: [
        'App.view.pool.column.GearActionColumn'
    ],

    iconCls     : 'square-dashed',

    enableColumnHide:false,
    columnLines : false,
    rowLines    : false,
    hideHeaders : true,

    viewConfig  : {
        markDirty : false,
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
                xtype: 'textfield',
                name : 'search',
                flex : 1,
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
                handler : function(){
                    this.lookupController().fireEvent('displayplancreate');
                }
            }
        ]
    },

    columns : [
        {
            name: 'protected',
            dataIndex: 'protected',
            resizable : false,
            width: 30,
            menuDisabled : true,
            renderer: function(v, m){
                if(v){
                    m.css=  m.css + ' shield';
                    m.tdAttr = 'data-qtip="Plan is protected"';
                }else{
                    m.css=  '';
                    m.tdAttr = '';
                }

            }
        },
        {
            name      : 'name',
            dataIndex : 'name',
            flex      : 1
        },
        {
            xtype : 'gearactioncolumn',
            listeners : {
                'actionclick' : 'onNavPlanActionMenu'
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
                this.lookupController().fireEvent('displayplanedit',r.data);
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
                this.lookupController().fireEvent('deleteplan',{id:r.data.id});
            }
        }
    ],


    constructor : function() {
        this.store =  Ext.create('Ext.data.ChainedStore',{
           source :  Ext.getStore(Constants.Store.PLAN)
        });
        this.callParent(arguments);
    },

    listeners : {
        cellclick : 'onSelectPlan'
    }


});
