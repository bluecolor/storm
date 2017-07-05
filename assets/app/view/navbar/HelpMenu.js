Ext.define('App.view.navbar.HelpMenu',{
    extend: 'Ext.menu.Menu',
    xtype : 'helpmenu',

    items : [
        {
            name : 'doc',
            text : 'Online Documentation'
        },
        {
            name : 'tip',
            text : 'Tip of the Day',
            iconCls: 'tip-marker'
        },
        {
            name : 'site',
            text : 'Product Site'
        },
        {
            name : 'support',
            text : 'Support'
        }
        ,'-',
        {
            name: 'checkUpdate',
            text: 'Check for Update',
            iconCls: 'download-cloud'
        },
        {
            name: 'about',
            text: 'About'
        }
    ]
});