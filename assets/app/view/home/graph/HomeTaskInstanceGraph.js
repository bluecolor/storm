Ext.define('App.view.home.graph.HomeTaskInstanceGraph',{
    extend: 'Ext.Panel',
    xtype : 'hometaskinstancegraph',

    requires: [
        'App.view.widget.SessionCombo',
        'App.view.pool.button.RefreshButton'
    ],

    tbar: {
        items: [
            {
                flex        : 1,
                xtype       : 'sessioncombo',
                name        : 'sessions',
                reference   : 'Sessions',
                cls         : 'graph-sess-combo',
                bind        : {
                    store: '{sessions}'
                },
                listeners: {
                    select: function(c,r){
                        var c = this.lookupController();
                        c.onSessionSelect(r.get('id'),c);
                    }
                }
            },
            '->',
            {
                xtype: 'refreshbutton',
                handler: function(){
                    Ext.getStore(Constants.Store.SESSION).load();
                }
            },
            {
                text    : 'Preview',
                handler : 'onPreviewTaskInstanceGraph'
            }
        ]
    },



    items: [{
        xtype    : 'polar',
        reference: 'HomeTaskInstanceChart',
        width    : '100%',
        height   : 400,
        insetPadding: 50,
        innerPadding: 20,
        bind : {
            store: '{sessionTasks}'
        },
        legend: {
            docked: 'bottom'
        },
        interactions: ['rotate', 'itemhighlight'],
        series: [{
            type: 'pie',
            angleField: 'count',
            donut: 50,
            label: {
                field   : 'status',
                display : 'outside'
            },
            highlight: true,
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            },
            colors: ["#008110", "#FFB505", "#F30021", "#C7C7C7","#42004A","#C9007A"],
            renderer: function(sprite, config, rendererData, index) {

                var record = rendererData.store.getData().items[index];
                return Ext.apply(rendererData, {
                    fillStyle: Constants.Color.getColor(record.data.status.toUpperCase())
                });
            }
        }]
    }]


});