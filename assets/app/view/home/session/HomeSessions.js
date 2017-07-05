Ext.define('App.view.home.session.HomeSessions',{
    xtype : 'homesessions',
    extend: 'App.view.pool.grid.GridWithAction',

    requires: [
        'App.view.home.session.HomeSessionsModel'
    ],

    viewModel: 'homesessions',

    bind: {
        store: '{sessions}'
    },

    columnLines : false,
    reference   : 'HomeSessions',

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
            align       : 'center',
            hidden      : true
        },
        {
            text : 'Session',
            dataIndex : 'shortName',
            cellWrap: true,
            flex : 1
        },
        {
            stat      : true,
            name      : 'all',
            text      : 'All',
            dataIndex : 'all',
            align: 'center',
            tdCls: 'snapshot-status-count'
        },
        {
            stat : true,
            name : 'ready',
            text : 'Ready',
            dataIndex : 'ready',
            align: 'center',
            tdCls: 'snapshot-status-count'
        },
        {
            stat : true,
            name : 'running',
            text : 'Running',
            dataIndex : 'running',
            align: 'center',
            tdCls: 'snapshot-status-count'
        },
        {
            stat : true,
            name : 'success',
            text : 'Success',
            dataIndex : 'success',
            align: 'center',
            tdCls: 'snapshot-status-count'
        },
        {
            stat : true,
            name : 'error',
            dataIndex : 'error',
            text : 'Error',
            align: 'center',
            renderer    : function(v, m, r) {
                if(v==0){
                    m.css = 'session-snapshot';
                }else{
                    m.style = 'font-weight:bold;color:#F30021;cursor:pointer;';
                }
                return v;
            }
        },
        {
            stat : true,
            name : 'blocked',
            text : 'Blocked',
            dataIndex : 'blocked',
            align: 'center',
            tdCls: 'snapshot-status-count'
        },
        {
            stat : true,
            name : 'killed',
            text : 'Killed',
            dataIndex : 'killed',
            align: 'center',
            tdCls: 'snapshot-status-count'
        },
        {
            stat : true,
            name : 'excluded',
            text : 'Excluded',
            dataIndex : 'excluded',
            align: 'center',
            tdCls: 'snapshot-status-count'
        }
    ],

    listeners: {
        cellclick : function(g, td, ci, r, tr, ri, e, eo){
            var col = g.panel.headerCt.getHeaderAtIndex(ci);
            if(col.stat){
                var status = col.name.toUpperCase(),
                    sid = r.get('id');

                this.lookupController().fireEvent('displaysessiontasks',e, sid, status);
            }
        }
    },



    constructor: function(){
        var me = this;
        me.callParent(arguments);
        /* todo find another way */
        me.on('beforerender',function(){
           Ext.getStore(Constants.Store.SESSION).load();
        });
    }



});