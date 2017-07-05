Ext.define('App.view.profile.Profile',{
    extend: 'Ext.window.Window',
    xtype : 'profile',

    width : 400,
    height: 250,

    modal       : true,
    collapsible : false,
    maximizable : false,
    layout      : 'form',
    closeAction : 'destroy',
    title       : 'Profile',
    bodyPadding : 10,

    items : [
        {
            xtype: 'displayfield',
            fieldLabel: 'Name',
            name: 'name'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Username',
            name: 'username'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Email',
            name: 'email'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Role',
            name: 'role'
        }
    ],

    constructor: function(){
        this.callParent(arguments);
        this.down('[name=name]').setValue(App.lib.User.name);
        this.down('[name=username]').setValue(App.lib.User.username);
        this.down('[name=email]').setValue(App.lib.User.email);
        this.down('[name=role]').setValue(App.lib.User.role);
    }

});