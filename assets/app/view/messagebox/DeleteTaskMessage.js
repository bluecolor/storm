Ext.define('App.view.messagebox.DeleteTaskMessage',{
    extend: 'Ext.window.Window',
    xtype : 'deletetaskmessage',

    modal       : true,
    resizable   : false,
    collapsible : false,
    animCollapse: false,
    maximizable : false,
    width       : 455,
    height      : 285,
    bodyPadding : 20,
    title       : '<span style="color: #F08F90">Are you sure?</span>',

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
                flex: 1,
                scale: 'medium',
                cls : 'red-text'
            }
        ]
    },

    items: [
        {
            name : 'message',
            xtype: 'displayfield',
            fieldStyle: {
                fontSize: "14px",
                color   : "#3F3F3F"
            }
        }
    ],

    ask : function(taskIds,cb){

        var me = this,
            buttonText,
            message,
            store = Ext.getStore(Constants.Store.TASK),
            tasks = taskIds.map(function(id){
                var r = store.getById(id);
                return r.data;
            });



        if(tasks.length == 1){
            message =
                'This action <b>CANNOT</b> be undone. This will permanently delete the ' +
                '<b>{}</b> task and its instances. {} '.format(tasks[0].name,tasks[0].name) +
                'also will be removed from dependencies';

            buttonText =  'I understand the consequences, delete this task';

        }else{
            message =
                'This action <b>CANNOT</b> be undone. This will permanently delete these ' +
                '<b>{} tasks</b> and their instances. '.format(tasks.length) +
                'They also will be removed from dependencies';
            buttonText = 'I understand the consequences, delete these tasks';
        }

        this.down('displayfield[name=message]').setValue(message);
        var b = this.down('button[name=deleteButton]');
        b.setText(buttonText);
        b.on('click',function(){
            me.close();
            cb();
        });

        return this.show()
    }


});