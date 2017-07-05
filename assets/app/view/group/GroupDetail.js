Ext.define('App.view.group.GroupDetail', {

    extend  : 'Ext.form.Panel',
    xtype   : 'groupdetail',

    requires: [
        'App.view.group.GroupModel',
        'App.view.widget.BootstrapToggle'
    ],

    reference   : 'GroupDetail',

    bodyPadding : 10,

    fieldDefaults: {
        labelWidth : 125,
        anchor     : '100%',
        labelAlign : 'left'
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
            flex        : 1
        },
        {
            fieldLabel: 'Parallel Limit',
            xtype   : 'numberfield',
            name    : 'parallel',
            minValue: 0,
            value   : 1,
            flex    : 1
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
        var schedulerId = this.up('group').schedulerId,
            v = {
            id          : undefined,
            name        : undefined,
            parallel    : undefined,
            description : undefined,
            scheduler   : Session.getSchedulerId()
        };

        if(schedulerId){
            v.scheduler =schedulerId;
        }



        v.id = this.down('[name=id]').getValue();
        v.name = this.down('[name=name]').getValue();
        v.parallel = this.down('[name=parallel]').getValue();
        v.description = this.down('[name=description]').getValue();

        return v;
    },

    setValues : function(v){

        this.down('[name=id]').setValue(v.id);
        this.down('[name=name]').setValue(v.name);
        this.down('[name=parallel]').setValue(v.parallel);
        this.down('[name=description]').setValue(v.description);

        return this;
    },

    setReadOnly : function(b) {
        var me=this,items = me.items.items;
        _.each(items,function(i){
            try{
                i.setReadOnly(b);
            }catch(e){}
        });

        return me;
    },

    clear : function(){
        var me=this,items = me.items.items;
        me.getForm()._record = undefined;
        me.setReadOnly(false);
        _.each(items,function(i){
            try{
                i.setValue(undefined);
            }catch(e){}
        });
    }
});
