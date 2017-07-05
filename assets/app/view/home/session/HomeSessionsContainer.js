Ext.define('App.view.home.session.HomeSessionsContainer', {
    xtype: 'homesessionscontainer',
    extend: 'Ext.panel.Panel',

    requires: [
        'App.view.home.session.HomeSessionsController',
        'App.view.home.session.HomeSessions',
        'App.view.pool.textfield.SearchTextField'
    ],

    controller: 'homesessions',

    bodyPadding : 13,
    layout      : 'fit',

    tbar  : {
        name : 'tbar',
        margin: '',
        items: [
            {
                name    : 'allSessions',
                iconCls : 'glasses',
                tooltip : 'All Sessions',
                handler : 'onShowAllSessions'
            },'-',
            {
                xtype   : 'refreshbutton',
                handler : 'onReloadSessions'
            },
            '-',
            {
                xtype : 'searchtextfield',
                emptyText: 'Search...',
                flex  : 2,
                listeners: {
                    change: 'onSearchSession'
                }
            }
        ]
    },

    items: [
        {
            xtype: 'homesessions',
            reference: 'HomeSessions'
        }
    ]
});