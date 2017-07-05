Ext.define('App.view.intercept.NoGroupIntercept',{
    extend: 'Ext.window.Window',
    xtype : 'nogroupintercept',

    requires: [
        'App.view.intercept.NoGroupInterceptController'
    ],

    controller  : 'nogroupintercept',

    modal       : true,
    collapsible : false,
    animCollapse: false,
    maximizable : false,
    width       : 415,
    height      : 175,
    bodyPadding : 20,
    title       : 'Warning!',

    layout  : {
        type : 'vbox',
        pack : 'center',
        align: 'left'
    },

    items   : [
        {
            xtype   : 'displayfield',
            name    : 'message',
            fieldCls: 'emph'
        }
    ],

    display: function(schId){
        var sch = undefined;
        if(schId){
            sch = Ext.getStore(Constants.Store.SCHEDULER).getById(schId).data;
        }else{
            sch = App.lib.Session.getScheduler()
        }
        var msg =
            '{} does not have any groups! Create a group first'.format(sch.name);
        this.down('[name=message]').setValue(msg);
        return this.show();
    },

    bbar: {
        name    : 'bbar',
        items   : [
            '->',
            {
                text    : 'Create Group',
                handler : 'onCreateGroup'
            },
            {
                text    : 'Cancel',
                handler : function(){
                    this.up('window').close();
                }
            }
        ]
    }




});