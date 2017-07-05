Ext.define('App.view.help.updatecheck.UpToDateMessage',{
    extend  : 'Ext.window.Window',
    xtype   : 'uptodatemessage',

    modal       : true,
    collapsible : false,
    animCollapse: false,
    maximizable : false,
    width       : 300,
    height      : 100,
    bodyPadding : 20,
    header      : false,

    bbar : [
        '->',
        {
            text: 'Close',
            handler: function(){
                this.up('window').close();
            }
        }
    ],

    items: [
        {
            xtype: 'fieldcontainer',
            padding: '10 0',
            layout: {
                type    : 'hbox',
                pack    : 'start',
                align   : 'center'
            },
            items: [
                {
                    xtype   : 'image',
                    src     : 'resources/img/success-32.png',
                    width   : 32,
                    height  : 32
                },
                {
                    xtype       : 'displayfield',
                    value       : 'Platform is up to date',
                    padding     : '0 0 0 20',
                    fieldStyle  : {
                        fontSize: "14px",
                        color   : "#716464"
                    }
                }
            ]
        }
    ]

});