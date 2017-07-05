Ext.define('App.view.taskinstance.TaskInstanceScript',{
    extend: 'Ext.panel.Panel',
    xtype : 'taskinstancescript',

    requires: [
        'App.view.widget.AceEditor'
    ],

    layout: 'fit',

    items: [
        {
            xtype: 'aceeditor',
            flex : 1,
            gutter: false
        }
    ],
    
    reference: 'TaskInstanceScript',

    getValue: function(){
        return this.down('aceeditor').getValue();
    },

    setValue: function(v){
        var editor = this.down('aceeditor');
        editor.on('afterrender',function(){
            editor.setValue(v);
        });

        return this;
    }

});