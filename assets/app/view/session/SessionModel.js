Ext.define('App.view.session.SessionModel',{
    extend  : 'Ext.app.ViewModel',
    alias   : 'viewmodel.session',
    data: {
        title : 'Sessions'
    },

    stores : {
        dateFilter : {
            autoLoad: true,
            fields: [
                {name : 'val',  type : 'string'},
                {name : 'name', type : 'string'}
            ],
            data  : [
                {
                    name : 'All',
                    val  : '_'
                },
                {
                    val     : '>',
                    name    : 'Greater Than'
                },
                {
                    val     : '<',
                    name    : 'Less Than'
                },
                {
                    val     : 'between',
                    name    : 'Between'
                },
                {
                    name : 'Equals',
                    val  : '='
                }
            ]
        },
        sessions : {
            source: 'SessionStore'
        },
        lastSessions : {
            source: 'SessionStore'
        },
        plans: {
            source: 'PlanStore'
        }
    }

});