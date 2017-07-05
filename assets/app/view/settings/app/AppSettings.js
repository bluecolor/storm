Ext.define('App.view.settings.app.AppSettings', {
    extend: 'Ext.window.Window',
    xtype: 'appsettings',

    requires  : [
        'App.view.settings.app.AppSettingsController'
    ],

    controller  : 'appsettings',

    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 975,
    height      : 575,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'form',
    title       : 'Application Settings',

    items : [
        {
            xtype : 'form',
            name  : 'settings',
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
                        xtype   : 'button',
                        name    : 'save',
                        tooltip : 'Save',
                        iconCls : 'save',
                        handler : 'onSaveAppSettings',
                        disabled: true
                    }
                ]
            },
            items : [
                {
                    name        : 'mailServer',
                    fieldLabel  : 'Mail Server',
                    xtype       : 'fieldcontainer',
                    reference   : 'MailServer',
                    items       : [
                        {
                            xtype : 'form',
                            layout: 'vbox',
                            items : [
                                {
                                    xtype : 'fieldcontainer',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'start',
                                        align: 'stretch'
                                    },
                                    items : [
                                        {
                                            xtype  : 'textfield',
                                            fieldLabel: 'Host',
                                            labelAlign: 'top',
                                            name   : 'host',
                                            emptyText : 'Host name or ip address',
                                            style : {
                                                paddingRight : '10px',
                                                width : '400px'
                                            },
                                            listeners : {
                                                change : function(me,n){
                                                    me.up('fieldcontainer[name=mailServer]').fireEvent('change',n);
                                                }
                                            }
                                        },
                                        {
                                            name  : 'port',
                                            fieldLabel: 'Port',
                                            labelAlign: 'top',
                                            xtype : 'numberfield',
                                            value    : 25,
                                            minValue : 1,
                                            maxValue : 65535,
                                            style : {
                                                width : '100px'
                                            },
                                            listeners : {
                                                change : function(me,n){
                                                    me.up('fieldcontainer[name=mailServer]').fireEvent('change',n);
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype : 'fieldcontainer',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'start',
                                        align: 'stretch'
                                    },
                                    items : [
                                        {
                                            name  : 'username',
                                            fieldLabel: 'Username',
                                            labelAlign: 'top',
                                            xtype : 'textfield',
                                            emptyText : 'Username',
                                            style : {
                                                paddingRight : '10px',
                                                width : '250px'
                                            },
                                            listeners : {
                                                change : function(me,n){
                                                    me.up('fieldcontainer[name=mailServer]').fireEvent('change',n);
                                                }
                                            }
                                        },
                                        {
                                            name  : 'password',
                                            fieldLabel: 'Password',
                                            labelAlign: 'top',
                                            xtype : 'textfield',
                                            inputType : 'password',
                                            emptyText : 'Password',
                                            style : {
                                                width : '250px'
                                            },
                                            listeners : {
                                                change : function(me,n){
                                                    me.up('fieldcontainer[name=mailServer]').fireEvent('change',n);
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'button',
                                    text : 'Test',
                                    handler: 'onTestMailServer'
                                }
                            ]
                        }
                    ],
                    listeners   : {
                        'change' : function(){
                            var me = this;
                            me.up('form').fireEvent('change');
                        }
                    },
                    getValues   : function(){
                        var me = this;
                        return {
                            host : me.down('[name=host]').getValue(),
                            port : me.down('[name=port]').getValue(),
                            username : me.down('[name=username]').getValue(),
                            password : me.down('[name=password]').getValue()
                        }
                    }
                }
            ],

            listeners : {
                change : function(me){
                    this.down('[name=tbar] button[name=save]').setDisabled();
                }
            }
        }
    ],



    getValues : function(){
        var confs,me= this;

        confs = [
            {
                parameter: Constants.AppConfParam.MAIL_SERVER,
                value    : me.getMailServer()
            }
        ];
        return confs;
    },

    getMailServer: function(){
        return this.down('[name=mailServer]').getValues();
    },


    setValues: function(confs){

        if(_.isEmpty(confs)){
            return this;
        }

        var ms = _.find(confs,{parameter:Constants.AppConfParam.MAIL_SERVER});

        if(ms){
            this.setMailServer(ms.value);
        }

        return this;
    },

    setMailServer: function(conf){
        var ms = this.down('[name=mailServer]');
        ms.down('[name=host]').setValue(conf.host);
        ms.down('[name=port]').setValue(conf.port);
        ms.down('[name=username]').setValue(conf.username);
        ms.down('[name=password]').setValue(conf.password);
        return this;
    },


    display : function(confs){
        return this.setValues(confs).show();
    }

});
