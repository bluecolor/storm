Ext.define('App.view.group.GroupList',{
    extend  : 'App.view.pool.grid.GridWithAction',
    xtype   : 'grouplist',

    requires: [
        'App.view.pool.textfield.SearchTextField'
    ],

    reference : 'GroupList',

    bind : {
        store : '{groups}'
    },

    enableColumnHide:false,
    columnLines : false,
    rowLines    : false,
    hideHeaders : true,

    tbar : {
        name : 'tbar',
        items: [
            {
                xtype   : 'searchtextfield',
                name    : 'search',
                flex    : 1,
                listeners : {
                    change : function(t,v){
                        this.lookupController().onSearchGroup(v);
                    }
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
                handler : 'onCreateGroup'
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
            handler : function(g, ri, ci, i ,e, r){
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
            handler : 'onDeleteGroup'
        }
    ],

    listeners : {
        cellclick : function(g, td, c, r){
            this.lookupController().onDisplayGroupView(r.data.id);
        }
    }

});
