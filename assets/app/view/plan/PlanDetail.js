Ext.define('App.view.plan.PlanDetail', {

    extend  : 'Ext.form.Panel',
    xtype   : 'plandetail',

    requires: [
        'App.view.widget.BootstrapToggle',
        'App.view.schexp.ScheduleExpression'
    ],

    reference   : 'PlanDetail',

    bodyPadding : 10,

    fieldDefaults: {
        labelWidth : 175,
        anchor     : '100%',
        labelAlign : 'left'
    },

    tbar : {
        name  : 'tbar',
        items : [
            {
                iconCls : 'menu',
                tooltip : 'Sidebar',
                enableToggle: true,
                pressed: false,
                toggleHandler : 'onSideMenuToggle'
            },
            {
                name    : 'save',
                tooltip : 'Save',
                iconCls : 'save',
                handler : 'onSavePlan',
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
            fieldLabel  : 'Name',
            xtype       : 'textfield',
            name        : 'name',
            validateOnChange : true,
            allowBlank  : false,
            flex        : 1
        },
        {
            fieldLabel  : 'Schedule',
            xtype       : 'fieldcontainer',
            layout      : 'hbox',
            items       : [
                {
                    flex        : 1,

                    xtype       : 'textfield',
                    // value       : '0 0 0 1/1 * ? * 0',
                    name        : 'schedule',
                    allowBlank  : false
                },
                {
                    xtype  : 'button',
                    iconCls: 'help',
                    style  : {
                        borderLeft  : 0,
                        borderRadius: 0,
                        borderColor : "#CECECE",
                        backgroundColor: 'white'
                    },
                    handler: function(){
                        this.lookupController().fireEvent('scheduleexpression');
                    }
                }

            ]
        },
        {
            fieldLabel  : 'Parallel',
            xtype       : 'numberfield',
            name        : 'parallel',
            flex        : 1
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
            xtype   : 'checkboxgroup',
            columns : 1,
            vertical: true,
            fieldLabel: 'Options',
            name : 'options',
            items   : [
                {
                    boxLabel    : 'Active',
                    name        : 'active',
                    inputValue  : true,
                    disabled    : true
                },
                {
                    boxLabel    : 'Protected',
                    name        : 'protected',
                    inputValue  : true,
                    checked     :true
                }
            ]
        },


        {
            emptyText   : 'Description',
            name        : 'description',
            xtype       : 'textarea',
            flex        : 1,
            padding     : '20px 0'
        }
    ],

    getValues : function(){
        var schedulerId = this.up('plan').schedulerId,
            v = {
            id          : undefined,
            name        : undefined,
            schedule    : undefined,
            parallel    : undefined,
            'protected' : undefined,
            active      : undefined,
            description : undefined,
            connection  : undefined,
            scheduler   : Session.getSchedulerId()
        };

        if(schedulerId){
            v.scheduler = schedulerId;
        }


        v.id = this.down('[name=id]').getValue();
        v.name = this.down('[name=name]').getValue();
        v.schedule = this.down('[name=schedule]').getValue();
        v.parallel= this.down('[name=parallel]').getValue();
        v['protected'] = this.down('[name=protected]').getValue();
        v.active = this.down('[name=active]').getValue();
        v.description = this.down('[name=description]').getValue();
        v.connection = this.down('[name=connection]').getValue();

        return v;
    },

    setValues : function(v){

        this.down('[name=id]').setValue(v.id);
        this.down('[name=name]').setValue(v.name);
        this.down('[name=schedule]').setValue(v.schedule);
        this.down('[name=parallel]').setValue(v.parallel);
        this.down('[name=protected]').setValue(v['protected']);
        this.down('[name=active]').setValue(v.active);
        this.down('[name=description]').setValue(v.description);
        this.down('[name=connection]').setValue(v.connection);

        return this;
    },

    setReadOnly : function(b){
        var items = this.items.items;
        _.each(items,function(i){
            try{
                i.setReadOnly(b);
            }catch(e){}
        });
        this.down('toolbar[name=tbar]').setVisible(!b);
    },

    clear : function(){
        var me=this,items = me.items.items;
        me.getForm()._record = undefined;
        me.setReadOnly(false);
        _.each(items,function(i){
            try{
                if(i.name == 'options'){
                    i.down('[name=protected]').setValue(true);
                    i.down('[name=active]').setValue(false);
                }else{
                    i.setValue(undefined);
                }

            }catch(e){}
        });
    },



});
