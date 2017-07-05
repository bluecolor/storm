Ext.define('App.view.help.updatecheck.UpdateCheckResult',{
    extend  : 'Ext.window.Window',
    xtype   : 'updatecheckresult',

    requires: [
        'App.view.pool.list.BasicList',
        'App.view.help.updatecheck.UpdateCheckModel',
        'App.view.help.updatecheck.UpdateCheckController'
    ],

    viewModel   : 'updatecheck',
    controller  : 'updatecheck',

    modal       : true,
    collapsible : false,
    animCollapse: false,
    maximizable : false,
    width       : 575,
    height      : 305,
    minWidth    : 300,
    minHeight   : 200,
    bodyPadding : 20,
    scrollable  : 'vertical',
    title       : 'Platform Updates',

    cls         : 'update-check',

    tbar: {
        name    : 'tbar',
        margin  : '10 30 0 10',
        items   : [
            {
                xtype: 'fieldcontainer',
                layout: {
                    type    : 'vbox',
                    pack    : 'start',
                    align   : 'stretch'
                },
                items: [
                    {
                        xtype       : 'displayfield',
                        name        : 'currentVersion',
                        fieldLabel  : 'Current Version',
                        value       : '',
                        fieldStyle  : {
                            fontSize: "12px",
                            color   : "#716464",
                            fontWeight: "bold"
                        }
                    },
                    {
                        labelWidth  : 100,
                        xtype       : 'displayfield',
                        fieldLabel  : 'New Version',
                        name        : 'newVersion',
                        value       : '',
                        fieldStyle  : {
                            fontSize: "12px",
                            color   : "#716464",
                            fontWeight: "bold"
                        }
                    }
                ]
            }
        ]
    },


    bbar : {
        name    : 'bbar',
        items   : [
            '->',
            {
                text: 'Release Notes'
            },
            {
                text: 'Ignore This Update'
            },
            {
                text: 'Remind Me Later'
            }
        ]
    },

    items   : [
        {
            scrollable: 'vertical',
            name    : 'changes',
            xtype   : 'basiclist',
            height  : 300,
            bind    : {
                store: '{changes}'
            },

            tbar    : [
                {
                    xtype: 'displayfield',
                    value: 'What is New',
                    fieldCls: 'emph'
                }
            ],


            columns : [
                {
                    width   : 32,
                    renderer: function(){
                        var i = _.random(1,11),
                            img = 'resources/img/circle/{}.png'.format(i);

                        return '<img src="{}"/>'.format(img);
                    }
                },
                {
                    dataIndex : 'text',
                    flex      : 1
                }
            ]
        }
    ],



    display: function(cv,lv){

        this.down('displayfield[name=currentVersion]').setValue(cv.version);
        this.down('displayfield[name=newVersion]').setValue(lv.version);
        var d = lv.changes.map(function(i){
            return {"text":i};
        });
        this.getViewModel().getStore('changes').loadRawData(d);
        return this.show();
    }

});