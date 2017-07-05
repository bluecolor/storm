Ext.define('App.view.home.group.HomeGroupsContainer',{
    extend: 'Ext.panel.Panel',
    xtype : 'homegroupscontainer',

    requires: [
        'App.view.home.group.HomeGroups',
        'App.view.home.group.HomeGroupsController'
    ],

    controller  : 'homegroups',

    bodyPadding : 13,

    tbar  : {
        name : 'tbar',
        margin: '',
        items: [
            {
                iconCls : 'plus',
                name    : 'newGroup',
                handler : 'onCreateGroup',
                tooltip : 'Create New Group'
            },
            '-',
            {
                xtype   : 'refreshbutton',
                handler : 'onReloadGroups'
            },
            '-',
            {
                xtype : 'searchtextfield',
                emptyText: 'Search...',
                flex  : 2,
                listeners: {
                    change: function(me,nv){
                        this.lookupController().onSearchGroup(nv);
                    }
                }
            }
        ]
    },

    items: [
        {
            xtype       : 'homegroups',
            reference   : 'HomeGroups',
            hidden      : false
        }
    ]


});