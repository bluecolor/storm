Ext.define('App.view.session.AllSessions', {
    extend: 'Ext.window.Window',
    xtype : 'allsessions',

    requires : [
        'App.view.session.AllSessionsController',
        'App.view.session.SessionModel',
        'App.view.pool.grid.GridWithAction',
        'App.view.pool.column.GearActionColumn',
        'App.view.pool.textfield.SearchTextField',
        'App.view.pool.button.RefreshButton'
    ],

    controller: 'allsessions',
    viewModel : {
        type: 'session'
    },


    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 975,
    height      : 575,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'fit',
    title       : 'Sessions',


    items : [
        {
            name: 'allSessionsGrid',
            reference: 'AllSessionsGrid',
            xtype  : 'gridwithaction',
            columnLines : false,
            tbar   : {
                name  : 'tbar',
                items : [
                    {
                        xtype: 'refreshbutton',
                        handler: 'onReloadSessions'
                    },'-',
                    {
                        name : 'search',
                        xtype: 'searchtextfield',
                        flex : 1,
                        listeners: {
                            change: 'onSearchSession'
                        }
                    }
                ]

            },
            bind : {
                store : '{sessions}'
            },
            columns: [
                {
                    xtype : 'gearactioncolumn',
                    listeners : {
                        'actionclick' : 'onSessionMenu'
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
                    dataIndex : 'date',
                    renderer: Ext.util.Format.dateRenderer('Y M j D H:i:s')
                },
                {
                    text        : "Parallel",
                    dataIndex   : 'parallel',
                    align       : 'center'
                }
            ]
        }
    ],

    listeners : {
        add : function (c, i) {
            if (i.xtype == 'bordersplitter') {
                i.width = Constants.UI.borderSplitter.size;
            }
        }
    }

});