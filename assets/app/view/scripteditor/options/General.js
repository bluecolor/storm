Ext.define('App.view.scripteditor.options.General',{
    extend: 'Ext.window.Window',
    xtype : 'scripteditorgeneraloptions',

    height      : 350,
    width       : 500,

    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    minWidth    : 300,
    minHeight   : 200,
    closeAction : 'destroy',
    title       : 'Editor Options - General',
    layout      : 'form',

    defaults    : {
        xtype      : 'textfield',
        anchor     : '100%',
        labelAlign : 'left'
    },

    items : [
        {
            xtype       : 'numberfield',
            fieldLabel  : 'Font Size',
            name        : 'fontSize',
            value       : 17,
            minValue    : 10,
            maxValue    : 30
        },{
            xtype       : 'numberfield',
            fieldLabel  : 'Tab Size',
            name        : 'tabSize',
            value       : 4,
            minValue    : 1,
            maxValue    : 8
        },
        {
            name        : 'options',
            xtype       : 'checkboxgroup',
            fieldLabel  : 'Options',
            columns     : 2,
            items: [
                {boxLabel: 'Soft Tabs' , name: 'softTabs' },
                {boxLabel: 'Wrap Text' , name: 'wrapText'},
                {boxLabel: 'Highlight Active Line', name: 'highlightActiveLine', checked : true},
                {boxLabel: 'Auto Complete', name: 'autoComplete'},
                {boxLabel: 'Line Numbers', name: 'lineNumbers', checked:true},
                {boxLabel: 'Gutter', name: 'gutter', checked: true}
            ]
        }
    ],

    display: function(){
        var me = this;
        me.show();
        return me;
    },

    constructor: function(){
        var me = this;
        me.callParent(arguments);

        me.down('[name=fontSize]').setValue(App.lib.User.options.editor.fontSize);
        me.down('[name=tabSize]').setValue(App.lib.User.options.editor.tabSize);
        me.down('[name=softTabs]').setValue(App.lib.User.options.editor.softTabs);
        me.down('[name=wrapText]').setValue(App.lib.User.options.editor.wrapText);
        me.down('[name=highlightActiveLine]').setValue(App.lib.User.options.editor.highlightActiveLine);
        me.down('[name=autoComplete]').setValue(App.lib.User.options.editor.autoComplete);
        me.down('[name=lineNumbers]').setValue(App.lib.User.options.editor.lineNumbers);
        me.down('[name=gutter]').setValue(App.lib.User.options.editor.gutter);

        me.down('[name=fontSize]').on('change',function(that,value){
            App.lib.User.options.editor.fontSize = value;
            AsyncUser.saveOptions(undefined,true);
            var e = Ext.ComponentQuery.query('aceeditor');
            _.each(e,function(editor){editor.setFontSize(value);});
        });
        me.down('[name=tabSize]').on('change',function(that,value){
            App.lib.User.options.editor.tabSize = value;
            AsyncUser.saveOptions(undefined,true);
            var e = Ext.ComponentQuery.query('aceeditor');
            _.each(e,function(editor){editor.setTabSize(value);});
        });
        me.down('[name=softTabs]').on('change',function(that,value){
            App.lib.User.options.editor.softTabs= value;
            AsyncUser.saveOptions(undefined,true);
            var e = Ext.ComponentQuery.query('aceeditor');
            _.each(e,function(editor){editor.setUseSoftTabs(value);});
        });
        me.down('[name=wrapText]').on('change',function(that,value){
            App.lib.User.options.editor.wrapText= value;
            AsyncUser.saveOptions(undefined,true);
            var e = Ext.ComponentQuery.query('aceeditor');
            _.each(e,function(editor){editor.setUseWrapMode(value);});
        });
        me.down('[name=highlightActiveLine]').on('change',function(that,value){
            App.lib.User.options.editor.highlightActiveLine= value;
            AsyncUser.saveOptions(undefined,true);
            var e = Ext.ComponentQuery.query('aceeditor');
            _.each(e,function(editor){editor.setHighlightActiveLine(value);});
        });
        me.down('[name=autoComplete]').on('change',function(that,value){
            App.lib.User.options.editor.autoComplete= value;
            AsyncUser.saveOptions(undefined,true);
            var e = Ext.ComponentQuery.query('aceeditor');
            _.each(e,function(editor){editor.setAutoComplete(value);});
        });
        me.down('[name=lineNumbers]').on('change',function(that,value){
            App.lib.User.options.editor.lineNumbers= value;
            AsyncUser.saveOptions(undefined,true);
            var e = Ext.ComponentQuery.query('aceeditor');
            _.each(e,function(editor){editor.setShowLineNumbers(value);});
        });
        me.down('[name=gutter]').on('change',function(that,value){
            App.lib.User.options.editor.gutter= value;
            AsyncUser.saveOptions(undefined,true);
            var e = Ext.ComponentQuery.query('aceeditor');
            _.each(e,function(editor){editor.setShowGutter(value);});
        });
    }



});