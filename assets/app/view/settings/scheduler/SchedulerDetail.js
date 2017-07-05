Ext.define('App.view.settings.scheduler.SchedulerDetail',{
    extend : 'Ext.form.Panel',
    xtype  : 'schedulerdetail',

    bodyPadding : 10,
    frame       : false,
    overflowY   : 'auto',

    fieldDefaults: {
        frame       : false,
        anchor      : '100%',
        labelAlign  : 'left',
        labelWidth  : 125
    },

    reference : 'SchedulerDetail',

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
                name    : 'save',
                tooltip : 'Save',
                iconCls : 'save',
                handler : 'onSaveScheduler',
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
            xtype       : 'textfield',
            name        : 'name',
            allowBlank  : false,
            fieldLabel  : 'Name'
        },
        {
            xtype       : 'fieldcontainer',
            layout      : 'hbox',
            reference   : 'Connection',
            items       : [
                {
                    xtype       : 'combobox',
                    name        : 'connection' ,
                    editable    : false,
                    fieldLabel  : 'Connection',
                    displayField: 'name',
                    valueField  : 'id',
                    queryMode   : 'local',
                    flex        : 1,
                    allowBlank  : false,
                    bind        :  {
                        store : '{connections}'
                    },
                    listeners : {
                        focus       : 'onConnectionFocus',
                        afterrender : 'onConnectionRender'
                    }
                },
                {
                    tooltip: 'Add Connection',
                    xtype  : 'button',
                    iconCls: 'plus',
                    style  : {
                        borderLeft  : 0,
                        borderRadius: 0,
                        borderColor : "#CECECE",
                        backgroundColor: 'white'
                    },
                    handler: 'onDisplayConnections'
                }
            ]

        }
    ],

    clear :function(){
        var items = this.getForm().getFields().items;

        this.getForm()._record = undefined;
        this.down('textfield[name=name]').setValue('');
        this.down('hidden[name=id]').setValue(undefined);

        return this;
    },

    setReadOnly : function(b) {
        var items = this.getForm().getFields().items;
        b = b == undefined ? true : b;

        this.down('toolbar[name=tbar] [name=save]').setVisible(!b);

        _.each(items, function(f){
            f.setReadOnly(b);
        });

        return this;
    },

    getValues : function() {
        var sch = {
            id   : undefined,
            name : undefined,
            connection  : undefined
        };

        sch.id = this.down('[name=id]').getValue();
        sch.name = this.down('[name=name]').getValue();
        sch.connection = this.down('[name=connection]').getValue();

        return sch;
    },

    setValues : function(s) {

        this.down('[name=id]').setValue(s.id);
        this.down('[name=name]').setValue(s.name);
        this.down('[name=connection]').setValue(s.connection);

        return this;
    }



});
