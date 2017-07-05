Ext.define('App.view.scripteditor.ScriptEditor',{
    extend: 'Ext.window.Window',
    xtype : 'scripteditor',

    requires: [
        'App.view.widget.AceEditor',
        'App.view.widget.TechnoCombo',
        'App.view.scripteditor.ScriptEditorController'
    ],


    controller  : 'scripteditor',

    height      : 550,
    width       : 700,

    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'fit',
    closeAction : 'destroy',
    title       : 'Editor',

    tbar: {
        name: 'tbar',
        margin: '0 0 0 30',
        items: [
            {
                xtype       : 'technocombo',
                name        : 'technoCombo',
                editable    : false,
                listeners   : {
                    select: 'onTechnoSelect'
                }
            },
            {
                name    : 'options',
                text    : 'Options',
                menu    : {
                    listeners: {click: 'onOptionSelect'},
                    items: [
                        {
                            name: 'general',
                            text: 'General'
                        },
                        {
                            name: 'theme',
                            text: 'Theme',
                            menu: {
                                closeAction: 'destroy',
                                listeners: {
                                    click: 'onThemeSelect',
                                    beforerender: function(m){
                                        var theme = App.lib.User.options.editor.theme;
                                        m.down('[iconCls=check-mark]').setIconCls(undefined);
                                        m.down('[name={}]'.format(theme)).setIconCls('check-mark');
                                    }
                                },
                                items: [
                                    {
                                        text: 'Chrome',
                                        name: Constants.Ace.Theme.CHROME
                                    },
                                    {
                                        text: 'Clouds',
                                        name: Constants.Ace.Theme.CLOUDS,
                                        iconCls: 'check-mark'
                                    },
                                    {
                                        text: 'Clouds Midnight',
                                        name: Constants.Ace.Theme.CLOUDS_MIDNIGHT
                                    },
                                    {
                                        text: 'Dawn',
                                        name: Constants.Ace.Theme.DAWN
                                    },
                                    {
                                        text: 'GitHub',
                                        name: Constants.Ace.Theme.GITHUB
                                    },
                                    {
                                        text: 'Solarized Dark',
                                        name: Constants.Ace.Theme.SOLARIZED_DARK
                                    },
                                    {
                                        text: 'Solarized Light',
                                        name: Constants.Ace.Theme.SOLARIZED_LIGHT
                                    },
                                    {
                                        text: 'Terminal',
                                        name: Constants.Ace.Theme.TERMINAL
                                    },
                                    {
                                        text: 'TextMate',
                                        name: Constants.Ace.Theme.TEXTMATE
                                    },
                                    {
                                        text: 'Twilight',
                                        name: Constants.Ace.Theme.TWILIGHT
                                    }
                                ]
                            }

                        }
                    ]
                }

            }
        ]
    },


    items: [
        {
            layout      : 'fit',
            scrollable  : true,
            items       : [
                {
                    reference: 'AceEditor',
                    xtype: 'aceeditor'
                }
            ]
        }
    ],

    display : function(script,o){
        var me = this,
            ts = o.editor;
        me.show();
        me.down('aceeditor').setValue(script);
        me.down('aceeditor').on('change',function(v,o){
            ts.setValue(v);
        });

        if(o.technology){
            var combo = me.down('technocombo'),
                r = combo.getStore().getById(o.technology);
            combo.select(r);
            combo.fireEvent('select',combo,r);
        }

        return me;
    },

    loadUseOptions: function(){
        var me = this,
            editor = me.down('aceeditor'),
            options= App.lib.User.options.editor;

        editor.setTheme(options.theme);
        editor.setFontSize(options.fontSize);
        editor.setTabSize(options.tabSize);
        editor.setUseSoftTabs(options.softTabs);
        editor.setUseWrapMode(options.wrapText);
        editor.setHighlightActiveLine(options.highlightActiveLine);
        editor.setAutoComplete(options.autoComplete);
        editor.setShowLineNumbers(options.lineNumbers);
        editor.setShowGutter(options.gutter);
    },

    constructor: function(){
        var me = this;
        me.callParent(arguments);
        me.on('afterrender',function(){
            me.loadUseOptions();
        });
    }

});