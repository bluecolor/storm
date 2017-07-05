Ext.define('App.view.home.taskinstance.HomeTaskInstances',{
    xtype : 'hometaskinstances',
    extend: 'App.view.pool.grid.GridWithAction',

    requires: [
        'App.view.pool.textfield.SearchTextField'
    ],

    features: [{
        ftype: 'grouping',
        // groupHeaderTpl: '{name} ({rows.length} Task{[values.rows.length > 1 ? "s" : ""]})',
        hideGroupedHeader: true,
        startCollapsed: true,
        id: 'instanceGrouping'
    }],

    selModel: Ext.create('Ext.selection.CheckboxModel', {
        mode        : 'SIMPLE',
        checkOnly   : true,
        showHeaderCheckbox : true
    }),

    columnLines : false,
    border      : false,
    showSummary : false,

    viewConfig: {
        enableTextSelection: true,
        markDirty : false,
        mouseOverOutBuffer : false
    },

    bind: {
        store: '{taskInstances}'
    },

    columns: [
        {
            xtype : 'gearactioncolumn',
            listeners : {
                'actionclick' : 'onTaskInstanceMenu'
            }
        },
        {
            name : 'statusTag',
            dataIndex   : 'status',
            width       : 24,
            sortable    : false,
            hideable    : false,
            hidden      : false,
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
            name : 'status',
            text : 'Status',
            dataIndex   : 'status',
            renderer    : function(status, meta, record) {
                if(record.get('excluded')){
                    status = App.lib.Constants.Status.EXCLUDED;
                }

                return '<a class="session-status session-snapshot" style="color:{0}; ">{1}</a>'
                    .format(Constants.Color.getColorByStatus(status), status);
            }
        },
        {
            name : 'name',
            dataIndex : 'name',
            flex : 2,
            text : 'Name'
        },
        {
            text     : 'Predecessors',
            xtype    : 'widgetcolumn',
            width    : 120,
            tdCls    : 'cursor-pointer',
            dataIndex: 'predecessorStats',
            hasClickListener : false,
            flex : 1,
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
            dataIndex : 'startDateStr',
            hidden: true
        },
        {
            name: 'endDate',
            text: 'End Date',
            dataIndex : 'endDateStr',
            hidden: true
        },
        {
            name: 'duration',
            text: 'Duration',
            dataIndex : 'durationStr',
            hidden: true
        },
        {
            name: 'avgDuration',
            text: 'Average Duration',
            dataIndex : 'avgDurationStr',
            hidden: true
        },
        {
            text     : 'Progress',
            xtype    : 'widgetcolumn',
            width    : 120,
            dataIndex: 'progress',
            hidden: true,
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
            hidden      : true
        },
        {
            //todo
            name        : 'session',
            text        : 'Session',
            dataIndex   : 'planName',
            hidden      : true
        },
        {
            name : 'script',
            text : 'Command',
            flex : 1,
            dataIndex : 'script',
            hidden    : true
        }
    ],

    listeners: {
        cellclick: function(g, td, c, r, tr, ri, e, eo){
            var me = this;
            if(me.columns[c-1] && me.columns[c-1].name === 'statusTag'){
                me.lookupController().onDisplayLogs(r.data);
            }
        }
    },

    constructor: function(){
        var store = Ext.getStore(Constants.Store.TASK_INSTANCE);
        var me = this;
        var repaint= function(store){

            var painter = {
                paint: function (values) {
                    var pgId    = values.rows[0].data.primaryGroup.id,
                        pgName  = values.rows[0].data.primaryGroupName,
                        taskCnt = values.rows.length;

                    var status = store.groupStatus()[pgId],
                        color  = App.lib.Constants.Color.getColor(status);

                    return '<span style="color:{};">{}</span> ({} Task{})'
                        .format(color,pgName, taskCnt, taskCnt>1 ? 's':'');
                }
            };
            me.features[0].groupHeaderTpl = ['{[this.paint(values)]}', painter];
        };

        store.on('datachange',function(){
            repaint(store);
        });

        repaint(store);
        this.callParent(arguments);

    }



});