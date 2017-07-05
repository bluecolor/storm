Ext.define('App.view.task.TaskGrid', {
    extend  : 'App.view.pool.grid.GridWithAction',
    xtype   : 'taskgrid',

    requires: [
        'App.view.task.TaskGridController',
        'App.view.task.TaskModel',
        'Ext.grid.*',
        'App.view.pool.column.GearActionColumn',
        'App.view.pool.column.ClickableStatusTagColumn',
        'App.view.pool.button.RefreshButton',
        'App.view.pool.textfield.SearchTextField',
        'App.view.widget.BootstrapToggle'
    ],


    controller : 'taskgrid',
    reference  : 'TaskGrid',

    store   : Constants.Store.TASK,
    border  : false,
    showSummary : false,
    columnLines : false,

    selModel: Ext.create('Ext.selection.CheckboxModel', {
        mode        : 'SIMPLE',
        checkOnly   : true,
        showHeaderCheckbox : true
    }),


    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name} ({rows.length} Task{[values.rows.length > 1 ? "s" : ""]})',
        hideGroupedHeader: true,
        startCollapsed: true,
        id: 'taskGrouping'
    }],


    columns: [
        {
            xtype : 'gearactioncolumn',
            listeners : {
                'actionclick' : 'onTaskMenu'
            }
        },
        {
            dataIndex   : 'excluded',
            width       : 24,
            sortable    : false,
            hideable    : false,
            menuDisabled: true,
            renderer  : function(v, m, r){
                var status;
                if(!r.get('active')){
                    status = Constants.Status.INACTIVE;
                }else if(v){
                    status = Constants.Status.EXCLUDED;
                }else {
                    status = Constants.Status.ACTIVE;
                }

                var tag = Constants.Icon.getIconClsByStatus(status);
                m.css=  m.css + ' '+tag+' ';
                m.tdAttr = 'data-qtip="' + status + '"';
            }
        },
        {
            name        : 'planName',
            text        : 'Plan Name',
            dataIndex   : 'planName',
            renderer    : function(v,m,r){
                return r.data.plan.name;
            }

        },
        {
            text        : 'Name',
            dataIndex   : 'name',
            flex        : 2
        },
        {
            text : 'Predecessors',
            name : 'predecessors',
            dataIndex : 'predecessors',
            align: 'center',
            renderer : function(v,m,r){
                if(_.isEmpty(v)){return 0;}
                m.style = 'cursor:pointer;';
                return v.length;
            }
        },
        {
            text        : 'Mask',
            dataIndex   : 'mask',
            flex        : 2
        },
        {
            text        : 'Script',
            dataIndex   : 'script',
            flex        : 1
        },
        {
            text        : 'Primary Group',
            dataIndex   : 'primaryGroup',
            flex        : 1,
            hidden      : false,
            renderer    : function(v, r){
                return v ? v.name : '';
            }
        },
        {
            text        : 'Critical?',
            dataIndex   : 'critical',
            renderer    : function(v, m, r) {
                var text = 'No';
                if(v){
                    m.style = 'color:#F58F84';
                    text = 'Yes';
                }else{
                    text = 'No';
                }
                return text;
            }
        },
        {
            text        : 'Active',
            dataIndex   : 'active',
            hidden      : true,
            renderer    : function(v) {
                return v ? 'Yes' : 'No';
            }
        }
    ],

    viewConfig: {
        enableTextSelection: true,
        markDirty : false,
        mouseOverOutBuffer : false
    },

    listeners : {
        cellclick : function(g, td, ci, r, tr, ri, e, eo){
            var n = g.getGridColumns()[ci].dataIndex;
            if(n=='predecessors'){
                this.lookupController().fireEvent('displaytaskpredecessors',r.data,e);
            }
        }
    }

});
