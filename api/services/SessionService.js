var Promise = require("bluebird");
var Status  = require('../constants/Status.js');
var Config  = require('../config/RunTime.js');
var later   = require('later');

module.exports = {


    findTasksByStatus: function(id,status){
        return TaskInstanceService.findBySessionAndStatus(id, status);
    },

    find : function(id){
        return _.isString(id) ? Session.findOne(id) : Session.find(id);
    },

    findLastSessionOfPlan: function(p){
        return Session.find({ where: { plan: p }, limit: 1, sort: 'date DESC' });
    },

    findLiveSessionStats: function(sch){

        return Session.find({
            status:[
                Status.RUNNING,
                Status.PAUSED,
                Status.READY],
            scheduler: sch
        }).then(function(sessions){
            var stats = _.map(sessions,function(s){
                return {
                    session  : s.id,
                    scheduler: s.scheduler,
                    stats    : {}
                };
            });
            return TaskInstance
                .find({session:_.map(sessions,'id')}).then(function(tasks){
                    return _.reduce(tasks,function(r,t){

                        var session= _.find(r,{session:t.session});
                        var status = t.excluded?Status.EXCLUDED:t.status;

                        if(!session.stats[status]){
                            session.stats[status] = 1;
                        }else{
                            session.stats[status]++;
                        }
                        return r;
                    },stats);
                });
        });
    },

    findLiveSessions : function(scheduler){
        return Session.find({
            status:[
                Status.RUNNING,
                Status.PAUSED,
                Status.READY],
            scheduler: scheduler
        });
    },

    findSchedulerSessions : function(scheduler){
        return Session.find({scheduler:scheduler}).populateAll();
    },

    createSessionForPlan : function(plan, date){

        var me = this;

        var q = {
            'plan': plan.id,
            'status': [Status.READY,Status.RUNNING,Status.PAUSED]
        };

        var session = {
            plan     : plan.id,
            date     : date,
            status   : Status.READY,
            startDate: undefined,
            endDate  : undefined,
            taskInstances : [],
            scheduler: plan.scheduler
        };
        var process = function(p){
            if(p.length>0) return Promise.resolve([]);
            var sessionPromise = Session.create(session);
            var taskInstancePromise = sessionPromise.then(TaskInstanceService.create);
            return Promise.all([sessionPromise,taskInstancePromise])
                .spread((session)=>{
                    return Session.findOne(session.id).populateAll();
                });
        };
        return Session.find(q).populate('plan',{protected:true}).then(process);

    },

    createNextSession : function(plan){

        var me = this;
        var ws = Config.planSessionWindowSize;
        var sortByDate = function(a,b){
            return a.getTime()-b.getTime();
        };
        var schedule = later.parse.text(plan.schedule);
        var sessionWindow = later.schedule(schedule).prev(ws).sort(sortByDate);
        var createOldest = function(existingSessions){

            var time;
            var missingSessionDates = _.difference(
                sessionWindow.map(s=>s.getTime()),
                existingSessions.map(s=>s.date.getTime())
            );
            if(_.isEmpty(missingSessionDates)){return;}
            time = _.first(missingSessionDates.sort());
            return me.createSessionForPlan(plan,new Date(time));
        };
        var query = {
            'plan' : plan.id,
            'date' : {'>=' : _.first(sessionWindow)}
        };
        return Session.find(query).then(createOldest);
    },

    updateAsRunning : function(sessions){

        var update = function(session){
            return Session.update(session.id, {
                status      : Status.RUNNING,
                startDate   : new Date()
            }).then(function(){
                return Session.findOne(session.id);
            });
        };
        return Promise.map(sessions, update);
    },

    tryComplete : function(s){

        var incompleteStatus = [
            Status.ERROR,
            Status.READY,
            Status.BLOCKED,
            Status.KILLED,
            Status.RUNNING
        ];

        var complete = function(c){
            if(c!=0) return;
            sails.log.info('Completing session ' + s)
            return Session.update(s,{
                status  : Status.COMPLETED,
                endDate : new Date()
            });
        };

        return TaskInstance.count().where({
            session : s,
            status  : incompleteStatus,
            excluded: false
        }).then(complete);
    },

    play : function(s){

        var validate = function(session){
            if(!Status.from(session.status).to(Status.READY)){
                throw 'Can not play session in status "'+session.status+'"';
            }
            return session;
        };

        var update = function(sessions){
            var p =_.map(sessions,function(session){
                var s = validate(session);
                return Session.update(session.id,{status:Status.READY})
            });
            return Promise.all(p);
        };

        return Session.find({
            id: s,
            status:{ '!' : [Status.RUNNING]}
        }).then(update).then(()=>{
            return Session.find(s);
        });
    },

    replay: function(s){

        var validate = function(session){
            if(!Status.from(session.status).to(Status.READY)){
                throw 'Can not play session in status "'+session.status+'"';
            }
            return session;
        };

        var update = function(sessions){
            var p =_.map(sessions,function(session){
                var s = validate(session);
                return Session.update(s.id,{status:Status.READY})
            });
            return Promise.all(p);
        };

        return TaskInstanceService.makeSessionTasksReady(s).then(()=>{
            return Session.find(s);
        }).then(update).then(()=>{
            return Session.find(s);
        });

    },

    pause: function(s){
        return Session.update(s,{status:Status.PAUSED}).then(()=>{
            return Session.findOne(s);
        });
    },

    makeSessionRunning: function(s){
        var me = this;
        return Session.find(s).where({status:Status.READY}).then(me.updateAsRunning);
    },

    makeSessionCompleted: function(s){
        var me = this;
        var tryComplete = function(sessions){

            if(_.isEmpty(sessions)){
                return Promise.resolve();
            }

            return Promise.map(sessions, function(session){
                return me.tryComplete(session.id);
            });
        };

        return Session.find(s)
            .where({status:[Status.READY,Status.RUNNING]})
            .then(tryComplete);
    },


    boot: function(){
        return Session
            .update({status:Status.RUNNING},{status:Status.READY})
            .then(TaskInstanceService.boot)
    },

    setParallel: function(id,parallel){
        if(!_.isNumber(parallel)){
            throw 'Invalid parallel level number ' +parallel;
        }
        return Session
            .update(id, {parallel:parallel})
            .then(()=>{
                return Session.findOne(id);
            });
    },

    destroy : function(sid){
        var destroyTaskInstances = function(s){
            if(!_.isEmpty(s)){
                return TaskInstanceService.destroyBySession(_.map(s,'id'));
            }
            return [];
        };
        var destroySession = function(){
            return Session.destroy(sid);
        };

        return Session.find(sid).then(destroyTaskInstances).then(destroySession);
    },

    destroyByPlan : function(plan) {
        var me = this;
        return Session.find({plan:plan}).then(function(sessions){
            return me.destroy(_.pluck(sessions,'id'));
        });
    },

    destroyByScheduler: function(sch){
        return Session.find({scheduler:sch}).then((sessions)=>{
            if(!_.isEmpty(sessions)){

                return Session.destroy({id:_.map(sessions,'id')}).then(()=>{
                    return sessions;
                });
            }else{
                return Promise.resolve();
            }

        });
    }


};

