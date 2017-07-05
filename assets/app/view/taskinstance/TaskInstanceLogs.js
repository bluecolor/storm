Ext.define('App.view.taskinstance.TaskInstanceLogs',{
    extend: 'App.view.pool.list.BasicList',
    xtype : 'taskinstancelogs',

    bind: {
        store: '{logs}'
    },

    hideHeaders : false,

    columns: [
        {
            text: 'Status',
            name: 'status',
            dataIndex: 'status',
            renderer: function(v,m){
                m.style = 'color:{};font-weight:bolder;'
                    .format(Constants.Color.getColorByStatus(v));
                return v;
            }
        },
        {
            text: 'Log',
            name: 'log',
            dataIndex: 'log',
            flex: 1
        },
        {
            text: 'Date',
            name: 'date',
            dataIndex: 'createdAt'
        },
        {
            text: 'Owner',
            name: 'owner',
            dataIndex: 'ownerName'
        }
    ],

    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : new Ext.XTemplate(
            '<p><b>Log:</b> {log}</p>'
            )
    }],

    listeners : {
        activate: 'loadLogs'
    }

});