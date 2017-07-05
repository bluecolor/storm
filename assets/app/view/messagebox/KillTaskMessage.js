Ext.define('App.view.messagebox.KillTaskMessage',{
    extend: 'Ext.window.Window',
    xtype : 'killtaskmessage',

    modal       : true,
    resizable   : false,
    collapsible : false,
    animCollapse: false,
    maximizable : false,
    width       : 455,
    height      : 285,
    bodyPadding : 20,
    title       : '<span style="color: #E08A1E">Warning!</span>',

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
                value: 'Please read this before taking any action!',
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
                xtype   : 'button',
                name    : 'killButton',
                flex    : 1,
                scale   : 'medium',
                cls     : 'red-text'
            }
        ]
    },

    items: [
        {
            name : 'message',
            xtype: 'displayfield',
            value: 'This will only <b>KILL</b> main Storm process. ' +
            'To clean everything you have to MANUALLY KILL child processes. ' +
            'Check your target system and kill those processes manually.',
            fieldStyle: {
                fontSize: "14px",
                color   : "#3F3F3F"
            }
        }
    ],

    ask : function(ids,cb){

        var me = this,buttonText;

        if(!_.isArray(ids) || ids.length == 1){
            buttonText = 'I got it, kill this task';
        }else{
            buttonText = 'I got it, kill these tasks';
        }

        var b = this.down('button[name=killButton]');
        b.setText(buttonText);
        b.on('click',function(){
            me.close();
            cb();
        });

        return this.show()
    }


});