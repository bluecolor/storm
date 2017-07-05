Ext.define('App.view.taskinstance.TaskInstanceDetail',{
    extend: 'Ext.form.Panel',
    xtype: 'taskinstancedetail',

    requires: [
        'App.view.widget.clockpicker.ClockPicker'
    ],

    defaults    : {
        xtype      : 'textfield',
        anchor     : '100%',
        labelAlign : 'left'
    },

    reference: 'TaskInstanceDetail',

    items: [
        {
            reference: 'taskInstanceId',
            xtype: 'hidden',
            name : 'id'
        },
        {
            xtype: 'hidden',
            name : 'taskId'
        },
        {
            xtype       : 'textfield',
            fieldLabel  : 'Name',
            name        : 'name',
            readOnly    : true
        },
        {
            xtype       : 'combo',
            readOnly    : true,
            fieldLabel  : 'Plan',
            name        : 'plan',
            displayField: 'name',
            valueField  : 'id',
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
                beforerender : function(){
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
            xtype   : 'checkboxgroup',
            columns : 1,
            vertical: true,
            fieldLabel: 'Options',
            items   : [
                {boxLabel: 'Excluded', name: 'excluded', inputValue: true},
                {boxLabel: 'Critical', name: 'critical', inputValue: true},
                {boxLabel: 'Restartable', name: 'restartable', inputValue: true}
            ]
        }
    ],

    setReadOnly : function(b){
        var items = this.items.items;
        _.each(items,function(i){
            try{
                if (_.isFunction(i.setReadOnly)){
                    i.setReadOnly(b);
                }
            }catch(e){console.log(e);}
        });
    },

    setValues : function(v){

        this.down('[name=id]').setValue(v.id);
        this.down('[name=name]').setValue(v.name);
        this.down('[name=plan]').setValue(v.plan.id);
        this.down('[name=retryCount]').setValue(v.retryCount);
        this.down('[name=critical]').setValue(v.critical);
        this.down('[name=excluded]').setValue(v.excluded);
        this.down('[name=startAfter]').setValue(v.startAfter);
        this.down('[name=restartable]').setValue(v.restartable);
        this.down('[name=order]').setValue(v.order);
        this.down('[name=connection]').setValue(v.connection);

        return this;
    },

    getValues: function(){

        return {
            id          : this.down('[name=id]').getValue(),
            retryCount  : this.down('[name=retryCount]').getValue(),
            critical    : this.down('[name=critical]').getValue(),
            startAfter  : this.down('[name=startAfter]').getValue(),
            restartable : this.down('[name=restartable]').getValue(),
            taskOrder   : this.down('[name=order]').getValue(),
            connection  : this.down('[name=connection]').getValue()
        };
    }
    
});