Ext.define('App.view.navigator.Navigator', {
    extend  : 'Ext.panel.Panel',
    requires: [
        'App.view.navigator.navsession.NavSession',
        'App.view.navigator.navplan.NavPlan',
        'App.view.navigator.navgroup.NavGroup',
        'App.view.navigator.navsettings.NavSettings',
        'App.view.navigator.navreports.NavReports',
        'App.view.widget.MainOptionsTool',

        'App.view.navigator.navplan.NavPlanController'
    ],

    name    : 'navigator',
    xtype   : 'navigator',


    border   : false,

    defaults : {
        border:false,
        bodyBorder: false
    },


    layout  : {
        type : 'accordion'
    },

    hidden      : true,
    collapsible : true,
    animCollapse: true,
    width       : 255,
    split       : true,
    title       : 'Navigator',
    header      : false,

    items       : [
        {
            title   : 'Sessions',
            xtype   : 'navsession'
        },
        {
            title   : 'Plans',
            xtype   : 'navplan',
            controller  : 'navplan'
        },
        {
            title   : 'Groups',
            xtype   : 'navgroup'
        },
        {
            title   : 'Logs & Reports',
            xtype   : 'navreports'
        },
        {
            title   : 'Settings',
            xtype   : 'navsettings'
        }
    ],

    constructor : function(){
        var sch = App.lib.Session.scheduler;
       // this.iconCls = Constants.Icon.getWhiteBorderIconClsByStatus(sch.status);
        this.callParent(arguments);
    }

});
