Ext.define('App.model.SchedulerModel', {
    extend: 'Ext.data.Model',

    idProperty : 'id',

    fields  : [
        {name : 'id'        , type : 'string'},
        {name : 'name'      , type : "string"},
        {name : 'connection', type : "auto"},
        {name : 'sessions'  , type : 'auto'},
        {
            name    : 'status',
            mapping : 'sessions',
            convert : function(sessions){
                var status = Constants.Status.NOT_RUNNING;

                if(_.isEmpty(sessions)){
                    return status;
                }

                _.each(sessions,function(session){
                    if(session.stats.RUNNING > 0){
                        status = Constants.Status.RUNNING;
                    }else if(status != Constants.Status.RUNNING){
                        status = Constants.Status.IDLE;
                    }
                });

                return status;
            }
        },
        {
            name    : 'taskStats',
            mapping : 'sessions',
            convert : function (sessions) {
                var stats = {
                    READY   : 0,
                    RUNNING : 0,
                    BLOCKED : 0,
                    ERROR   : 0,
                    SUCCESS : 0,
                    KILLED  : 0,
                    EXCLUDED: 0,
                    TOTAL   : 0
                };

                _.each(sessions,function(session){
                    stats.READY     += session.stats.READY   ? session.stats.READY:0;
                    stats.RUNNING   += session.stats.RUNNING ? session.stats.RUNNING:0;
                    stats.BLOCKED   += session.stats.BLOCKED ? session.stats.BLOCKED:0;
                    stats.ERROR     += session.stats.ERROR   ? session.stats.ERROR:0;
                    stats.SUCCESS   += session.stats.SUCCESS ? session.stats.SUCCESS:0;
                    stats.KILLED    += session.stats.KILLED  ? session.stats.KILLED:0;
                    stats.EXCLUDED  += session.stats.EXCLUDED? session.stats.EXCLUDED:0;
                });

                stats.TOTAL =
                    stats.READY     +
                    stats.RUNNING   +
                    stats.BLOCKED   +
                    stats.ERROR     +
                    stats.SUCCESS   +
                    stats.KILLED    +
                    stats.EXCLUDED;

                return stats;

            }
        },
        {
            name    : 'progress',
            convert : function(v, r){
                var stats = r.get('taskStats');
                return (stats.SUCCESS+stats.EXCLUDED)/stats.TOTAL;
            }
        }
    ]

});
