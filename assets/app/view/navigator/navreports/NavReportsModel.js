Ext.define('App.view.navigator.navreports.NavReportsModel',{
    extend  : 'Ext.app.ViewModel',
    alias   : 'viewmodel.navreports',

    stores: {
        list : {

            autoLoad: true,
            type    : 'tree',
            root: {
                expanded: true
            },
            fields: [
                {name : 'val',  type : 'string'},
                {name : 'name', type : 'string'},
                {name : 'img' , type : 'string'}
            ],
            data  : [
                {
                    val     : Constants.ID.Reports.systemLogs,
                    name    : 'System Logs',
                    img     : 'resources/img/system-logs-16.png'
                },
                {
                    val     : Constants.ID.Reports.schedulers,
                    name    : 'Schedulers',
                    img     : 'resources/img/clock-softblue-16.png'
                },
                {
                    val     : Constants.ID.Reports.liveSessions,
                    name    : 'Live Sessions',
                    img     : 'resources/img/glasses-16.png'
                },
                {
                    val     : Constants.ID.Reports.owners,
                    name    : 'Owners',
                    img     : 'resources/img/user-16.png'
                }
            ]
        }
    }

});