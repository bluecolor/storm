Ext.define('App.view.settings.password.AppPassword', {
    extend: 'Ext.window.Window',
    xtype: 'apppassword',

    requires  : [
        'App.view.settings.password.AppPasswordController'
    ],

    controller  : 'apppassword',


    modal       : false,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 675,
    height      : 375,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'form',
    title       : 'Change Password',




    items : [
        {
            xtype       : 'form',
            bodyPadding : 10,
            tbar  : {
                name : 'tbar',
                items: [
                    {
                        name    : 'save',
                        tooltip : 'Save',
                        iconCls : 'save',
                        handler : 'onSavePassword',
                        disabled: true,
                        reference: 'SaveButton'
                    }
                ]
            },
            fieldDefaults: {
                frame       : false,
                anchor      : '100%',
                labelAlign  : 'left',
                labelWidth  : 125
            },
            items : [
                {
                    name        : 'currentPassword',
                    fieldLabel  : 'Current Password',
                    xtype       : 'textfield',
                    inputType   : 'password'
                },
                {
                    name        : 'newPassword',
                    fieldLabel  : 'New Password',
                    xtype       : 'textfield',
                    inputType   : 'password',
                    listeners   : {
                        change: function(f, n, o){
                            var rp = this.up('form').down('[name=reNewPassword]');
                            rp.setDisabled(_.isEmpty(n) || n == o)
                        }
                    }
                },
                {
                    name        : 'reNewPassword',
                    fieldLabel  : 'Re-New Password',
                    xtype       : 'textfield',
                    inputType   : 'password',
                    disabled    : true,
                    listeners   : {
                        change: function(f, n, o){
                            var np = this.up('form').down('[name=newPassword]');
                            var color = np.getValue() === n ? 'black' : 'red';
                            $("#{0}-inputEl".format(f.getId())).css('color',color);
                        }
                    }
                }
            ]
        }
    ],

    getValues: function(){

        var me = this,
            cp = me.down('[name=currentPassword]').getValue(),
            np = me.down('[name=newPassword]').getValue(),
            rp = me.down('[name=reNewPassword]').getValue();

        return {
            currentPassword : cp,
            newPassword     : np,
            reNewPassword   : rp
        };
    },

    constructor : function(){
        var me = this;
        me.callParent(arguments);
        var np = me.down('[name=newPassword]'),
            rp = me.down('[name=reNewPassword]'),
            sb = me.down('button[name=save]');

        var isValid = function(){
            var npv= np.getValue(),
                rpv= rp.getValue();
            sb.setDisabled(npv!=rpv || _.isEmpty(npv) || _.isEmpty(rpv));
        };
        np.on('change',isValid);
        rp.on('change',isValid);
    }
});
