Ext.define('App.view.task.TaskScript',{
    extend: 'Ext.panel.Panel',
    xtype : 'taskscript',

    requires: [
        'App.view.widget.AceEditor'
    ],

    layout: 'fit',
    script: undefined,

    items: [
        {
            xtype: 'aceeditor',
            flex : 1,
            gutter: false
        }
    ],

    getValue: function(){
        try{
            return this.down('aceeditor').getValue();
        }catch (e){
            return this.script;
        }

    },



    setValue: function(v){
        this.script = v;
        var editor = this.down('aceeditor');
        editor.on('afterrender',function(){
            editor.setValue(v);
        });

        return this;
    }

});