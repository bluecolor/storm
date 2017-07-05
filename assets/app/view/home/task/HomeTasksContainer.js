Ext.define('App.view.home.task.HomeTasksContainer',{
    extend: 'Ext.panel.Panel',
    xtype : 'hometaskscontainer',

    requires: [
        'App.view.home.task.HomeTasks',
        'App.view.home.task.HomeTasksController'
    ],

    controller  : 'hometasks',

    bodyPadding : 13,

    layout: 'fit',

    tbar  : {
        name : 'tbar',
        margin: '',
        items: [
            {
                reference: 'TaskGear',
                name    : 'gear',
                iconCls : 'gear',
                handler : 'onTasksMenu',
                disabled: true
            },
            {
                name    : 'newTask',
                iconCls : 'plus',
                handler : 'onNewTask',
                tooltip : 'New Task'
            },
            {
                name    : 'upload',
                iconCls : 'upload',
                handler : 'onUploadTask',
                tooltip : 'Upload Tasks'
            },
            {
                xtype   : 'refreshbutton',
                handler : 'onReloadTasks'
            },
            '-',
            {
                flex        : 1,
                xtype       : 'combo',
                name        : 'plans',
                reference   : 'Plans',
                editable    : false,
                emptyText   : 'Select a plan',
                queryMode   : 'local',
                displayField: 'name',
                valueField  : 'id',
                store       : Constants.Store.PLAN,
                matchFieldWidth: true,
                listeners : {
                    select: 'onHomePlanSelect'
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

    items: [
        {
            xtype       : 'hometasks',
            reference   : 'HomeTasks',
            hidden      : true,
            listeners : {
                selectionchange : 'onSelectionChange'
            }
        }
    ],

    listeners: {
        afterrender: function (me) {
            var s = Ext.getStore(Constants.Store.PLAN);
            if (s.getCount() > 0) {
                var cb = this.down('combo[name=plans]');
                cb.select(s.getAt(0).get('id'));
                cb.fireEvent('select',cb,s.getAt(0));
            }
        }
    }


});