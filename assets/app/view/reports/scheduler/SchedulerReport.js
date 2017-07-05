Ext.define('App.view.reports.scheduler.SchedulerReport',{
    extend: 'Ext.panel.Panel',
    xtype : 'schedulerreport',

    requires: [
        'App.view.pool.list.BasicList',
        'App.view.reports.scheduler.SchedulerReportController',
        'App.view.reports.scheduler.SchedulerReportModel',
        'App.view.pool.column.StatusTagColumn',
        'Ext.chart.series.Pie',
        'Ext.chart.interactions.Rotate',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.PolarChart'
    ],


    controller: 'schedulerreport',
    viewModel : 'schedulerreport',

    layout: 'column',
    autoScroll: true,
    width: '75%',
    height: '95%',



    bodyPadding: 25,

    defaults: {
        bodyPadding: 15
    },

    tbar: {
        name : 'tbar',
        items: [
            {
                iconCls : 'plus',
                text    : 'Add Scheduler',
                handler : 'onAddScheduler'
            }
            ,'->',
            {
                xtype : 'displayfield',
                name  : 'title',
                _value: 'Logs & Reports - {0}',
                value : 'Schedulers',
                reference: 'Title'
            },'-',
            {
                iconCls: 'close-softblue-16',
                tooltip: 'Close Reports',
                handler: 'onCloseReports'
            }
        ]
    },

    items : [
        {
            name: 'schedulersContainer',
            columnWidth: 0.2,
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            border : false,
            items: [
                {
                    xtype   : 'container',
                    name    : 'clock',
                    height  : 60,
                    style   : {
                        backgroundImage: 'url(resources/img/clock-softblue-48.png)',
                        backgroundRepeat: 'no-repeat'
                    }
                },
                {
                    name    : 'schedulers',
                    xtype   : 'basiclist',
                    reference: 'Schedulers',
                    bind    : { store:'{schedulers}'},
                    height  : 600,
                    padding : 0,
                    emptyText: 'System has no schedulers!',
                    columns : [
                        {
                            name : 'name',
                            dataIndex: 'name'
                        },
                        {
                            name: 'error',
                            dataIndex:'error'
                        },
                        {
                            name: 'bell',
                            dataIndex: 'error'
                        }
                    ],
                    listeners: {
                        selectionchange: function(g, r){
                            this.lookupController().onSchedulerSelect(r[0]);
                        },
                        viewready: function(g){
                            setTimeout(function(){
                                g.getSelectionModel().select(1);
                            },100)
                        }
                    }

                }
            ]
        },
        {
            name : 'detail',
            columnWidth: 0.8,
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            border : false,
            items  : [
                {
                    name  : 'schedulerSessions',
                    xtype : 'basiclist',
                    emptyText: 'Scheduler has no sessions!',
                    flex  : 1,
                    cls   : 'tiny-list',
                    bind  : { store : '{sessions}'},
                    reference: 'SchedulerSessions',
                    hideHeaders : false,
                    loadStore: function(scheduler){
                        this.store.proxy.url = this.store.proxy._url.format(scheduler);
                        this.store.load();
                    },
                    columns: [
                        {
                            name : 'status',
                            text : 'Status',
                            flex : 1,
                            menuDisabled:true,
                            resizable:false,
                            dataIndex   : 'status',
                            renderer    : function(status, meta, record) {
                                return '<a class="session-status session-snapshot" style="color:{0}; ">{1}</a>'
                                    .format(Constants.Color.getColorByStatus(status), status);
                            }
                        },
                        {
                            text        : "Parallel",
                            dataIndex   : 'parallel',
                            align       : 'center',
                            resizable:false,
                            menuDisabled:true
                        },
                        {
                            text : 'Session',
                            dataIndex : 'shortName',
                            cellWrap: true,
                            menuDisabled:true,
                            resizable:false,
                            flex : 1,
                            renderer    : function(v, m, r) {
                                m.css = '{} {}'.format(m.css, 'session-snapshot');
                                return v;
                            }
                        }
                    ],
                    listeners: {
                        selectionchange: function(g,r){
                            this.lookupController().onSessionSelect(r[0]);
                        }
                    }

                }/*,
                {
                    name: 'taskStatCharts',
                    reference: 'TaskStatCharts',
                    xtype: 'panel',
                    layout: 'card',
                    flex  : 1,
                    items : [
                        {
                            xtype: 'polar',
                            width: '100%',
                            height: 450,
                            bind : {
                                store: '{sessionTaskStats}'
                            },
                            insetPadding: 50,
                            innerPadding: 20,
                            legend: {
                                docked: 'bottom'
                            },
                            interactions: ['rotate', 'itemhighlight'],
                            series: [{
                                type: 'pie',
                                colors: [
                                    Constants.Color.BLOCKED,
                                    Constants.Color.ERROR,
                                    Constants.Color.EXCLUDED,
                                    Constants.Color.KILLED,
                                    Constants.Color.READY,
                                    Constants.Color.RUNNING,
                                    Constants.Color.SUCCESS
                                ],
                                renderer: function (s, c, d, i) {
                                    var status = d.store.getAt(i).get('status');
                                    return { fill: Constants.Color.getColor(status) };
                                },
                                angleField: 'count',
                                label: {
                                    field: 'status',
                                    display: 'outside'
                                },
                                highlight: true,
                                tooltip: {
                                    trackMouse: true,
                                    renderer: function(storeItem, item) {
                                        this.setHtml(storeItem.get('status') + ': ' + storeItem.get('count'));
                                    }
                                }
                            }]
                        }
                    ]
                }*/
            ]

        }
    ]


});