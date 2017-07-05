Ext.define('App.view.task.TaskDetail',{
    extend  : 'Ext.form.Panel',
    xtype   : 'taskdetail',

    requires: [
        'App.view.widget.BootstrapToggle',
        'App.view.widget.DateTimeField',
        'App.view.widget.clockpicker.ClockPicker'
    ],

    defaults    : {
        xtype      : 'textfield',
        anchor     : '100%',
        labelAlign : 'left'
    },

    items : [
        {
            xtype: 'hidden',
            name : 'id'
        },
        {
            xtype       : 'textfield',
            fieldLabel  : 'Name',
            name        : 'name',
            allowBlank  : false
        },
        {
            xtype       : 'combo',
            editable    : false,
            readOnly    : true,
            fieldLabel  : 'Plan',
            name        : 'plan',
            displayField: 'name',
            valueField  : 'id',
            queryMode   : 'local',
            bind        : {store : '{plans}'}
        },
        {
            fieldLabel  : 'Connection',
            xtype       : 'combo',
            queryMode   : 'local',
            name        : 'connection',
            bind        : {store:'{connections}'},
            valueField  : 'id',
            displayField: 'name',
            editable    : false,
            flex        : 1,
            listeners   : {
                afterrender : function(){
                    this.setValue(Util.getConnectionBySch());
                }
            }
        },
        {
            xtype       : 'numberfield',
            name        : 'retryCount',
            fieldLabel  : 'Retry Count',
            required    : true,
            allowBlank  : false,
            value       : 1,
            minValue    : 0,
            maxValue    : 64
        },
        {
            fieldLabel  : 'Start After',
            name        : 'startAfter',
            xtype       : 'fieldcontainer',
            layout      : 'hbox',
            items       : [
                {
                    xtype : 'clockpicker',
                    flex  : 1
                },
                {
                    xtype  : 'button',
                    iconCls: 'broom',
                    style  : {
                        borderLeft  : 0,
                        borderRadius: 0,
                        borderColor : "#CECECE",
                        backgroundColor: 'white'
                    },
                    handler: function(){
                        this.up('fieldcontainer').down('clockpicker').setValue('');
                    }
                }

            ],
            getValue: function(){
                return this.down('clockpicker').getValue();
            },
            setValue: function(v){
                return this.down('clockpicker').setValue(v);
            }
        },
        {
            fieldLabel  : 'Mask',
            name        : 'mask',
            xtype       : 'textfield'
        },
        {
            xtype       : 'numberfield',
            name        : 'order',
            fieldLabel  : 'Order',
            required    : true,
            allowBlank  : false,
            value       : 10,
            minValue    : 0,
            maxValue    : 99999999999999
        },
        {
            xtype   : 'checkboxgroup',
            columns : 1,
            vertical: true,
            fieldLabel: 'Options',
            items   : [
                {boxLabel: 'Active'  , name: 'active'  , inputValue: true, checked:true},
                {boxLabel: 'Excluded', name: 'excluded', inputValue: true},
                {boxLabel: 'Critical', name: 'critical', inputValue: true},
                {boxLabel: 'Restartable', name: 'restartable', inputValue: true, checked:true}
            ]
        },
        {
            name        : 'description',
            fieldLabel  : 'Description',
            xtype       : 'textarea'
        }

    ],

    setPlan : function(plan){
        this.down('combo[name=plan]').setValue(plan);
    },

    getValues : function(){
        var me= this,
            v = {
            id          : this.down('[name=id]').getValue(),
            name        : this.down('[name=name]').getValue(),
            plan        : this.down('[name=plan]').getValue(),
            active      : this.down('[name=active]').getValue(),
            retryCount  : this.down('[name=retryCount]').getValue(),
            critical    : this.down('[name=critical]').getValue(),
            excluded    : this.down('[name=excluded]').getValue(),
            startAfter  : this.down('[name=startAfter]').getValue(),
            mask        : this.down('[name=mask]').getValue(),
            restartable : this.down('[name=restartable]').getValue(),
            order       : this.down('[name=order]').getValue(),
            description : this.down('[name=description]').getValue(),
            connection  : this.down('[name=connection]').getValue()
        };

        return v;
    },

    setValues : function(v){

        this.down('[name=id]').setValue(v.id);
        this.down('[name=name]').setValue(v.name);
        this.down('[name=plan]').setValue(v.plan.id);
        this.down('[name=active]').setValue(v.active);
        this.down('[name=retryCount]').setValue(v.retryCount);
        this.down('[name=critical]').setValue(v.critical);
        this.down('[name=excluded]').setValue(v.excluded);
        this.down('[name=startAfter]').setValue(v.startAfter);
        this.down('[name=mask]').setValue(v.mask);
        this.down('[name=restartable]').setValue(v.restartable);
        this.down('[name=order]').setValue(v.order);
        this.down('[name=description]').setValue(v.description);
        this.down('[name=connection]').setValue(v.connection.id);

        return this;
    },

    setReadOnly : function(b){
        var items = this.items.items;
        _.each(items,function(i){
            try{
                i.setReadOnly(b);
            }catch(e){}
        });
    }
    

});
