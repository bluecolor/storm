Ext.define('App.view.settings.connection.ConnectionList',{
    extend : 'App.view.pool.list.BasicList',
    xtype  : 'connectionlist',

    requires: [
        'App.view.pool.textfield.SearchTextField'
    ],

    reference: 'ConnectionList',

    bind : {
        store : '{connections}'
    },

    tbar : [
        {
            xtype : 'searchtextfield',
            name  : 'search',
            flex  : 1,
            listeners : {
                change : 'onSearchConnection'
            }
        },
        {
            iconCls : 'reload',
            name    : 'reload',
            handler : 'onReloadConnections'
        },
        {
            reference: 'AddConnectionButton',
            xtype  : 'button',
            iconCls: 'plus',
            tooltip: 'New connection',
            handler: 'onDisplayConnectionCreate',
            hidden : !App.lib.User.hasRole(Constants.Role.ADMIN)
        }
    ],


    columns : [
        {
            name        : 'icon',
            dataIndex   : 'connectionType',
            width       : 30,
            renderer : function(v, m, r){
                var img = 'resources/img/';

                switch (v){
                    case Constants.ConnectionType.SSH   :
                        img += Constants.Icon.CONNECTION_SSH;
                        break;
                    case Constants.ConnectionType.DB    :
                        img += Constants.Icon.CONNECTION_JDBC;
                        break;
                    case Constants.ConnectionType.LOCAL :
                        img += Constants.Icon.CONNECTION_LOCAL;
                        break;
                    default :
                        img += Constants.Icon.CONNECTION_LOCAL;
                        break;
                }
                return '<img src="{0}">'.format(img);
            }
        },
        {
            name      : 'name',
            dataIndex : 'name',
            flex      : 1,
            renderer  : function(v, m){
                m.style = "font-weight:bolder;";
                return v;
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
            handler : function(g, ri, ci,i,e, r){
                this.lookupController().onDisplayConnectionEdit(r.data);
            },
            hidden  : !App.lib.User.hasRole(Constants.Role.ADMIN)
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
            handler : function(g, ri, ci,i,e, r){
                this.lookupController().onDeleteConnection(r.data.id);
            },
            hidden  : !App.lib.User.hasRole(Constants.Role.ADMIN)
        }
    ],

    listeners : {
        cellClick : function(g, td, ci, r, tr, ri, e, eo){
            if(ci > 1) { return; }
            this.lookupController().onDisplayConnectionView(r.data);
        }

    }


});
