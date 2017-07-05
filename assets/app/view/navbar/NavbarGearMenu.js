Ext.define('App.view.navbar.NavbarGearMenu',{
    extend: 'Ext.menu.Menu',
    xtype : 'navbargearmenu',

    items : [
        {
            text    : 'Issues <span style="color:red; font-weight: bold">beta</span>',
            iconCls : 'bug-16',
            name    : 'issues',
            hidden  : true
        },'-',
        {
            text    : 'Download Scheduler',
            iconCls : 'download',
            name    : 'downloadScheduler'
        },
        {
            text    : 'Upload Scheduler',
            //iconCls : 'upload',
            name    : 'uploadScheduler'
        },'-',
        {
            text    : 'SQL Editor <span style="color:red; font-weight: bold">beta</span>',
            iconCls : 'sql',
            name    : 'sqlEditor'
        },'-',
        {
            text    : 'Options',
            //icon    : "resources/img/control-16.png",
            name    : 'options'
        },
        {
            text    : 'Change Password',
            name    : 'changePassword',
            icon    : "resources/img/key-16.png"
        },
        {
            //icon    : "resources/img/advanced-16.png",
            text    : 'Application Settings',
            name    : 'appSettings'
        },
        {
            text    : 'Connections',
            name    : 'connections',
            icon    : "resources/img/connected-16.png"
        },
        {
            //icon    : "resources/img/alarm-clock-16.png",
            text    : 'Schedulers',
            name    : 'schedulers'
        },
        {
            text    : 'Parameters',
            name    : 'parameters',
            icon    : "resources/img/hash-16.png"
        },
        {
            icon    : "resources/img/user-16.png",
            text    : 'Users',
            name    : 'users'
        }
    ]


});
