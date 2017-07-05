
Ext.define('App.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'App.view.main.MainController',
        'App.view.main.MainModel',
        'App.view.navigator.Navigator',
        'App.view.main.MainCenter',
        'App.view.navbar.Navbar'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [
        {
            region : 'north',
            xtype  : 'navbar',
            cls    : 'north-navbar'
        },
        {
            xtype    : 'navigator',
            region   : 'west',
            reference: 'Navigator'
        },{

            region  : 'center',
            xtype   : 'maincenter'
        }],


    listeners : {
        add : function (c, i) {
            if (i.xtype == 'bordersplitter') {
                i.width = Constants.UI.borderSplitter.width;
            }
        },
        afterrender: 'onMainRender'
    }

});
