Ext.define('App.view.help.tips.Tips',{
    extend: 'Ext.window.Window',
    xtype : 'tips',

    requires   : [
        'App.view.help.tips.TipsController',
        'App.view.help.tips.TipsModel'
    ],

    controller : 'tips',
    viewModel  : 'tips',

    modal       : false,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 575,
    height      : 375,
    minWidth    : 300,
    minHeight   : 200,
    bodyPadding : 20,

    title       : 'Tip of the Day',

    layout: {
        type    : 'vbox',
        pack    : 'start',
        align   : 'stretch'
    },

    scrollable: true,

    currentTip: -1,

    tbar    : {
        name    : 'tbar',
        margin  : '10 0 0 10',
        items   : [
            {
                xtype: 'fieldcontainer',
                layout: {
                    type    : 'hbox',
                    pack    : 'start',
                    align   : 'center'
                },
                items: [
                    {
                        xtype   : 'image',
                        src     : 'resources/img/idea-42.png',
                        width   : 42,
                        height  : 42
                    },
                    {
                        xtype       : 'displayfield',
                        value       : 'Did you know ...?',
                        padding     : '0 0 0 20',
                        fieldStyle  : {
                            fontSize: "18px",
                            color   : "#716464"
                        }
                    }
                ]
            }
        ]
    },


    items   : [

        {
            scrollable: 'vertical',
            height  : 575,
            xtype   : 'container',
            layout: {
                type    : 'vbox',
                pack    : 'start'
            },
            items   : [
                {
                    reference: 'TipText',
                    xtype: 'displayfield',
                    name : 'tipText',
                    value: '',
                    fieldStyle  : {
                        fontSize: "14px",
                        color   : "#716464"
                    }
                },
                {
                    reference: 'TipImg',
                    xtype   : 'image',
                    width   : 100,
                    height  : 200,
                    hidden  : true,
                    name    : 'tipImg'
                }
            ]
        }
    ],

    bbar: {
        name    : 'bbar',
        items   : [
            {
                reference : 'ShowTipsOnStartup',
                xtype     : 'checkboxfield',
                boxLabel  : 'Show Tips on Startup',
                name      : 'showTipsOnStartup',
                inputValue: true,
                cls       : 'solar-dark',
                checked   : App.lib.User.options.tipsOnStart,
                listeners : {
                    change: 'onShowTipsOnStartup'
                }

            },'->',
            {
                disabled : true,
                reference: 'PreviousTipButton',
                name    : 'previous',
                iconCls : 'previous',
                tooltip : 'Previous tip',
                handler : 'onPreviousTip'
            },
            {
                disabled : true,
                reference: 'NextTipButton',
                name    : 'next',
                iconCls : 'next',
                tooltip : 'Next tip',
                handler : 'onNextTip'
            }
        ]
    },

    listeners: {
        afterrender: 'onTipsRender'
    }


});