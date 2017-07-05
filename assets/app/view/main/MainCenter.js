Ext.define('App.view.main.MainCenter',{

    extend  : 'Ext.panel.Panel',
    xtype   : 'maincenter',

    requires: [
        'App.view.home.Home',
        'App.view.taskinstance.TaskInstanceGrid',
        'App.view.task.TaskGrid',
        'App.view.quicklook.QuickLook',
        'App.view.reports.Reports',
        'App.view.pool.textfield.SearchTextField',
        'App.view.pool.button.RefreshButton'
    ],

    layout  : {
        type:'card',
        deferredRender:true
    },
    activeItem: 2, /* home */
    reference : 'MainCenter',

    items: [
        {  /* item 0 */
            layout: 'border',
            items : [
                {
                    region  : 'center',
                    xtype   : 'panel',
                    reference: 'TaskCenter',
                    split   : true,
                    layout  : 'card',
                    bodyPadding : '3px 0 0 0',
                    tbar   : {
                        manage : function(active){
                            switch(active){
                                case 'task' :
                                    this.activate('task');
                                    this.down('bootstraptoggle').setValue(false);
                                    break;
                                case 'taskInstance' :
                                    this.activate('taskInstance');
                                    this.down('bootstraptoggle').setValue(true);
                                    break;
                            }

                        },
                        activate : function(vg){
                            var me = this;
                            var items = me.items.items;
                            for(var i=0; i< items.length; i++){
                                if(items[i].viewGroups){
                                    items[i].setVisible($.inArray(vg,items[i].viewGroups) != -1);
                                }
                            }
                        },
                        name : 'tbar',
                        items: [
                            {
                                reference: 'SideMenuToggle',
                                hidden  : true,
                                iconCls : 'menu',
                                tooltip : 'Sidebar',
                                enableToggle: true,
                                pressed: false,
                                toggleHandler : 'onSideMenuToggle'
                            },
                            {
                                showNavbarCls   : 'arrow-down',
                                hideNavbarCls   : 'arrow-up',
                                iconCls         : 'arrow-up',
                                tooltip         : 'Navbar',
                                enableToggle    : true,
                                pressed         : true,
                                toggleHandler   : 'onNavbarToggle'
                            },'-',
                            {
                                viewGroups : ['task', 'taskInstance'],
                                xtype   : 'bootstraptoggle',
                                name    : 'taskSwitch',
                                onText  : 'Instance',
                                offText : 'Template',
                                offStyle: 'danger',
                                value   : true
                            },/*'-',
                            {
                                viewGroups : ['task', 'taskInstance'],
                                iconCls : 'window',
                                tooltip : 'Show task view options'
                            },'-',*/
                            {
                                viewGroups : ['task', 'taskInstance'],
                                xtype   : 'refreshbutton',
                                handler : 'onReloadTaskGrid'
                            },
                            {
                                name    : 'taskGear',
                                viewGroups : ['task', 'taskInstance'],
                                iconCls : 'gear',
                                handler : 'onTaskGear',
                                disabled: true
                            },'-',
                            {
                                name : 'download',
                                viewGroups : ['task'],
                                iconCls : 'download',
                                hidden  : true,
                                disabled: true,
                                handler : 'onDownloadTask'
                            },
                            {
                                viewGroups : ['task'],
                                iconCls : 'upload',
                                hidden  : true,
                                handler : 'onUploadTask'
                            },
                            {
                                viewGroups : ['task'],
                                iconCls : 'plus',
                                name    : 'addTask',
                                handler : 'onNewTask',
                                hidden  : true
                            },{xtype:'tbseparator',viewGroups : ['task']},
                            {
                                viewGroups : ['task', 'taskInstance'],
                                xtype : 'searchtextfield',
                                emptyText: 'Search...',
                                flex  : 1,
                                listeners: {
                                    change: 'onSearchTask'
                                }
                            }
                        ]
                    },
                    manageState : function(active){
                        this.down('toolbar').manage(active);
                        this.down('[name={0}]'.format(active)).deselectAll();
                    },

                    items   : [
                        {
                            xtype : 'taskinstancegrid',
                            name  : 'taskInstance',
                            listeners : {
                                activate : function(){
                                    this.up('panel[reference=TaskCenter]').manageState('taskInstance');
                                },
                                selectionchange : function(g, r){
                                    this.up('panel[reference=TaskCenter]')
                                        .down('toolbar [name=taskGear]')
                                        .setDisabled(r.length <= 0);
                                }

                            },
                            deselectAll : function(){
                                this.getSelectionModel().deselectAll();
                            }
                        },
                        {
                            name  : 'task',
                            xtype : 'taskgrid',
                            listeners : {
                                activate : function(){
                                    this.up('panel[reference=TaskCenter]').manageState('task');
                                },
                                selectionchange : function(g, r){
                                    var tb = this.up('panel[reference=TaskCenter]').down('toolbar');

                                    tb.down('[name=taskGear]').setDisabled(r.length <= 0);
                                    tb.down('[name=download]').setDisabled(r.length <= 0);
                                }
                            },
                            deselectAll : function(){
                                this.getSelectionModel().deselectAll();
                            }
                        }
                    ]
                },
                {
                    region  : 'south',
                    xtype   : 'quicklook',
                    split   : true
                }],
                listeners : {
                    add: function (c, i) {
                        if (i.xtype == 'bordersplitter') i.height = Constants.UI.borderSplitter.height;
                    }
            }
        },
        { /* item 1 */
            xtype : 'reports'
        },
        {/* item 2 */
            xtype : 'home'
        }
    ]

});
