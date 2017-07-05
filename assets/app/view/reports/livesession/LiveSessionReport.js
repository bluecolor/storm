Ext.define('App.view.reports.livesession.LiveSessionReport',{
    extend: 'App.view.pool.list.BasicList',
    xtype : 'livesessionreport',

    requires: [
        'App.view.reports.livesession.LiveSessionReportModel',
        'App.view.reports.livesession.LiveSessionReportController'
    ],

    viewModel : 'livesessionreport',
    controller: 'livesessionreport',

    bind : {
        store: '{taskInstances}'
    },

    emptyText: 'No task found.',

    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name} ({rows.length} Task{[values.rows.length > 1 ? "s" : ""]})',
        hideGroupedHeader: true,
        startCollapsed: true,
        id: 'liveSessionsGrouping'
    }],

    layout: 'fit',

    tbar  : {
        name : 'tbar',
        items: [
            {
                iconCls : 'reload',
                tooltip : 'Refresh',
                name    : 'reload',
                handler : 'onReloadTaskInstances'
            },'-',
            {
                xtype: 'segmentedbutton',
                allowMultiple: true,
                listeners: {
                    toggle: function(me,b){
                        b._value = !b._value;
                        var items = me.items.items;
                        var status = _.chain(items)
                            .filter(function(i){return i._value;})
                            .map('status')
                            .value();

                        var iconCls = undefined;

                        if(b._value){
                            switch (b.status){
                                case Constants.Status.RUNNING :
                                    iconCls='tag-running';
                                    break;
                                case Constants.Status.ERROR :
                                    iconCls='tag-error';
                                    break;
                                case Constants.Status.BLOCKED :
                                    iconCls='tag-blocked';
                                    break;
                                case Constants.Status.KILLED:
                                    iconCls='tag-killed';
                                    break;
                            }
                        }

                        b.setIconCls(iconCls);
                        this.lookupController().onTaskInstanceFilter(status);
                    }
                },
                items: [{
                    text: 'Running',
                    status  : 'RUNNING',
                    _value  : true,
                    iconCls: 'tag-running'
                },{
                    text: 'Error',
                    status  : 'ERROR',
                    _value  : true,
                    iconCls:'tag-error'
                },{
                    text: 'Blocked',
                    status  : 'BLOCKED',
                    _value  : false
                },{
                    text: 'Killed',
                    status  : 'KILLED',
                    _value  : false
                }]
            }
            ,'->',
            {
                xtype : 'displayfield',
                name  : 'title',
                _value: 'Logs & Reports - {0}',
                value : 'Live Sessions',
                reference: 'Title'
            },'-',
            {
                iconCls: 'close-softblue-16',
                tooltip: 'Close Reports',
                handler: 'onCloseReports'
            }
        ]
    },

    columns: [
        {
            name : 'statusTag',
            dataIndex   : 'status',
            width       : 24,
            sortable    : false,
            hideable    : false,
            menuDisabled: true,
            renderer  : function(v, m,r){
                var e = r.get('excluded'),
                    s = e ? Constants.Status.EXCLUDED:v,
                    tag = Constants.Icon.getIconClsByStatus(s);

                m.style='cursor:pointer';
                m.css=  m.css + ' '+tag+' ';
                m.tdAttr = 'data-qtip="' + s + '"';
            }
        },
        {
            name : 'name',
            dataIndex : 'name',
            flex : 1,
            text : 'Name'
        },
        {
            text     : 'Predecessors',
            xtype    : 'widgetcolumn',
            width    : 120,
            tdCls    : 'cursor-pointer',
            dataIndex: 'predecessorStats',
            hasClickListener : false,
            onWidgetAttach: function(c, w, r) {
                var me=this,d = r.get('predecessorStats');
                w.setValue(d.progress);
                w.setText(d.text);

                w.el.dom.onclick = function(e){
                    var xy = [e.clientX,e.clientY];
                    me.lookupController().showPredecessors(r.get('predecessorInstances'),xy);
                };
            },
            widget   : {
                xtype: 'progressbarwidget'
            }
        },
        {
            name: 'startDate',
            text: 'Start Date',
            dataIndex : 'startDateStr'
        },
        {
            name: 'endDate',
            text: 'End Date',
            dataIndex : 'endDateStr'
        },
        {
            name: 'duration',
            text: 'Duration',
            dataIndex : 'durationStr'
        },
        {
            name: 'avgDuration',
            text: 'Average Duration',
            dataIndex : 'avgDurationStr'
        },
        {
            text     : 'Progress',
            xtype    : 'widgetcolumn',
            width    : 120,
            dataIndex: 'progress',
            widget: {
                xtype: 'progressbarwidget',
                textTpl: [
                    '{percent:number("0")}% done'
                ]
            }
        },
        {
            name        : 'planName',
            text        : 'Plan Name',
            dataIndex   : 'planName',
            hidden      : false
        },
        {
            //todo
            name        : 'session',
            text        : 'Session',
            dataIndex   : 'planName',
            hidden      : true
        },
        {
            name : 'command',
            text : 'Command',
            flex : 1,
            dataIndex : 'command'
        }
    ]
});