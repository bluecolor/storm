Ext.define('App.view.settings.connection.ConnectionDetail',{
    extend : 'Ext.form.Panel',
    xtype  : 'connectiondetail',

    bodyPadding : 10,
    frame       : false,
    overflowY   : 'auto',

    fieldDefaults: {
        frame       : false,
        anchor      : '100%',
        labelAlign  : 'left',
        labelWidth  : 125
    },

    reference : 'ConnectionDetail',

    tbar : {
        name  : 'tbar',
        items : [
            {
                iconCls : 'menu',
                tooltip : 'Sidebar',
                enableToggle: true,
                pressed : true,
                toggleHandler : 'onSideMenuToggle'
            },
            {
                name    : 'test',
                tooltip : 'Test',
                iconCls : 'test-tube',
                handler : 'onTestConnection',
                formBind: true
            },
            {
                name    : 'save',
                tooltip : 'Save',
                iconCls : 'save',
                handler : 'onSaveConnection',
                formBind: true
            }
        ]
    },

    items : [
        {
            xtype : 'hidden',
            name  : 'id'
        },
        {
            name  : 'connectionType' ,
            xtype : 'combo',
            editable     : false,
            fieldLabel   : 'Connection Type',
            displayField : 'name',
            valueField   : 'name',
            bind         : '{connectionType}',
            defaultValue : 'SSH',
            store : {
                xtype : 'store',
                fields: [{name:'name', type:'string'}],
                data  : [{name:'SSH'},{name:'DB'},{name:'Local'}]
            },
            listeners : {
                change: function(c, v){
                    this.lookupController().onConnectionType(v);
                }
            }
        },
        {
            name        : 'name',
            xtype       : 'textfield',
            fieldLabel  : 'Connection Name',
            allowBlank  : false
        },
        {
            xtype       : 'textfield',
            name        : 'username',
            fieldLabel  : 'Username'
        },
        {
            xtype       : 'textfield',
            name        : 'password',
            fieldLabel  : 'Password',
            inputType   : 'password'
        },
        {
            xtype       : 'textfield',
            name        : 'url',
            fieldLabel  : 'URL',
            allowBlank  : false,
            bind : {
                emptyText : '{urlEmptyText}',
                fieldLabel: '{urlLabel}'
            },
            setEmptyText: function(t) {
                this.emptyText = t;
                this.applyEmptyText();
            }
        },
        {
            xtype       : 'numberfield',
            name        : 'port',
            fieldLabel  : 'Port',
            maxValue    : 65535,
            minValue    : 1,
            value  : 22,
            defaultValue : 22,
            bind : {
                hidden : '{portHidden}'
            }
        }
    ],

    clear :function(){
        this.getForm()._record = undefined;
        var items =this.getForm().getFields().items;
        _.each(items, function(f){
            f.setValue(f.defaultValue);
        });
        this.setReadOnly(false);
        return this;
    },

    setReadOnly : function(b) {
        this.down('toolbar[name=tbar] [name=save]').setVisible (!b);
        var items =this.getForm().getFields().items;
        _.each(items, function(f){
            f.setReadOnly(b);
        });
        return this;
    },
    getValues : function() {
        var con = {
            connectionType : undefined,
            id       : undefined,
            name     : undefined,
            username : undefined,
            password : undefined,
            url      : undefined,
            port     : undefined
        };

        con.id = this.down('[name=id]').getValue();
        con.name = this.down('[name=name]').getValue();
        con.username = this.down('[name=username]').getValue();
        con.password = this.down('[name=password]').getValue();
        con.url  = this.down('[name=url]').getValue();
        con.port  = this.down('[name=port]').getValue();
        con.connectionType  = this.down('[name=connectionType]').getValue();

        return con;
    },
    setValues : function(c){
        this.down('[name=id]').setValue(c.id);
        this.down('[name=connectionType]').setValue(c.connectionType);
        this.down('[name=name]').setValue(c.name);
        this.down('[name=username]').setValue(c.username);
        this.down('[name=password]').setValue(c.password);
        this.down('[name=url]').setValue(c.url);

        return this;
    }

});
