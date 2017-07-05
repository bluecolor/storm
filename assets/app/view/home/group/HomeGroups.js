Ext.define('App.view.home.group.HomeGroups',{
    extend: 'App.view.pool.grid.GridWithAction',
    xtype : 'homegroups',

    requires: [
        'App.view.home.group.HomeGroupsController',
        'App.view.home.group.HomeGroupsModel'
    ],

    controller  : 'homegroups',
    viewModel   : 'homegroups',

    border      : false,
    showSummary : false,
    columnLines : false,

    viewConfig  : {
        enableTextSelection: true    
    },
    
    bind: {
        store: "{groups}"
    },

    

    columns: [
        {
            xtype : 'gearactioncolumn',
            listeners : {
                'actionclick' : 'onGroupActionMenu'
            }
        },
        {
            name        : 'name',
            text        : 'Name',
            dataIndex   : 'name',
            flex        : 1
        },
        {
            name        : 'parallel',
            text        : 'Parallel',
            dataIndex   : 'parallel',
            flex        : 1,
            align       : 'center'
        },
        {
            stat        : true,
            name        : 'tasks',
            text        : 'Tasks',
            dataIndex   : 'taskCount',
            flex        : 1,
            align       : 'center',
            tdCls       : 'snapshot-status-count'
        }
    ],

    listeners: {
        
        cellclick : function(g, td, ci, r, tr, ri, e, eo){
            var col = g.panel.headerCt.getHeaderAtIndex(ci);
            if(col.stat){
                var gid = r.get('id');
                this.lookupController().fireEvent('displaygrouptasks',gid,e);
            }
        }
    }

});