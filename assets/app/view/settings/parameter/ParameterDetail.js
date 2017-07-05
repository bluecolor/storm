Ext.define('App.view.settings.parameter.ParameterDetail',{
    extend  : 'Ext.form.Panel',
    xtype   : 'parameterdetail',

    requires: [
        'App.view.pool.combo.SearchCombo',
        'App.view.pool.list.BasicList'
    ],

    bodyPadding : 10,
    frame       : false,
    overflowY   : 'auto',

    fieldDefaults: {
        frame       : false,
        anchor      : '100%',
        labelAlign  : 'left',
        labelWidth  : 75
    },

    reference : 'ParameterDetail',

    tbar  : {
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
                handler : 'onSaveParameter',
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
            xtype       : 'textarea',
            name        : 'value',
            fieldLabel  : 'Value'
        }
    ],

    clear :function(){

        var items = this.getForm().getFields().items;
        this.getForm()._record = undefined;

        _.each(items,function(f){
            f.setValue(f.defaultValue);
        });

        return this;
    },

    setReadOnly : function(b) {
        var items = this.getForm().getFields().items;
        _.each(items, function(f){
            f.setReadOnly(b);
        });

        return this;
    },

    getValues : function() {
        var p = {
            id   : undefined,
            name : undefined,
            value: undefined
        };

        p.id = this.down('[name=id]').getValue();
        p.name = this.down('[name=name]').getValue();
        p.value = this.down('[name=value]').getValue();

        return p;
    },

    setValues : function(p) {

        this.down('[name=id]').setValue(p.id);
        this.down('[name=name]').setValue(p.name);
        this.down('[name=value]').setValue(p.value);

        return this;
    }



});
