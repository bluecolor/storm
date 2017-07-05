var Promise = require('bluebird');

module.exports = {


    find: function(id){
        if(_.isString(id)){
            return Plan.findOne(id);
        }else{
            return Plan.find(id);
        }
    },

    findByName: function(name){
        return Plan.find({name:name})
    },

    findByScheduler : function(schedulerId){
        var me = this;
        return me.findBySchedulerWithTaskStats(schedulerId);
    },

    findTasksByStatus: function(planId,status){
        
        if(!status){
            return Task.find({plan:planId});
        }else if(status == 'ACTIVE'){
            return Task.find({plan:planId, active:true});
        }else if(status == 'INACTIVE'){
            return Task.find({plan:planId, active:false});
        }else if(status == 'EXCLUDED'){
            return Task.find({plan:planId, excluded:true});
        }
    },

    findPlanTaskStatusStats: function(planId){

        return Task.find({plan:planId}).then(tasks=>{
            return _.reduce(tasks,function(r,t){
                r.active    += t.active ? 1 : 0;
                r.excluded  += t.excluded ? 1 : 0;
                r.total++;
                return r;
            },{active:0,excluded:0,total:0});
        });
    },


    findBySchedulerWithTaskStats: function(schId){

        return Plan.find({scheduler:schId}).populateAll().then(function(plans){
            var p = _.map(plans, 'id');
            return Task.find({plan:p}).then(function(tasks){
                return _.reduce(tasks,function(plnas,task){
                    var plan = _.find(plans,{id:task.plan});
                    if(!plan.stats){
                        plan.stats = {
                            ACTIVE   : 0,
                            INACTIVE : 0,
                            EXCLUDED : 0,
                            TOTAL    : 0
                        }
                    }
                    if(!task.active){
                        plan.stats.INACTIVE++;
                    }else{
                        plan.stats.ACTIVE++;
                        if(task.excluded){
                            plan.stats.EXCLUDED++;
                        }
                    }
                    plan.stats.TOTAL++;
                    return plans;
                },plans);
            });
        });
    },

    create: function(plans){
        return Plan.create(plans).then(function(plans){
            return plans;
        });
    },

    update: function(id,plan){
        return Plan.update(id, plan).then(function(p){
            return p;
        });
    },

    upload : function(plans){

        var scheduler = function(name){
            return Scheduler.findOne({name:name});
        };
        var connection= function(name){
            return Connection.findOne({name:name});
        };

        return Plan.find().then(function(_plans) {
            return Promise.all(_.map(plans, function (plan) {

                var sch = scheduler(plan.scheduler.name),
                    con = plan.connection?connection(plan.connection.name):Promise.resolve(),
                    p   = _.find(_plans, {name: plan.name});

                return Promise.all([con, sch]).spread((connection, scheduler)=> {
                    var newPlan = {
                        name        : plan.name,
                        parallel    : plan.parallel,
                        active      : plan.active,
                        description : plan.description,
                        schedule    : plan.schedule,
                        "protected" : plan.protected,
                        startAfter  : plan.startAfter,
                        scheduler   : scheduler.id
                    };
                    if(connection){
                        newPlan.connection = connection.id;
                    }

                    if (p) {
                        newPlan.id = p.id;
                        return Plan.update(p.id, newPlan).then(()=> {
                            return Plan.findOne(p.id);
                        });
                    } else {
                        return Plan.create(newPlan);
                    }
                });
            }));
        });
    },


    setActive : function(active, id) {
        return Plan.update(id,{active:active});
    },

    setProtected : function(p,id){
        return Plan.update(id,{'protected':p});
    },

    protect: function(id){
        var me = this;
        return me.setProtected(true,id);
    },
    unprotect: function(id){
        var me = this;
        return me.setProtected(false,id);
    },

    select : function(){

        var hasActiveTask = function(p){
            return p.tasks
                && p.tasks.length > 0
                && _.pluck(p.tasks,'active').indexOf(true) != -1;
        };
        var filter = function(plans){
            return _.filter(plans,hasActiveTask);
        };

        return Plan.findByActive(true).populate('tasks').then(filter);
    },

    validate: function(p) {
        
    },


    destroy : function(id){
        var destroy = function(){
            return Plan.destroy(id);
        };
        var destroySessions= function(){
            return SessionService.destroyByPlan(id);
        };

        UserService.onPlanDestroyed(id);

        return TaskService
            .destroyByPlan(id)
            .then(destroySessions)
            .then(destroy);
    },

    destroyByScheduler: function(schId){
        return Plan.destroy({scheduler:schId});
    }





};
