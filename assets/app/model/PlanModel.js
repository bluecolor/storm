Ext.define('App.model.PlanModel', {
    extend: 'Ext.data.Model',

    idProperty:'id',
    fields: [
        {name : "id",           type : "string"},
        {name : "name",         type : "string"},
        {name : "description",  type : "string"},
        {name : 'schedule' ,    type : 'string'},
        {name : 'scheduler',    type : 'auto'},
        {name : 'parallel',     type : 'int'},
        {name : 'active',       type : 'boolean'},
        {name : 'connection',   type : 'auto'},
        {
            name    : 'connectionId',
            type    : 'string',
            mapping : 'connection.name'
        },
        {
            name    : 'schedulerName',
            type    : 'string',
            mapping : 'scheduler.name'
        },
        {
            name    : 'schedulerId',
            type    : 'string',
            mapping : 'scheduler.id'
        },
        {
            name    : 'stats',
            type    : 'auto'
        },
        {
            name    : 'activeTasks',
            type    : 'int',
            mapping : 'stats.ACTIVE'
        },
        {
            name    : 'inactiveTasks',
            type    : 'int',
            mapping : 'stats.INACTIVE'
        },
        {
            name    : 'excludedTasks',
            type    : 'int',
            mapping : 'stats.EXCLUDED'
        },
        {
            name    : 'totalTasks',
            type    : 'int',
            mapping : 'stats.TOTAL'
        }
    ]
});
