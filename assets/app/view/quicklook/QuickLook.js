Ext.define('App.view.quicklook.QuickLook',{
    extend  : 'Ext.panel.Panel',
    xtype   : 'quicklook',

    requires    : [
        'App.view.quicklook.QuickLookController',
        'App.view.quicklook.QuickLookModel',
        'App.view.quicklook.SessionSnapshotGrid'
    ],

    controller  : 'quicklook',
    viewModel   : 'quicklook',

    header      : false,
    title       : 'Quick Look',
    iconCls     : 'idea',
    collapsible : true,
    animCollapse: true,
    height      : 200,
    layout      : 'fit',

    items : [
        {
            xtype : 'sessionsnapshotgrid'
        }
    ]


});
