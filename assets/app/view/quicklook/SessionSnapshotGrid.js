Ext.define('App.view.quicklook.SessionSnapshotGrid',{
    extend  : 'App.view.pool.grid.GridWithAction',
    xtype   : 'sessionsnapshotgrid',

    requires    : [
        'Ext.grid.*',
        'App.view.pool.column.GearActionColumn',
        'App.view.pool.column.StatusTagColumn',
        'App.view.pool.button.RefreshButton',
        'App.view.pool.textfield.SearchTextField'
    ],

    header      : false,
    iconCls     : 'idea',
    collapsible : true,
    animCollapse: true,
    height      : 200,
    layout      : 'fit',
    columnLines : false,

    reference   : 'SessionSnapshotGrid',

    bind : {
        store : '{sessionSnapshot}'
    },


    dockedItems : {
        name    : 'tbar',
        xtype   : 'toolbar',
        dock    : 'left',
        items   : [
            {
                iconCls: 'collapse-16',
                handler: 'onCollapseQuickLook'
            },
            {
                xtype  : 'refreshbutton',
                handler: 'onReloadQuickLookSessions'
            }
        ]
    },


    viewConfig: {
        markDirty : false,
        mouseOverOutBuffer : false,
        getRowClass : function(r) {
            return 'session-snapshot';
        }
    },

    columns     : [
        {
            xtype       : 'gearactioncolumn',
            width       : 24,
            listeners : {
                'actionclick' : 'onSessionMenu'
            }
        },
        {
            xtype       : 'statustagcolumn',
            width       : 24,
            hidden      : true
        },
        {
            name : 'status',
            text : 'Status',
            dataIndex   : 'status',
            renderer    : function(status, meta, record) {
                return '<a class="session-status session-snapshot" style="color:{0}; ">{1}</a>'
                    .format(Constants.Color.getColorByStatus(status), status);
            }
        },
        {
            text        : "Parallel",
            dataIndex   : 'parallel',
            align       : 'center'
        },
        {
            text : 'Session',
            dataIndex : 'shortName',
            cellWrap: true,
            flex : 1,
            renderer    : function(v, m, r) {
                m.css = '{} {}'.format(m.css, 'session-snapshot');
                return v;
            }
        },
        {
            name : 'all',
            text : 'All',
            dataIndex : 'all',
            align: 'center',
            tdCls: 'snapshot-status-count'
        },
        {
            name : 'ready',
            text : 'Ready',
            dataIndex : 'ready',
            align: 'center',
            tdCls: 'snapshot-status-count'
        },
        {
            name : 'running',
            text : 'Running',
            dataIndex : 'running',
            align: 'center',
            tdCls: 'snapshot-status-count'
        },
        {
            name : 'success',
            text : 'Success',
            dataIndex : 'success',
            align: 'center',
            tdCls: 'snapshot-status-count'
        },
        {
            name : 'error',
            dataIndex : 'error',
            text : 'Error',
            align: 'center',
            renderer    : function(v, m, r) {
                if(v==0){
                    m.css = 'session-snapshot';
                }else{
                    m.style = 'font-weight:bold;color:#F30021'
                }
                return v;
            }
        },
        {
            name : 'blocked',
            text : 'Blocked',
            dataIndex : 'blocked',
            align: 'center',
            tdCls: 'snapshot-status-count'
        },
        {
            name : 'killed',
            text : 'Killed',
            dataIndex : 'killed',
            align: 'center',
            tdCls: 'snapshot-status-count'
        },
        {
            name : 'excluded',
            text : 'Excluded',
            dataIndex : 'excluded',
            align: 'center',
            tdCls: 'snapshot-status-count'
        }
    ],

    listeners : {
        cellclick : function(g, td, ci, r){
            var status = g.panel.headerCt.getHeaderAtIndex(ci).dataIndex;
            var statuses = ['ready','error','blocked','success','excluded','killed'];
            if (statuses.indexOf(status)==-1){
                status= undefined;
            }else {
                status = status.toUpperCase();
            }

            this.lookupController().onDisplayTaskInstances(r.data.id, status);
        },
        beforerender: function(){
            Ext.getStore(Constants.Store.SESSION).load();
        }
    }

});
