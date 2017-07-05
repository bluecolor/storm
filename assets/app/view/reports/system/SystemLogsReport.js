Ext.define('App.view.reports.system.SystemLogsReport',{
    extend : 'App.view.pool.list.BasicList',
    xtype  : 'systemlogsreport',

    /*title  : 'Logs & Reports - System Logs',*/

    requires: [
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.toolbar.Paging'
    ],

    bind : {
        store: '{logs}'
    },

    tbar: {
        name : 'tbar',
        items: [
            '->',
            {
                xtype : 'displayfield',
                name  : 'title',
                _value: 'Logs & Reports - {0}',
                value : '',
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
            name: 'level',
            dataIndex: 'level',
            renderer: function(v,m){

                switch (v){
                    case 'INFO'   : m.style = 'color:#4385F6;'; break;
                    case 'WARNING': m.style = 'color:#FBBD06;'; break;
                    case 'ERROR'  : m.style = 'color:#F04438;'; break;
                }
                return v;
            }
        },
        {
            name: 'date',
            dataIndex: 'createdAt',
            flex: 1
        },
        {
            name: 'log',
            dataIndex: 'log',
            flex: 1
        },
        {
            name: 'owner',
            dataIndex: 'ownerName',
            flex: 1
        }
    ],

    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : new Ext.XTemplate(
            '<p><b>Log:</b> {log}</p>'
        )
    }],

    bbar: {
        name : 'bbar',
        items: [
            {
                xtype: 'pagingtoolbar',
                bind : {store:'{logs}'},
                displayInfo: true,
                displayMsg: 'Displaying logs {0} - {1} of {2}',
                emptyMsg: "No logs to display"
            }
        ]
    }

});