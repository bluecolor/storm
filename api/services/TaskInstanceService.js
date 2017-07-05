
var Status  = require('../constants/Status.js'),
    TaskInstanceError = require('../error/TaskInstanceError.js'),
    TaskInstanceStatusMessage = require('../message/TaskInstanceStatusMessage.js'),
    Promise = require('bluebird'),
    util    = require('util'),
    _       = require('lodash');

module.exports = {

    findErrors: function(){
        var me = this;

        return TaskInstance.find({status:Status.ERROR})
            .populate('session')
            .populate('predecessors')
            .then(me._populateTaskInstance)
            .then(me._populatePredecessorInstances);
    },

    find: function (id) {
        var me = this;
        return TaskInstance.find(id)
            .populate('session')
            .populate('predecessors')
            .then(me._populateTaskInstance)
            .then(me._populatePredecessorInstances);
    },

    findAll: function(){
        return TaskInstance.findAll()
            .populate('session')
            .populate('predecessors')
            .then(me._populateTaskInstance)
            .then(me._populatePredecessorInstances);
    },

    findBySession: function (sid) {
        if(!sid){
            return;
        }

        var me = this;
        var findBySession = function(session){
            return TaskInstance.find({session: session.id})
                .populate('session')
                .populate('predecessors')
                .then(me._populateTaskInstance)
                .then((instances)=>{
                    if(session && !_.isEmpty(instances)){
                        return me._populatePredecessorInstances(instances,session.date);
                    }else{
                        return [];
                    }
                });
        };

        return SessionService.find(sid).then(findBySession);
    },


    findBySessionAndStatus: function(sid, status){
        var me = this;

        if(!status){
            return me.findBySession(sid);
        }

        var findBySession = function(session){
            var promise = undefined;

            if(status == 'EXCLUDED'){
                promise = TaskInstance.find({session: sid, excluded:true});
            }else{
                promise = TaskInstance.find({session: sid, status: status, excluded:false});
            }

            return promise
                .populate('session')
                .populate('predecessors')
                .then(me._populateTaskInstance)
                .then((instances)=>{
                    if(session && !_.isEmpty(instances)){
                        return me._populatePredecessorInstances(instances,session.date);
                    }else{
                        return [];
                    }
                });
        };

        return SessionService.find(sid).then(findBySession);
    },



    findByStatus : function(status){
        var me = this;

        return TaskInstance.find({status:status})
            .populate('session')
            .populate('predecessors')
            .then(me._populateTaskInstance)
            .then(me._populatePredecessorInstances);
    },

    _populateTaskInstance(instances,sessionId){

        if(_.isEmpty(instances)){
            return [];
        }

        if(!sessionId && !_.isEmpty(instances)){
            sessionId = instances[0].session.id;
        }

        var session = SessionService.find(sessionId).populate('plan');
        var tasks = Task.find(_.map(instances,'task')).populateAll();


        return Promise.all([tasks, session]).spread(function(tasks, session){
            var plan = session.plan;

            return instances.map(instance=>{
                var task =  _.find(tasks,{id:instance.task});
                instance.session.plan = plan;
                instance.task   = _.clone(task);
                instance.groups = task.groups;
                return instance;
            });
        });

    },

    _indexByTask : (data)=> {
        return _.chain(data).indexBy('task.id').mapValues().value();
    },

    findLastSessions: function(date){
        var promise;

        if(date){
            promise = Session.find({date: {'<=':date}});
        }else{
            promise = Session.find();
        }

        return promise.then(function (sessions) {
            return _.chain(sessions).groupBy('plan').reduce(function(result,sessions){
                var session = _.chain(sessions).sortByOrder('date','DESC').first().value();
                result.push(session);
                return result;
            },[]).value();
        });
    },
    
    _populatePredecessorInstances: function(instances,date){
        var me = this;
        var instanceIndexByTask = function(sessions){

            /* performance improvement */
            var tasks = _.chain(instances).reduce(function(result, instance){
                var p = _.map(instance.predecessors,'id');
                if(!_.isEmpty(p)){
                    result = result.concat(p);
                }
                return result;
            },[]).uniq().value();

            /* if date is undefined latest instance by task index */
            return TaskInstance.find({session:sessions, task: tasks})
                .populate('session')
                .populate('task')
                .then(me._indexByTask);
        };

        var populate = (indexed)=>{

            var populateInstance = (instance)=>{

                if(instance.predecessors && !_.isEmpty(instance.predecessors)){
                    var pi = _.reduce(instance.predecessors, (p,task)=>{
                        var instance = indexed[task.id];
                        if(instance){
                            p.push(instance);
                        }
                        return p;
                    },[]);
                    instance.predecessorInstances = pi;
                }
                return instance;
            };


            return _.map(instances,populateInstance);
        };

        return me.findLastSessions(date).then(function(sessions){
            return instanceIndexByTask(_.map(sessions,'id')).then(populate)
        });
    },

    create: function (session, u) {

        var me=this;

        var planTasks = ()=>{
            return Task.find({plan: session.plan}).populateAll();
        };

        var avgDurationByTask= (tasks)=>{
            var taskIds = _.pluck(tasks,'id');
            var reduce=(result)=>{
                if(_.isEmpty(result)) {return;}
                return _.chain(result).indexBy('task').mapValues('duration').value();
            };
            return TaskInstance.find({
                status : {'!':[Status.EXCLUDED,Status.ERROR,Status.BLOCKED]},
                task   : taskIds
            }).groupBy('task').average('duration').then(reduce);
        };

        var process = function(tasks){

            var createInstances = function(avg){

                var makeInstance= (task) => {
                    var predecessors = undefined;
                    if(task.predecessors){
                        predecessors = _.pluck(task.predecessors,'id');
                    }

                    return {
                        session     : session.id,
                        task        : task.id,
                        connection  : task.connection,
                        excluded    : task.excluded,
                        status      : Status.READY,
                        technology  : task.technology,
                        script      : task.script,
                        critical    : task.critical,
                        order       : task.order,
                        predecessors: predecessors,
                        avgDuration : avg?avg[task.id]:0
                    };
                };
                var instances =_.chain(tasks).filter(t=>t.active).map(makeInstance).value();
                var promise = TaskInstance.create(instances);
                promise.then((i)=>{
                    var lg = {
                        log: 'Created '+i.length+ 'task instances(s)',
                        owner: u
                    };
                    return LogService.debug(lg);
                });
                return promise;
            };
            return avgDurationByTask(tasks).then((avg)=>{return createInstances(avg);});
        };

        return planTasks().then(process);
    },

    /**
     * @param session session containing task-sessions
     * @param n number of tasks to return
     */
    findExecutableTasks: function (session) {

        var me = this, limit = session.plan.parallel;

        var findQuota = function(){

            return TaskInstance.find({status: Status.RUNNING})
                .then(me._populateTaskInstance)
                .then(instances=> {
                    var result = {};

                    var groups = _.chain(instances).pluck('groups').flatten().value();

                    return _.reduce(groups, (result, group)=> {
                        var groupId = group.id;
                        if (!result[groupId]) {
                            result[groupId] = {
                                running: 0,
                                limit: group.parallel,
                                quota: function () {
                                    return this.limit - this.running;
                                }
                            }
                        }
                        result[groupId].running++;
                        return result;
                    }, {});
                });
        };


        var instances = function(){
            return TaskInstance.find({
                session : session.id,
                status  : Status.READY,
                excluded: false
            })
                .populate('session')
                .populate('predecessors')
                .then(me._populateTaskInstance)
                .then(function(instances){
                    return me._populatePredecessorInstances(instances,session.date);
                });
        };

        var findExecutables = (instances,completedInstances,groupQuota) => {


            var checkPredecessors = (instance) => {

                if(_.isEmpty(instance.predecessorInstances)){
                    return true;
                }
                var completed = _.pluck(completedInstances,'id');
                var completedPredecessors = _.pluck(instance.predecessorInstances,'id');
                return _.difference(completedPredecessors, completed).length == 0;
            };
            var checkGroupQuota = (instance) => {
                var quota = _.reduce(instance.groups,(result,group)=>{
                    var q;

                    if(groupQuota[group.id]){
                        q = groupQuota[group.id].quota();
                    }else{
                        q = 1;
                    }

                    result += q;

                    return result;
                },0);
                return quota > 0;
            };

            var selected = _.chain(instances)
                .filter(checkPredecessors)
                .filter(checkGroupQuota)
                .sortBy('order')
                .first(limit)
                .value();


            return selected;
        };

        return Promise.join(
            instances(),
            TaskInstance.find(
                {
                    'or' : [
                        {excluded:true},
                        {status  :Status.getCompleteStatuses()}
                    ]
                }
            ),
            findQuota(),
            findExecutables);
    },
    
    updateByQuery: function (q, u) {
        return TaskInstance.update(q, u);
    },

    exclude: function (t,u) {
        var me = this;

        var validate = function(){
            return TaskInstance.find(t).then(function(instances){
                _.each(instances,function(instance){
                    if (!Status.from(instance.status).to(Status.EXCLUDED)) {
                        throw util.format('Tasks in status "%s" can not be EXCLUDED', instance.status);
                    }
                });
                return instances;
            });
        };

        return validate().then(function(){
            return TaskInstance.update(t, {excluded: true}).then(function(){
                me.logStatusChange(t, u);
                return TaskInstance.find(t);
            });
        });
    },
    include: function (t) {
        return TaskInstance.update(t, {excluded: false});
    },

    block: function (t, u) {

        var me = this;

        var validate = function (tasks) {
            if (!_.isEmpty(tasks)) {
                for (var i = 0; i < tasks.length; i++) {
                    if (!Status.from(tasks[i].status).to(Status.BLOCKED)) {
                        throw util.format('"%s" to "%s" Status Change Not Allowed!', tasks[i].status, Status.BLOCKED);
                    }
                }
            }
            return tasks;
        };
        var update = function () {
            return TaskInstance.update(t, {status: Status.BLOCKED}).then(function(){
                return TaskInstance.find(t).then(function(instances){
                    _.each(instances,function(instance){
                       me.logStatusChange(instance, u);
                    });
                    return instances;
                });
            });
        };
        return TaskInstance.find(t).then(validate).then(update).catch((e)=>{
            throw e;
        });
    },

    makeReady: function (t,u) {
        var me = this;
        var validate = function (tasks) {
            if (!_.isEmpty(tasks)) {
                for (var i = 0; i < tasks.length; i++) {
                    if (!Status.from(tasks[i].status).to(Status.READY)) {
                        throw util.format('"%s" to "%s" Status Change Not Allowed!', tasks[i].status, Status.READY);
                    }
                }
            }
            return Promise.resolve(tasks);
        };

        var findSessions = function () {
            return Promise.map(t, function(id){
                return TaskInstance.findOne(id).then(function (task) {
                    return task.session;
                });
            });
        };
        var update = function () {
            return TaskInstance.update(t, {status: Status.READY});
        };


        return TaskInstance.find(t)
            .then(validate)
            .then(update)
            .then(findSessions)
            .then(function(sessions){
                // play only completed sessions
                return Session.find({id:sessions,status:[Status.COMPLETED]}).then(function(s){
                    return SessionService.play(_.map(s,'id'));
                });
            })
            .then(function () {
                return TaskInstance.find(t).then(function(t){
                    me.logStatusChange(t,u);
                    return t;
                });
            });
    },

    makeSessionTasksReady: function (s) {
        var me=this,
            promise = TaskInstance.update({session:s},{status:Status.READY});

        promise.then(function(t){
            me.logStatusChange(t);
        });
        return promise;
    },

    makeRunning: function(t){
        var me = this;
        var find =()=>{
            var promise = TaskInstance.find(t).populateAll();
            promise.then(function(t){
                me.logStatusChange(t);
            });
            return promise;
        };

        return TaskInstance.update(t,{
            status:Status.RUNNING,
            startDate: _.now()
        }).then(find);
    },


    makeSuccess: function(instanceId){
        var me = this;

        return TaskInstance
            .findOne(instanceId)
            .then((instance)=>{
                var now = _.now();
                return TaskInstance.update(instance.id,{
                    status  : Status.SUCCESS,
                    endDate : now,
                    duration: now - instance.startDate
                });
            })
            .then(()=>{
                return TaskInstance.findOne(instanceId);
            })
            .then((instance)=>{
                me.logStatusChange(instance);
            });
    },

    makeError: function(instanceId, error){
        var me = this;

        return TaskInstance
            .findOne(instanceId)
            .then((instance)=>{
                var now = _.now();
                return TaskInstance.update(instance.id,{
                    status  : Status.ERROR,
                    endDate : now,
                    duration: now - instance.startDate
                });
            })
            .then(()=>{
                return TaskInstance.findOne(instanceId).populateAll();
            })
            .then((instance)=>{
                var e = new TaskInstanceError(error,instance);
                SocketService.taskInstance.onError(e.getError());
                return me.logStatusChange(instance, 'SYSTEM', error);
            });

    },

    kill: function(instanceId,u){
        var instances,
            me = this,
            runners = SessionManager.runners;

        if(_.isArray(instanceId)){
            instances = instanceId;
        }else{
            instances = [instanceId];
        }


        var promises = _.map(instances,function(instance){
            return me.makeKilled(instance,u).then(function(taskInstance){
                var runner = _.find(runners,{instanceId:instance});
                if(runner.runner){
                    runner.runner.kill();
                }
                runners = _.reject(runners , {instanceId:instanceId} );

                return taskInstance[0];
            });
        });

        return Promise.all(promises);
    },

    makeKilled: function(instanceId, u){
        var me = this;
        u = u?u:'SYSTEM';


        return TaskInstance
            .findOne(instanceId)
            .then((instance)=>{
                var now = _.now();
                return TaskInstance.update(instance.id,{
                    status  : Status.KILLED,
                    endDate : now,
                    duration: now - instance.startDate
                });
            })
            .then(()=>{
                return me.find(instanceId);
            })
            .then((instance)=>{
                me.logStatusChange(instance, u);
                return instance;
            });
    },

    boot: function(){

        var me=this,
            promise=  TaskInstance.update({status:Status.RUNNING},{status:Status.ERROR});
        promise.then(function(t){
            return me.logStatusChange(t,undefined,'System','Recovering from system halt!');
        });
        return promise;
    },

    findStats: function(){
        var me = this;

        var calc = function (instances){

            return _.chain(instances)
                .filter(instance=>!instance.excluded)
                .reduce((result,instance)=>{
                    var exist= true;
                    var task = _.find(result,{'task':instance.task.id});
                    if(!task){
                        exist = false;
                        task = {
                            task:instance.task.id,
                            totalDuration: 0,
                            avgDuration  : 0,
                            runCount     : 0,
                            longestInstanceDuration: 0,
                            longestInstance: instance.id
                        };
                        result.push(task);
                    }
                    task.totalDuration += instance.duration;
                    task.avgDuration = _.max([task.avgDuration,instance.avgDuration]);
                    task.runCount += 1;
                    if(task.longestInstanceDuration < instance.duration){
                        task.longestInstance = instance.id;
                        task.longestInstanceDuration = instance.duration;
                        task.longestInstanceAvgDuration = instance.avgDuration;
                    }

                    return result;
                },[]).value();

        };

        return me.find().then(calc);
    },

    searchLatestByName: function(name){

        var me = this;
        return me.find().then( (allInstances) => {

            var matching = allInstances.filter(instance=>{
                return instance.task.name.toUpperCase().indexOf(name.toUpperCase())>-1;
            });

            var instances = [];

            _.each(matching,(instance)=>{
                var t = _.find(instances,{name:instance.task.name});
                if( !t || t.session.date < instance.session.date ){
                    instances = _.filter(instances,(i)=>{return instance.task.name != i.task.name;});
                    instances.push(instance);
                }
            });

            return instances;
        });
    },

    update: function(i){
        var me = this;
        var predecessors = i.predecessors;

        return TaskInstance.update(i.id,{
            script      : i.script,
            technology  : i.technology,
            retryCount  : i.retryCount,
            critical    : i.critical,
            startAfter  : i.startAfter,
            restartable : i.restartable,
            order       : i.order,
            connection  : i.connection,
            predecessors: predecessors
        }).then(function(){
            var promises = predecessors.map(p=>{
                return TaskInstance.update(p.id,{excluded:p.excluded});
            });
            return Promise.all(promises).then(function(){
                return TaskInstance
                    .update(i.id,{predecessors:_.pluck(predecessors,'task')})
                    .then(function(){
                        return me.find(i.id);
                    })
            });
        });
    },

    logStatusChange: function(t,u, log) {

        var me = this;

        if(!_.isArray(t)){
            t = [t];
        }

        me.onStatusUpdate(t);

        return Promise.map(t,function(task){
            var lg = {
                owner   : u,
                log     : (log?log+' ':'') + 'Status changed to '+ task.status,
                status  : task.status,
                model   : 'TaskInstance',
                modelId : task.id
            };
            return LogService.info(lg);
        });
    },

    onStatusUpdate: function(instances,oldStatus){
        var m,message;

        if(!_.isArray(instances)){
            instances = [instances];
        }

        if(oldStatus){
            message = util.format("Status changed from %s to %s",oldStatus,instance.status);
        }
        m = new TaskInstanceStatusMessage(instances,message);
        return SocketService.taskInstance.onStatusUpdate(m.getMessage());
    },

    onDestroy: function(instances){

    },

    destroy: function (id) {
        return TaskInstance.destroy(id);
    },

    destroyByQuery: function (q) {
        return TaskInstance.destroy(q);
    },

    destroyBySession: function (sid) {
        return TaskInstance.destroy({session: sid});
    },

    destroyByScheduler: function(sch) {
        return Session.find({scheduler: sch}).then(sessions=> {
            var sid = _.map(sessions,'id');
            if(!_.isEmpty(sid)){
                return TaskInstance.destroy({session:sid});
            }else {
                return Promise.resolve();
            }

        });
    },

    removeDependencyByTask:function(taskId){
        if(!_.isArray(taskId)){
            taskId = [taskId];
        }

        var me = this;
        TaskInstance.find().then(function(instances){
            _.each(instances,function(instance){
                var removed =
                    _.remove(instance.predecessors,function(p){
                        return taskId.indexOf(p.id) > -1;
                    });

                if(!_.isEmpty(removed)){
                    return TaskInstance.update(instance.id, instance).then((instance)=>{
                        return instance;
                    });
                }
            });
        });
    },

    destroyByGroup: function(groupId){
        return TaskInstance.find().populate('task').then(function(instances){
            var promises = _.reduce(instances,function(result,instance){
                if(instance.task.primaryGroup == groupId){
                    result.push(TaskInstance.destroy(instance.id).then(()=>{
                        return instance;
                    }));
                }
                return result;
            },[]);
            return promises;
        });
    }



};