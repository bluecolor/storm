Ext.define('App.view.settings.user.UserGrid',{
    extend : 'App.view.pool.grid.GridWithAction',
    xtype  : 'usergrid',

    requires: [
        'App.view.pool.textfield.SearchTextField'
    ],

    enableColumnHide:false,
    columnLines : false,
    rowLines    : false,

    bind: {
        store: '{users}'
    },


    tbar : [
        {
            xtype  : 'button',
            iconCls: 'plus',
            tooltip: 'New user',
            handler: 'onCreateUser'
        },
        {
            iconCls : 'reload',
            name    : 'reload',
            handler : 'onReloadUsers'
        },'-',
        {
            xtype : 'searchtextfield',
            name  : 'search',
            flex  : 1,
            listeners : {
                change : 'onSearchUsers'
            }
        }
    ],

    viewConfig  : {
        markDirty : false,
        mouseOverOutBuffer : false,
        getRowClass : function(r) {
            var su = r.get('superUser');
            if(su){
                return 'super-user';
            }
        }
    },


    columns : [

        {
            name    : 'detail',
            xtype   : 'actioncolumn',
            iconCls : 'x-hidden',
            icon    : 'resources/img/details-16.png',
            sortable: false,
            resizable : false,
            width   : 30,
            menuDisabled : true,
            handler : function(g, ri, ci,i ,e, r){
                this.lookupController().onViewUser(r.data);
            }
        },
        {
            name    : 'tasks',
            xtype   : 'actioncolumn',
            iconCls : 'x-hidden',
            tooltip : 'User tasks',
            icon    : 'resources/img/barcode-16.png',
            sortable: false,
            resizable : false,
            width   : 30,
            menuDisabled : true,
            handler : function(g, ri, ci,i ,e, r){
                this.lookupController().onViewUserTasks(r.data.id);
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
                this.lookupController().onEditUser(r.data);
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
                var su = r.get('superUser');
                if(!su){
                    this.lookupController().onDeleteUser(r.get('id'));
                }
            },
            renderer: function(v,m,r){
                var su = r.get('superUser');
                if(su){
                    this.icon = '';
                }else{
                    this.icon = 'resources/img/delete-16.png';
                }
            }
        },
        {
            name      : 'username',
            dataIndex : 'username',
            text      : 'Username',
            flex      : 1
        },
        {
            name      : 'name',
            dataIndex : 'name',
            flex      : 1,
            text      : 'Name'
        },
        {
            name      : 'email',
            dataIndex : 'email',
            flex      : 1,
            text      : 'Email'
        }
    ]/*,


    constructor : function(){
        this.store = Ext.getStore(Constants.Store.USER);
        this.callParent(arguments);
    }*/


});
