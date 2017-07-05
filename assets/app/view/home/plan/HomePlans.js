Ext.define('App.view.home.plan.HomePlans',{
    extend: 'App.view.pool.grid.GridWithAction',
    xtype : 'homeplans',

    requires: [
        'App.view.home.plan.HomePlansController',
        'App.view.home.plan.HomePlansModel'
    ],

    controller  : 'homeplans',
    viewModel   : 'homeplans',

    border      : false,
    showSummary : false,
    columnLines : false,

    bind: {
        store: "{plans}"
    },

    columns: [
        {
            xtype : 'gearactioncolumn',
            listeners : {
                'actionclick' : 'onPlanActionMenu'
            }
        },
        {
            name        : 'protected',
            dataIndex   : 'protected',
            resizable   : false,
            width       : 30,
            menuDisabled: true,
            renderer: function(v, m){
                if(v){
                    m.css=  m.css + ' shield';
                    m.tdAttr = 'data-qtip="Plan is protected"';
                }else{
                    m.css=  '';
                    m.tdAttr = 'data-qtip="Plan is NOT protected"';
                }
            }
        },
        {
            name        : 'active',
            text        : 'Active?',
            dataIndex   : 'active',
            renderer: function(v, m){
                if(v){
                    m.style  =  'font-weight:bold;color:green;';
                }else{
                    m.style  =  'font-weight:bold;color:red;';
                }
                return v?'Yes':'No';
            }
        },
        {
            name        : 'name',
            text        : 'Name',
            dataIndex   : 'name',
            flex        : 1
        },
        {
            stat        : true,
            name        : 'totalTasks',
            text        : 'Total Tasks',
            dataIndex   : 'totalTasks',
            align       : 'center',
            tdCls       : 'snapshot-status-count',
            flex        : 1
        },
        {
            stat        : true,
            name        : 'activeTasks',
            text        : 'Active Tasks',
            dataIndex   : 'activeTasks',
            align       : 'center',
            tdCls       : 'snapshot-status-count',
            flex        : 1
        },
        {
            stat        : true,
            name        : 'inactiveTasks',
            text        : 'Inactive Tasks',
            dataIndex   : 'inactiveTasks',
            align       : 'center',
            tdCls       : 'snapshot-status-count',
            flex        : 1
        },
        {
            stat        : true,
            name        : 'excludedTasks',
            text        : 'Excluded Tasks',
            dataIndex   : 'excludedTasks',
            align       : 'center',
            tdCls       : 'snapshot-status-count',
            flex        : 1
        }
    ],

    viewConfig: {
        markDirty : false,
        mouseOverOutBuffer : false,
        enableTextSelection: true
    },

    listeners: {
        cellclick : function(g, td, ci, r, tr, ri, e, eo){
            var col = g.panel.headerCt.getHeaderAtIndex(ci);
            if(col.stat){
                var status,
                    planId = r.get('id');

                switch (col.name){
                    case 'totalTasks'   : status = undefined; break;
                    case 'activeTasks'  : status = Constants.Status.ACTIVE  ;break;
                    case 'inactiveTasks': status = Constants.Status.INACTIVE;break;
                    case 'excludedTasks': status = Constants.Status.EXCLUDED;break;
                }

                this.lookupController().fireEvent('displayplantasks',e, planId, status);
            }
        }
    }

});