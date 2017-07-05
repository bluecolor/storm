Ext.define('App.view.sqleditor.SQLEditor',{
    extend: 'Ext.window.Window',
    xtype : 'sqleditor',

    requires: [
        'App.view.sqleditor.SQLEditorController',
        'App.view.sqleditor.SQLEditorModel'
    ],

    controller  : 'sqleditor',
    viewModel   : 'sqleditor',

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
    title       : 'SQL Editor',

    items: [
        {
            xtype: 'tabpanel',
            reference: 'SQLEditorConnectionContainer',
            items: [
                {
                    name    : 'dummyConnection',
                    hidden  : true
                },
                {
                    iconCls : 'plus',
                    name    : 'addConnection',
                    listeners: {
                        activate: 'onAddSQLEditorConnection'
                    }
                }
            ]
        }
    ]

});