Ext.define('App.view.home.plan.HomePlansContainer',{
    extend: 'Ext.panel.Panel',
    xtype : 'homeplanscontainer',

    requires: [
        'App.view.home.plan.HomePlans',
        'App.view.home.plan.HomePlansController'
    ],

    controller  : 'homeplans',

    bodyPadding : 13,

    tbar  : {
        name : 'tbar',
        margin: '',
        items: [
            {
                iconCls : 'plus',
                name    : 'newPlan',
                tooltip : 'Create New Plan',
                handler : 'onCreatePlan'
            },
            '-',
            {
                xtype   : 'refreshbutton',
                handler : 'onReloadPlans'
            },
            '-',
            {
                xtype : 'searchtextfield',
                emptyText: 'Search...',
                flex  : 2,
                listeners: {
                    change: function(me,nv){
                        this.lookupController().onSearchPlan(nv);
                    }
                }
            }
        ]
    },

    items: [
        {
            xtype       : 'homeplans',
            reference   : 'HomePlans',
            hidden      : false
        }
    ]


});