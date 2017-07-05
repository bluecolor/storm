Ext.define('App.view.settings.options.Options', {
    extend: 'Ext.window.Window',
    xtype: 'options',

    requires  : [
        'App.view.settings.options.OptionsController',
        'App.view.settings.options.OptionsModel',
        'App.view.widget.SchedulerPlanSelection'
    ],

    controller  : 'options',

    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 975,
    height      : 575,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'form',
    title       : 'Options',

    viewModel   : 'options',


    items : [
        {
            xtype : 'form',
            bodyPadding : 10,
            fieldDefaults : {
                labelWidth : 175
            },
            defaults : {
                padding : '0 0 20px 0'
            },
            tbar  : {
                name : 'tbar',
                items: [
                    {
                        name    : 'save',
                        tooltip : 'Save',
                        iconCls : 'save',
                        handler : 'onSaveOptions',
                        disabled: true,
                        reference: 'SaveButton'
                    }
                ]
            },
            items : [
                {
                    xtype: 'schedulerplanselection',
                    name : 'schedulerPlan',
                    fieldLabel : 'Scheduler Plan',
                    listeners: {
                        'change': 'changeOptions'
                    }
                },
                {
                    xtype : 'menuseparator',
                    width : '100%'
                },
                {
                    name        : 'desktopNotifications',
                    xtype       : 'checkboxgroup',
                    fieldLabel  : 'Desktop Notifications',
                    columns     : 2,
                    items: [
                        {boxLabel: 'Task status warning'    , name: 'taskStatusWarn'},
                        {boxLabel: 'New plan started'       , name: 'planStart',    disabled:true},
                        {boxLabel: 'Plan completed'         , name: 'planComplete', disabled : true},
                        {boxLabel: 'Plan duration exceeded' , name: 'planDurationExceeded',disabled:true},
                        {boxLabel: 'Task duration exceeded' , name: 'taskDurationExceeded', disabled:true}
                    ]
                },
                {
                    xtype : 'menuseparator',
                    width : '100%'
                }
            ]
        }

    ],

    listeners : {
        add : function (c, i) {
            if (i.xtype == 'bordersplitter') {
                i.width = Constants.UI.borderSplitter.size;
            }
        }
    },

    display : function(){
        return this.show().setValues(User.options);
    },

    getValues: function(){
        var o = {};

        o.schPlan = this.down('schedulerplanselection').getValue();
        o.deno = this.down('[name=desktopNotifications]').getValue();

        return o;
    },

    setValues: function(o){

        _.forOwn(o.deno,function(v,k){
            o[k] = (v === 'on' ? true:false);
        });

        this.down('schedulerplanselection').setValue(o.schPlan);
        this.down('[name=desktopNotifications]').setValue(o.deno);
        return this;
    }

});
