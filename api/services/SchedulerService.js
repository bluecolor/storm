var Promise = require('bluebird');

module.exports = {

  uploadSchedulers: function(schedulers){
    if(!_.isArray(schedulers)){
      schedulers = [schedulers];
    }

    var connection= function(name){
      return Connection.findOne({name:name});
    };

    return Scheduler.find().then((_schedulers)=>{
      return Promise.all(_.map(schedulers,function(scheduler){

        var s = _.find(_schedulers,{name:scheduler.name});
        return connection(scheduler.connection.name).then((connection)=>{
          var newScheduler = {
            name    : scheduler.name,
            description : scheduler.description,
            connection  : connection.id
          };

          if (s) {
            newScheduler.id = s.id;
            return Scheduler.update(s.id, newScheduler).then(()=> {
              return Scheduler.findOne(s.id);
            });
          } else {
            return Scheduler.create(newScheduler);
          }
        });
      }));
    });

  },


  upload: function(content){
    var me = this;
    try{
      var objects = JSON.parse(content);
    }catch(e){
      throw(e);
    }

    return Promise.resolve(me._upload(objects));
  },

  _upload: function(objects){
    var result  = {},
      me    = this;

    var parameters = ()=> {
      if(!_.isEmpty(objects.parameters)){
        return ParameterService.save(objects.parameters);
      }else{
        return Promise.resolve([]);
      }
    };

    var tasks = ()=>{
      if(!_.isEmpty(objects.tasks)){
        return TaskService.uploadTasks(objects.tasks);
      }else{
        return Promise.resolve([]);
      }
    };
    var plans = ()=>{
      if(!_.isEmpty(objects.plans)){
        return PlanService.upload(objects.plans);
      }else{
        return Promise.resolve([]);
      }
    };
    var groups= ()=>{
      if(!_.isEmpty(objects.groups)){
        return GroupService.upload(objects.groups);
      }else{
        return Promise.resolve([]);
      }
    };
    var connections= ()=>{
      if(!_.isEmpty(objects.connections)){
        return ConnectionService.save(objects.connections);
      }else{
        return Promise.resolve([]);
      }
    };
    var schedulers = ()=>{
      if(!_.isEmpty(objects.scheduler)){
        return me.uploadSchedulers(objects.scheduler);
      }else{
        return Promise.resolve([]);
      }
    };
    var users = ()=>{
      if(!_.isEmpty(objects.users)){
        return UserService.save(objects.users);
      }else{
        return Promise.resolve([]);
      }
    };

    return parameters().then((parameters)=>{
      return users().then((users)=>{
        return connections().then((connections)=>{
          return schedulers().then((schedulers)=>{
            return groups().then((groups)=>{
               return plans().then((plans)=>{
                return tasks().then((tasks)=>{
                  result.parameters  = parameters;
                  result.users     = users;
                  result.connections = connections;
                  result.schedulers  = schedulers;
                  result.groups    = groups;
                  result.plans     = plans;
                  result.tasks     = tasks;
                  return result;
                });
               });
            });
          });
        });
      });
    });
  },


  download: function(schedulerId,options){
    var objects = {};
    var promises= {};

    if(options.parameters){
      promises.parameters = Parameter.find();
    }

    if(options.users){
      promises.users = User.find();
    }

    if(options.connections){
      promises.connections = ConnectionService.findAll();
    }

    if(options.tasks) {
      promises.tasks = Plan.find({scheduler:schedulerId}).then(function(plans){
        return Task.find({plan:_.map(plans,'id')}).populateAll();
      });
    }

    if(options.plans){
      promises.plans = Plan.find({scheduler:schedulerId}).populateAll();
    }

    if(options.groups){
      promises.groups= Group.find({scheduler:schedulerId}).populateAll();
    }

    promises.scheduler = Scheduler.findOne(schedulerId).populateAll();


    return Promise.props(promises).then(function(r){
      return r;
    });
  },


  planTaskStatusStats: function(schedulerId){
    return Plan.find({scheduler:schedulerId}).then(function(plans){
      return Task.find({plan:_.pluck(plans,'id')}).then(function(tasks){
        var stats = [];
        _.each(tasks,function(task){
          var p = _.find(stats,{planId:task.plan});
          var status = task.excluded?'excluded':'ready';
          if(p){
            p[status]++;
          }else{
            var plan = _.find(plans,{id:task.plan});
            var o = {
              plan  : plan.name,
              planId  : task.plan,
              excluded: 0,
              ready   : 0
            };
            o[status] = 1;
            stats.push(o);
          }
        });
        return stats;
      });
    });
  },

  find : function(id)  {
    var me = this;
    return Scheduler.find(id).then(me.populateLiveSessionStats);
  },

  findByName: function(name){
    return Scheduler.find({name:name}).populateAll();
  },

  populateLiveSessionStats: function(schedulers){
    return SessionService
      .findLiveSessionStats(_.map(schedulers,'id'))
      .then(function(stats){
        return _.map(schedulers,function(s){
          s.sessions = _.filter(stats,{scheduler:s.id});
          _.each(s.sessions,function(s){
            delete s.scheduler;
          });
          return s;
        });
      });
  },

  create : function(s) {
    return Scheduler.create(s);
  },

  destroy: function(id){

    var procs = [];

    procs.push(TaskInstanceService.destroyByScheduler);
    procs.push(SessionService.destroyByScheduler);
    procs.push(TaskService.destroyByScheduler);
    procs.push(PlanService.destroyByScheduler);
    procs.push(GroupService.destroyByScheduler);
    procs.push(Scheduler.destroy);
    procs.push(UserService.onSchedulerDestroyed);
    var promises= [];

    return Scheduler.find(id).then((sch)=>{
      var promise = Promise.reduce(procs,(result,proc)=>{
        var p = proc(id);
        promises.push(p);
        return p;
      },0);

      return promise.then(()=>{
        return Promise.all(promises).then((result)=>{
          SocketService.scheduler.onDestroy(sch[0]);
          return sch;
        });
      });
    });

  },

  update : function(s){
    var u={
      name : s.name,
      connection : s.connection
    };
    return Scheduler.update(s.id,u);
  }

};
