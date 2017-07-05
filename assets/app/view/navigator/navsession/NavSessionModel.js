Ext.define('App.view.navigator.navsession.NavSessionModel',{
    extend  : 'Ext.app.ViewModel',
    alias   : 'viewmodel.navsession',
    data: {
        title : 'Sessions'
    },

    stores : {
        sessions: {
            source: 'SessionStore'
        },
        list : {

            autoLoad: true,
            type    : 'tree',
            root: {
                expanded: true
            },
            fields: [
                {name : 'val',  type : 'string'},
                {name : 'name', type : 'string'},
                {name : 'img' , type : 'string'},
                {name : 'count',type : 'string'}
            ],
            data  : [
                {
                    val     : Constants.ID.Session.all,
                    name    : 'All Tasks',
                    img     : "resources/img/all-tasks-16.png",
                    label   : 'ALL'
                },
                {
                    val     : Constants.ID.Session.ready,
                    name    : 'Ready',
                    img     : "resources/img/status/READY-16.png",
                    label   : Constants.Status.READY
                },
                {
                    val     : Constants.ID.Session.running,
                    name    : 'Running',
                    img     : "resources/img/status/RUNNING-16.png",
                    label   : Constants.Status.RUNNING
                },
                {
                    val     : Constants.ID.Session.success,
                    name    : 'Success',
                    img     : "resources/img/status/COMPLETED-16.png",
                    label   : Constants.Status.SUCCESS
                },
                {
                    val     : Constants.ID.Session.error,
                    name    : 'Error',
                    img     : "resources/img/status/ERROR-16.png",
                    label   : Constants.Status.ERROR
                },
                {
                    val     : Constants.ID.Session.blocked,
                    name    : 'Blocked',
                    img     : "resources/img/status/BLOCKED-16.png",
                    label   : Constants.Status.BLOCKED
                },
                {
                    val     : Constants.ID.Session.killed,
                    name    : 'Killed',
                    img     : "resources/img/status/KILLED-16.png",
                    label   : Constants.Status.KILLED
                },
                {
                    val     : Constants.ID.Session.excluded,
                    name    : 'Excluded',
                    img     : "resources/img/excluded-16.png",
                    label   : Constants.Status.EXCLUDED
                },
                {
                    val     : Constants.ID.Session.template,
                    name    : 'Template',
                    img     : "resources/img/square-dashed-16.png",
                    label   : 'TEMPLATE'
                }
            ]
        }
    }

});
