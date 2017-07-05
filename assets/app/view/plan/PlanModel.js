Ext.define('App.view.plan.PlanModel',{
    extend : 'Ext.app.ViewModel',
    alias  : 'viewmodel.plan',

    stores : {
        plans : {
            source : 'PlanStore'
        },
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
                    name    : 'Date Greater Than'
                },
                {
                    val     : '<',
                    name    : 'Date Less Than'
                },
                {
                    val     : 'between',
                    name    : 'Date Between'
                },
                {
                    name : 'Date Equals',
                    val  : '='
                }
            ]
        },
        connections: {
            source : 'ConnectionStore'
        }
    }

});