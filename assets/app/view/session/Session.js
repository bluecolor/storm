Ext.define('App.view.session.Session',{
    extend  : 'Ext.window.Window',
    xtype   : 'session',

    requires  : [
        'App.view.session.SessionController',
        'App.view.session.SessionModel'
    ],

    controller  : 'session',
    viewModel   : 'session',

    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    height      : 500,
    width       : 500,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'form',
    title       : 'Session',

    //tbar : {
    //    name : 'tbar',
    //    items: [
    //        {
    //            name    : 'save',
    //            tooltip : 'Save',
    //            iconCls : 'save',
    //            handler : 'onSaveSession',
    //            formBind: true
    //        }
    //    ]
    //},

    defaults    : {
        anchor     : '100%',
        labelAlign : 'left'
    },

    items: [
        {
            xtype: 'hidden',
            name : 'id'
        },
        {
            name        : 'name',
            xtype       : 'displayfield',
            fieldLabel  : 'Name',
            flex        : 1
        },
        {
            name      : 'date',
            xtype     : 'displayfield',
            fieldLabel: 'Schedule Date',
            flex      : 1
        },
        {
            name        : 'startDate',
            xtype       : 'displayfield',
            fieldLabel  : 'Start Date'
        },
        {
            name        : 'endDate',
            xtype       : 'displayfield',
            fieldLabel  : 'End Date'
        },
        {
            name        : 'parallel',
            xtype       : 'displayfield',
            fieldLabel  : 'Parallel'
        }
    ],

    setReadOnly : function(b){
        b = b==undefined ? true:b;

        this.down('[name=parallel]').setReadOnly(b);
        return this;
    },

    setValues : function(s){
        this.down('[name=name]').setValue(s.name);
        this.down('[name=date]').setValue(s.date);
        this.down('[name=parallel]').setValue(s.parallel);
        this.down('[name=startDate]').setValue(s.startDate);
        this.down('[name=endDate]').setValue(s.endDate);
        return this;
    },

    view : function(s){
        return this.setValues(s)
            .setReadOnly()
            .show()
            .setTitle('Session {}'.format(s.name));
    }
});