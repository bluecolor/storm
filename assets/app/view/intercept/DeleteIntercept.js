Ext.define('App.view.intercept.DeleteIntercept',{
    extend: 'Ext.window.Window',
    xtype : 'deleteintercept',

    requires: [
        'App.view.intercept.DeleteInterceptController'
    ],

    controller: 'deleteintercept',

    modal       : true,
    resizable   : false,
    collapsible : false,
    animCollapse: false,
    maximizable : false,
    width       : 455,
    height      : 300,
    bodyPadding : 20,
    title       : '<span style="color: #F08F90">Are You ABSOLUTELY Sure?</span>',

    baseEvent   : {
        name        : undefined,
        type        : undefined,
        options     : undefined
    },


    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },


    tbar: {
        name : 'tbar',
        style: {
            backgroundColor: '#F8EEC7'
        },
        items: [
            {
                xtype: 'displayfield',
                value: 'Unexpected bad things will happen if you don’t read this!',
                fieldStyle: {
                    color: '#807263'
                }
            }
        ]
    },

    bbar: {
        name    : 'bbar',
        margin  : '0 10 10 10',
        items   : [
            {
                xtype: 'button',
                name: 'deleteButton',
                text: 'I understand the consequences, delete this {}',
                flex: 1,
                scale: 'medium',
                cls : 'red-text',
                disabled: true,
                handler: 'onDelete'
            }
        ]
    },

    items: [
        {
            name : 'text',
            xtype: 'displayfield',
            value: 'This action <b>CANNOT</b> be undone. This will permanently delete the <br>' +
            '<b>{}</b> {}, plans, sessions, groups, tasks, task instances and releted objects.' +
            ' Any RUNNING tasks will be DISCARDED!',
            fieldStyle: {
                fontSize: "14px",
                color   : "#3F3F3F"
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Please type the name of the {} to confirm',
            name : 'name',
            labelAlign: 'top',
            labelStyle: {
                color   : "#3F3F3F"
            }
        }
    ],


    display : function(be,o){
        o = o ? o : {validate:true};

        this.baseEvent = be;



        var text = this.down('displayfield[name=text]');
        var v = text.getValue();

        if(be.text){
            text.setValue(be.text.format(be.objectName, be.objectType, be.objectType, be.objectType));
        }else{
            text.setValue(v.format(be.objectName, be.objectType, be.objectType, be.objectType));
        }

        var b = this.down('[name=deleteButton]');
        b.setText(b.getText().format(be.objectType));

        var t = this.down('[name=name]');

        if(!o.validate){
            b.setDisabled(false);
            t.setVisible(false);
        }else{
            t.setFieldLabel(t.getFieldLabel().format(be.objectType));

            t.on('change',function(field,v){
                b.setDisabled(v != be.objectName);
            });
        }



        return this.show();
    }


});