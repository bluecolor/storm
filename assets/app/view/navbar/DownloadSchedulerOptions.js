Ext.define('App.view.navbar.DownloadSchedulerOptions',{
    extend: 'Ext.window.Window',
    xtype : 'downloadscheduleroptions',

    requires: [
        'App.view.navbar.DownloadSchedulerOptionsController'
    ],

    controller: 'downloadscheduleroptions',

    width : 300,
    height: 350,

    modal: true,
    collapsible: false,
    maximizable: false,
    layout: 'form',
    closeAction: 'destroy',
    title: 'Download Scheduler Options',
    bodyPadding: 10,


    tbar : {
        name  : 'tbar',
        items : [
            {
                iconCls: 'checked-box',
                name   : 'checkAll',
                handler: 'checkAll'
            },
            {
                iconCls: 'unchecked-box',
                name   : 'unCheckAll',
                handler: 'unCheckAll'
            }
        ]
    },

    items : [
        {
            xtype: 'displayfield',
            value: 'Select objects to download'
        },
        {
            reference: 'Options',
            xtype   : 'checkboxgroup',
            columns : 1,
            vertical: true,
            fieldLabel: 'Objects',
            items   : [
                {boxLabel: 'Connections', name: 'connections'  , inputValue: true, checked:true},
                {boxLabel: 'Parameters', name: 'parameters', inputValue: true},
                {boxLabel: 'Users', name: 'users', inputValue: true},
                {boxLabel: 'Scheduler' , name: 'scheduler', inputValue: true},
                {boxLabel: 'Plans' , name: 'plans', inputValue: true},
                {boxLabel: 'Groups', name: 'groups', inputValue: true},
                {boxLabel: 'Tasks', name: 'tasks', inputValue: true}
            ],
            listeners: {
                change: 'onOptionSelectionChange'
            }
        }
    ],

    buttons: [
        {
            reference: 'DownloadButton',
            text: 'Download',
            name: 'download',
            handler: 'onDownloadScheduler'
        }
    ]



});