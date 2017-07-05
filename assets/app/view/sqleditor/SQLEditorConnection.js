Ext.define('App.view.sqleditor.SQLEditorConnection',{
    extend : 'Ext.panel.Panel',
    xtype  : 'sqleditorconnection',
    title  : 'New Connection',
    iconCls: 'disconnected-white',
    layout : 'border',


    connection: undefined,

    requires : [
        'App.view.sqleditor.SQLEditorPage'
    ],


    tbar   : {
        name : 'tbar',
        items: [
            {
                iconCls       : 'menu',
                tooltip       : 'Sidebar',
                enableToggle  : true,
                pressed       : true,
                toggleHandler : 'onSideMenuToggle'
            },'-',
            {
                tooltip : 'Clear',
                iconCls : 'broom',
                name    : 'clear'
            },'-',
            {
                tooltip : 'Run',
                iconCls : 'play',
                name    : 'play'
            },
            '->',
            {
                width    : 300,
                xtype    : 'fieldcontainer',
                layout   : {
                    type : 'hbox',
                    pack : 'start',
                    align: 'center'
                },
                items    : [
                    {
                        xtype       : 'combo',
                        emptyText   : 'Select Connection',
                        flex        : 1,
                        editable    : false,
                        displayField: 'name',
                        valueField  : 'id',
                        queryMode   : 'local',
                        bind        : {
                            store: '{connections}'
                        }
                    },
                    {
                        style  : {
                            borderLeft  : 0,
                            borderRadius: 0,
                            borderColor : "#CECECE",
                            backgroundColor: 'white'
                        },
                        tooltip: 'Test connection',
                        xtype  : 'button',
                        iconCls: 'test-tube',
                        handler: function(){
                            var conId = this.up('fieldcontainer').down('combo').getValue();
                            this.lookupController().onTestConnection(conId);
                        }
                    }
                ]

            }
        ]
    },

    items  : [
        {
            name  : 'pageContainer',
            region: 'center',
            xtype : 'tabpanel',
            tabPosition : 'bottom',
            bodyPadding : 0,
            frame       : false,
            overflowY   : 'auto',
            items : [
                {
                    xtype : 'sqleditorpage'
                },
                {
                    iconCls     : 'plus',
                    name        : 'addPage' ,
                    listeners   : {
                        activate: 'onAddSQLEditorPage'
                    }
                }
            ]
        }
    ],


    getConnection: function(){
        return this.connection;
    },

    disconnect: function(){
        this.setIconCls('disconnected-white');
        this.connection = undefined;
    },

    connect : function(con) {
        this.setTitle(con.name);
        this.setIconCls('connected-white');
        this.connection = con;
    },

    listeners : {
        activate : function(con) {
            if(this.getConnection()){
                con.setIconCls('connected-white');

            }else {
                con.setIconCls('disconnected-white');
            }
        },

        deactivate : function(con) {
            if(this.getConnection()) {
                con.setIconCls('connected');
            } else {
                con.setIconCls('disconnected');
            }
        }
    }
    
});