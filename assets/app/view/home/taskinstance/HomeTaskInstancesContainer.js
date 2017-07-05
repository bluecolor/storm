Ext.define('App.view.home.taskinstance.HomeTaskInstancesContainer',{
    xtype : 'hometaskinstancescontainer',
    extend: 'Ext.panel.Panel',

    requires: [
        'App.view.pool.textfield.SearchTextField',
        'App.view.home.taskinstance.HomeTaskInstances',
        'App.view.pool.button.RefreshButton',
        'App.view.widget.SessionCombo',
        'App.view.home.taskinstance.HomeTaskInstancesController',
        'App.view.home.taskinstance.HomeTaskInstancesModel'
    ],

    controller: 'hometaskinstances',
    viewModel : 'hometaskinstances',

    bodyPadding : 13,
    layout      : 'fit',

    tbar  : {
        name : 'tbar',
        margin: '',
        items: [
            {
                reference   : 'TaskGear',
                name        : 'gear',
                iconCls     : 'gear',
                handler     : 'onTaskInstancesMenu',
                disabled    : true
            },
            {
                xtype   : 'refreshbutton',
                handler : 'onReloadTaskInstances'
            },
            '-',
            {
                flex        : 1,
                xtype       : 'sessioncombo',
                name        : 'sessions',
                reference   : 'Sessions',
                bind: {
                    store: '{sessions}'
                },
                listeners: {
                    select: function(c,r){
                        var id = r.get('id');
                        this.lookupController().fireEvent('navsessionselect',id,undefined,true);
                    }
                }
            },
            {
                xtype : 'searchtextfield',
                emptyText: 'Search...',
                flex  : 2,
                listeners: {
                    change: function(f,v){
                        this.lookupController().onSearchTask(v);
                    }
                }
            }
        ]
    },


    items : [
        {
            reference: 'HomeTaskInstances',
            xtype    : 'hometaskinstances',
            hidden   : true,
            listeners: {
                selectionchange: 'onSelectionChange'
            }
        }
    ],


    initComponent: function() {
        var me = this;
        this.callParent(arguments);

        me.down('combo').on('homesessionselect',function(){
            me.down('hometaskinstances').setVisible(true);
        });
    }

});