module.exports = {


    taskInstance: {
        // todo populate scheduler
        onError: function(e){
            sails.sockets.blast('TaskInstanceError', e);
        },
        onStatusUpdate: function(m){
            sails.sockets.blast('TaskInstanceStatusUpdate', m);
        }
    },

    scheduler: {
        onDestroy: function(sch){
            sails.sockets.blast('SchedulerDestroyed', sch);
        }
    }

};