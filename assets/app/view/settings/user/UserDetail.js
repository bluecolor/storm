Ext.define('App.view.settings.user.UserDetail',{
    extend : 'Ext.form.Panel',
    xtype  : 'userdetail',

    requires : [
        'App.view.widget.BootstrapToggle'
    ],

    reference   : 'UserDetail',
    bodyPadding : 10,
    frame       : false,
    overflowY   : 'auto',

    fieldDefaults: {
        frame       : false,
        anchor      : '100%',
        labelAlign  : 'left',
        labelWidth  : 75
    },

    tbar : {
        name  : 'tbar',
        setReadOnly : function(b){
            this.down('[name=save]').setVisible(!b);
        },
        items : [
            {
                name    : 'back',
                iconCls : 'back',
                tooltip : 'Back to users',
                handler : 'onActivateUserGrid'
            },
            {
                name    : 'save',
                tooltip : 'Save',
                iconCls : 'save',
                formBind: true,
                handler : 'onSaveUser'
            }
        ]
    },

    items : [
        {
            name : 'id',
            xtype: 'hidden'
        },
        {
            name        : 'username',
            xtype       : 'textfield',
            fieldLabel  : 'User Name',
            allowBlank  : false,
            vtype       : 'alphanum'
        },
        {
            name        : 'name',
            xtype       : 'textfield',
            fieldLabel  : 'Name',
            allowBlank  : false
        },
        {
            xtype       : 'textfield',
            name        : 'email',
            fieldLabel  : 'Email',
            vtype       : 'email',
            allowBlank  : false
        },
        {
            xtype : 'combo',
            name  : 'superUser',
            hidden: true,
            fieldLabel   : 'Super User',
            displayField : 'name',
            valueField   : 'val',
            value : false,
            store : {
                fields: [
                    {name:'name',type:'string'},
                    {name:'val',type:'boolean'}
                ],
                data  : [
                    {name:'Yes', val: true },
                    {name:'No',  val: false}
                ]
            },
            listeners: {
                select: function(c,r){
                    this.lookupController().onSetRoleVisible(!r.get('val'));
                }
            }
        },
        {
            xtype : 'combo',
            reference: 'Role',
            name  : 'role' ,
            fieldLabel   : 'Role',
            displayField : 'name',
            valueField   : 'name',
            value : 'GUEST',
            editable: false,
            store : {
                fields: [{name:'name', type:'string'}],
                data  : [{name:'ADMIN'},{name:'OPER'},{name:'GUEST'}]
            }
        },
        {
            xtype  : 'bootstraptoggle',
            name   : 'active',
            onText : 'Yes',
            offText: 'No',
            fieldLabel : 'Is Active?'
        }
    ],

    getValues : function() {
        var user = {
            id       : undefined,
            username : undefined,
            name     : undefined,
            password : undefined,
            email    : undefined,
            role     : undefined,
            active   : true,
            superUser: false
        };

        user.id = this.down('[name=id]').getValue();
        user.username = this.down('[name=username]').getValue();
        user.name = this.down('[name=name]').getValue();
        user.email = this.down('[name=email]').getValue();
        user.role = this.down('[name=role]').getValue();
        user.active = this.down('[name=active]').getValue();
        user.superUser = this.down('[name=superUser]').getValue();
        return user;
    },

    setValues : function(user) {

        this.down('[name=superUser]').setVisible(user.superUser);

        this.down('[name=id]').setValue(user.id);
        this.down('[name=username]').setValue(user.username);
        this.down('[name=name]').setValue(user.name);
        this.down('[name=email]').setValue(user.email);
        this.down('[name=role]').setValue(user.role);
        this.down('[name=active]').setValue(user.active);
        this.down('[name=superUser]').setValue(user.superUser);

        return this;
    },

    clear :function(){
        this.getForm()._record = undefined;
        Ext.each(this.getForm().getFields().items, function(field){
            field.setValue('');
        });
        this.down('[name=role]').setValue('GUEST');
        this.down('[name=superUser]').setValue(false);

        return this;
    },

    setReadOnly : function(b) {
        var user = this.getValues();
        var isSu = user && user.superUser;

        b = b==undefined ? true : b;
        b = isSu ? true : b;

        this.down('toolbar[name=tbar]').setReadOnly(b);
        Ext.each(this.getForm().getFields().items, function(field){
            field.setReadOnly(b);
        });

        if(b && isSu){
            this.down('[name=email]').setReadOnly(false);
        }

        this.down('[name=superUser]').setVisible(isSu);

        this.down('bootstraptoggle[name=active]').setReadOnly(!isSu ? b:true);

        return this;
    },

    create : function(){
        this.clear().setReadOnly(false);
    }


});
