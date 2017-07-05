Ext.define('App.view.home.graph.HomePlanTaskGraph',{
    extend: 'Ext.Panel',
    xtype : 'homeplantaskgraph',

    requires: [
        'Ext.chart.*',
        'App.view.pool.button.RefreshButton'
    ],

    tbar  : {
        items:[
            '->',
            {
                xtype: 'refreshbutton',
                handler: function(){
                    this.lookupController().loadPlanStatsStore()
                }
            },
            {
                text    : 'Preview',
                handler : 'onPreviewPlanTaskGraph'
            }
        ]
    },


    items: [{
        xtype: 'cartesian',
        reference: 'HomePlanTaskChart',

        width: '100%',
        height: 400,

        bind: {
            store: '{planStats}'
        },
        legend: {
            docked: 'bottom'
        },
        insetPadding: {
            top     : 40,
            left    : 40,
            right   : 40,
            bottom  : 40
        },
        axes: [{
            type     : 'numeric',
            position : 'left',
            grid    : false,
            fields  : ['ready'],
            majorTickSteps: 1,
            minimum: 0
        }, {
            type    : 'category',
            position: 'bottom',
            grid    : true,
            fields  : ['plan'],
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],

        series: [{
            type: 'bar',
            title: [ 'ready', 'excluded'],
            xField: 'plan',
            yField: [ 'ready', 'excluded'],
            stacked: true,
            highlight: {
                fillStyle: '#3F97C1'
            },
            tooltip: {
                renderer: 'onBarTipRender'
            },
            colors: ["#FFB505", "#C7C7C7"]
        }],

        listeners: {
            beforerender: 'loadPlanStatsStore'
        }
    }]


});