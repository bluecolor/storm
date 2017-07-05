Ext.define('App.view.navbar.AccountMenu',{
    extend: 'Ext.menu.Menu',
    xtype : 'accountmenu',

    title : false,
    border: false,
    resizable: false,
    width : 300,
    height: 200,

    layout: {
        type    : 'vbox',
        pack    : 'start',
        align   : 'stretch'
    },

    items: [
        {
            xtype : 'container',
            layout: {
                type    : 'vbox',
                pack    : 'start',
                align   : 'stretch'
            },
            items : [
                {
                    xtype : 'container',
                    layout: {
                        type    : 'hbox',
                        pack    : 'start',
                        align   : 'stretch'
                    },
                    items: [
                        {
                            padding : '30 20 30 20',
                            xtype: 'image',
                            src  : 'resources/img/dummy-profile-photo.png',
                            width : 120,
                            cls : 'account-menu-photo'
                        },
                        {
                            padding : '30 0',
                            xtype   : 'fieldcontainer',
                            layout  : 'vbox',
                            items   : [
                                {
                                    xtype: 'displayfield',
                                    name : 'name',
                                    fieldCls  : 'account-menu-name',
                                    value: 'Ceyhun Kerti'
                                },
                                {
                                    xtype: 'displayfield',
                                    name : 'email',
                                    cls  : 'account-menu-email',
                                    value: 'ceyhun.kerti@gmail.com'
                                },
                                {
                                    xtype: 'button',
                                    flex : 1,
                                    text : 'View Profile',
                                    scale: 'medium',
                                    cls  : 'btn-profile',
                                    handler: function(){
                                        Ext.create('App.view.profile.Profile').show();
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype  : 'container',
                    padding: '0 20 20 20',
                    items  : [
                        {
                            xtype: 'button',
                            scale: 'medium',
                            text : 'Sign Out',
                            cls  : 'btn-sign-out',
                            handler: function(){
                                window.location = 'logout';
                            }
                        }
                    ]

                }
            ]
        }
    ],

    listeners: {
        beforerender: function(){
            var name = App.lib.User.getName(),
                email= App.lib.User.getEmail();
            this.down('displayfield[name=name]').setValue(name);
            this.down('displayfield[name=email]').setValue(email);
        }
    }




});