Ext.define('App.view.reports.owner.OwnerReport', {
    extend: 'Ext.panel.Panel',
    xtype: 'ownerreport',

    requires: [
        'App.view.reports.owner.OwnerReportModel',
        'App.view.reports.owner.OwnerReportController',
        'App.view.pool.list.BasicList',
        'App.view.pool.textfield.SearchTextField'

    ],

    viewModel: 'ownerreport',
    controller: 'ownerreport',

    layout: 'fit',


    bodyPadding: 25,

    defaults: {
        bodyPadding: 15
    },

    tbar: {
        name: 'tbar',
        items: [
            {
                iconCls: 'reload',
                tooltip: 'Refresh',
                name: 'reload',
                handler: 'onReload'
            },
            {
                name  : 'search',
                xtype : 'searchtextfield',
                emptyText: 'Search...',
                flex  : 1,
                listeners: {
                    change: function(f,t){
                        this.lookupController().onSearchOwner(t);
                    }
                }
            },
            '-',
            {
                xtype: 'displayfield',
                name: 'title',
                _value: 'Logs & Reports - {0}',
                value: 'Owners',
                reference: 'Title'
            }, '-',
            {
                iconCls: 'close-softblue-16',
                tooltip: 'Close Reports',
                handler: 'onCloseReports'
            }
        ]
    },


    items: [{
            xtype: 'panel',
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            items : [
                {
                    name : 'ownerList',
                    xtype: 'grid',
                    reference: 'OwnerList',
                    emptyText: 'Owner report empty!',
                    flex : 1,
                    cls  : 'tiny-list',
                    bind : {
                        store : '{owners}'
                    },
                    columns: [
                        {
                            name: 'username',
                            text: 'Username',
                            dataIndex: 'username',
                            flex: 1,
                            menuDisabled:true
                        },
                        {
                            name: 'name',
                            text: 'Name',
                            dataIndex: 'name',
                            flex: 1,
                            menuDisabled:true
                        },
                        {
                            name: 'email',
                            text: 'Email',
                            dataIndex: 'email',
                            flex: 1,
                            menuDisabled:true
                        },
                        {
                            stat: true,
                            name: 'userTaskCount',
                            text: 'User Task Count',
                            dataIndex: 'ownedTaskCount',
                            flex: 1,
                            align: 'center',
                            tdCls: 'snapshot-status-count'
                        }
                    ],
                    listeners: {
                        cellclick : function(g, td, ci, r, tr, ri, e, eo){
                            var col = g.panel.headerCt.getHeaderAtIndex(ci);

                            if(col.stat){
                                var status, userId = r.data.owner.id;
                                this.lookupController().fireEvent('displayusertasks',e, userId, status);
                            }
                        }
                    }
                }
            ]
        }
    ]

});