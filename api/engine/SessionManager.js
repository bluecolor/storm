var Later = require('later');
var moment= require('moment');
var Config =  require('../config/RunTime.js');
var Status = require('../constants/Status.js');
var ConnectionType = require('../constants/ConnectionType.js');
var Promise = require('bluebird');
var TaskRunner = require('../lib/taskrunner.js');
var Locks = require('locks');

SessionManager = {

    //list of TaskRunner instances
    runners: [],

    start : function(){
        this.startSessionChecker();
        this.startTaskExecuter();
    },

    startSessionChecker  : () => {
        var me = this;

        var schedule = Later.parse.text(Config.planSessionCheckSchedule);

        var check = () => {
            return PlanService.select().then((plans)=>{
                return _.map(plans, SessionService.createNextSession);
            }).then(()=>{
                return SessionService
                    .makeSessionCompleted()
                    .then(()=>{
                        return SessionService.makeSessionRunning();
                    });
            });
        };

        Later.setInterval(check,schedule);
    },

    startTaskExecuter: () => {

        var mutex = Locks.createMutex();

        var select = () => {
            var q = {status : [Status.READY, Status.RUNNING]};
            return Session.find(q).then((sessions)=>{
                var tasks = sessions.map((session)=>{
                    return TaskInstanceService.findExecutableTasks(session)
                });
                return Promise.reduce(tasks,(t,e)=>{return e?t.concat(e):t;},[]);
            });
        };

        var eval = function(tasksInstances){

            var promises = _.map(tasksInstances,(taskInstance)=>{
                var params,script = taskInstance.script;

                if(script){
                    params = script.match(/\#\{(.*?)\}/g);
                }

                if(!params || params.length == 0){
                    taskInstance.scriptValue = taskInstance.script;
                    return Promise.resolve(taskInstance);
                }

                var sessionDate = taskInstance.session.date;
                var dateString  = moment(sessionDate).format('YYYY.MM.DD');

                return ParameterService.findEval(dateString).then((allParameters)=>{
                    var ti = taskInstance, script = taskInstance.script;

                    _.each(params, (param)=>{
                        var pn = param.replace((/[\#\{\}/]+/g),'');
                        var p  = _.find(allParameters,{name:pn});
                        if(p){
                            script = script.replace(new RegExp(param,'g'),p.value);
                        }
                    });
                    ti.scriptValue = script;
                    return ti;
                });
            });

            return Promise.all(promises);
        };

        var execute = (tasks) => {

            if(_.isEmpty(tasks)){
                mutex.unlock();
                return;
            }

            return TaskInstanceService.makeRunning(_.pluck(tasks,'id')).then(eval).then((instances)=>{

                try{
                    mutex.unlock();
                }catch(e){
                    sails.log.error(e);
                }

                return instances.map((instance)=>{

                    if(!instance.technology){
                        switch(instance.connection.connectionType){
                            case ConnectionType.DB:
                                instance.technology = 'PLSQL';
                                break;
                            default:
                                instance.technology = 'OS';
                        }
                    }

                    var runner = new TaskRunner(instance);

                    var instanceId= instance.id;
                    var sessionId = instance.session.id;

                    runner.on('start',()=>{
                        SessionManager.runners.push({
                            instanceId: instanceId,
                            runner    : runner
                        });
                    });

                    runner.on('stop', ()=>{
                        SessionManager.runners =
                            _.reject( SessionManager.runners , {instanceId:instanceId} );
                    });


                    runner.on('success',()=>{
                        return TaskInstanceService
                            .makeSuccess(instanceId)
                            .then(()=>{
                                return SessionService.tryComplete(sessionId);
                        });
                    });

                    runner.on('error', (data)=>{
                        return TaskInstanceService.makeError(instanceId, data);
                    });

                    runner.on('killed',()=>{
                        return TaskInstanceService.makeKilled(instanceId);
                    });

                    runner.run();

                });
            });
        };

        var run = () => {
            if(mutex.tryLock()){
                select().then(execute);
            }
        };

        var schedule = Later.parse.text(Config.taskInstanceStartSchedule);
        Later.setInterval(run,schedule);
    },

    killTaskInstance: function(instanceId) {
        var runner = _.find(this.runners, {instanceId:instanceId});
        if(runner){
            runner.kill()
        }
    }

};


module.exports = SessionManager;
