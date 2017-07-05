Ext.define('App.view.widget.ParallelPrompt',{
    extend: 'Ext.window.Window',
    xtype : 'parallelprompt',

    modal : true,
    title : 'Parallel',

    width : 300,
    height: 120,

    layout: 'form',

    items : [
        {
            fieldLabel: 'Parallel Level',
            name : 'parallel',
            xtype: 'numberfield',
            flex : 1,
            width: 200,
            maxValue: 64,
            minValue: 0
        }
    ],

    buttons: [
        {
            text:'Close',
            handler:function(){
                this.up('window').close();
            }
        },
        {
            name:'save',
            text:'Save'
        }
    ],

    setValue: function(p){
        this.down('[name=parallel]').setValue(p);
        return this;
    },

    getValue: function(){
        return this.down('[name=parallel]').getValue();
    }


});