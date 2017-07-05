Ext.define('App.view.plan.PlanSessions',{
    extend : 'App.view.pool.list.BasicList',
    xtype  : 'plansessions',

    requires : [
        'App.view.pool.column.GearActionColumn'
    ],


    tbar   : {
        name: 'tbar',
        items: [
            {
                labelWidth: 40,
                xtype: 'combo',
                displayField: 'name',
                valueField: 'id',
                editable: false,
                queryMode: 'local',
                hidden: true
            },
            {
                name: 'date',
                xtype: 'combo',
                editable: false,
                labelWidth: 40,
                displayField: 'name',
                valueField: 'val',
                queryMode: 'local',
                bind: {
                    store: '{dateFilter}'
                },
                value: '_'
            },
            {
                name : 'd1',
                xtype: 'datefield'
            },
            {
                name : 'and',
                xtype: 'displayfield',
                value: 'and'
            },
            {
                name : 'd2',
                xtype: 'datefield'
            }
        ]
    },

    columns: [
        {
            xtype : 'gearactioncolumn',
            listeners : {
                'actionclick' : 'onSessionActionMenu'
            }
        },
        {
            name : 'statusTag',
            dataIndex   : 'status',
            width       : 24,
            sortable    : false,
            hideable    : false,
            menuDisabled: true,
            renderer  : function(v, m){
                var tag = Constants.Icon.getIconClsByStatus(v);
                m.css=  m.css + ' '+tag+' ';
                m.tdAttr = 'data-qtip="' + v + '"';
            }
        },
        {
            name : 'session',
            text : 'Session',
            flex : 1,
            dataIndex : 'shortName'
        },
        {
            name : 'plan',
            text : 'Plan',
            flex : 1,
            dataIndex : 'plan',
            renderer : function(v){
                if(v){
                    return v.name;
                }
            }
        },
        {
            name : 'date',
            text : 'Date',
            flex : 1,
            dataIndex : 'date'
        }
    ]


});