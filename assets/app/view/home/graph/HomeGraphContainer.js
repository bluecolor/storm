Ext.define('App.view.home.graph.HomeGraphContainer',{
    extend: 'Ext.panel.Panel',
    xtype : 'homegraphcontainer',

    requires: [
        'App.view.home.graph.HomeGraphController',
        'App.view.home.graph.HomeTaskInstanceGraph',
        'App.view.home.graph.HomeGraphModel',
        'App.view.home.graph.HomePlanTaskGraph'
    ],

    viewModel   : 'homegraph',
    controller  : 'homegraph',





    items: [
        {
            xtype   : 'container',
            layout  : 'card',
            activeItem: 0,
            items   : [
                {
                    defaults: {
                        padding: '10 0 0 10'
                    },
                    layout  : 'column',
                    items   : [
                        {
                            columnWidth: 0.5,
                            xtype   : 'container',
                            layout  : {
                                type    : 'vbox',
                                pack    : 'start',
                                align   : 'stretch'
                            },
                            items   : [
                                {
                                    frame:true,
                                    reference: 'HomeTaskInstanceGraph',
                                    xtype: 'hometaskinstancegraph'
                                }
                            ]
                        },
                        {
                            columnWidth: 0.5,
                            xtype   : 'container',
                            layout  : {
                                type    : 'vbox',
                                pack    : 'start',
                                align   : 'stretch'
                            },
                            items   : [
                                {
                                    frame: true,
                                    xtype: 'homeplantaskgraph',
                                    reference: 'HomePlanTaskGraph'
                                }
                            ]
                        }
                    ]
                }
            ]
        }


    ],

    tbar: {
        name    : 'tbar',
	    items   : [
            '->',
            {
                disabled : true,
                reference: 'PreviousButton',
                name    : 'previous',
                iconCls : 'previous',
                tooltip : 'Previous graph',
                handler : 'onPreviousGraph'
            },
            {
                disabled : true,
                reference: 'NextButton',
                name    : 'next',
                iconCls : 'next',
                tooltip : 'Next graph',
                handler : 'onNextGraph'
            }
        ]
    }



});
