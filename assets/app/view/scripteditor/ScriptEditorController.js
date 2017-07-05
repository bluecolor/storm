Ext.define('App.view.scripteditor.ScriptEditorController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.scripteditor',

    onOptionSelect: function(m,i){
        switch (i.name){
            case 'general': this.fireEvent('displaygeneraloptions'); break;
        }
    },

    onTechnoSelect: function(c,r){
        var tech = r.get('id');
        this.lookupReference('AceEditor').setMode(tech);
    },

    onThemeSelect: function(m,i){
        App.lib.User.options.editor.theme = i.name;
        App.lib.ajax.User.saveOptions(undefined,true);
        this.lookupReference('AceEditor').setTheme(i.name);
        m.down('[iconCls=check-mark]').setIconCls(undefined);
        m.down('[name={}]'.format(i.name)).setIconCls('check-mark');
    }

});