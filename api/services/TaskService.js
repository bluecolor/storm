var Promise = require('bluebird');
var Toposort = require('toposort-class');


module.exports = {

    find : function(id) {
        return _.isString(id) ? Task.findOne(id):Task.find(id);
    },

    findByOwner: function(ownerId){
        return Task.find().populateAll().then((tasks)=>{
            return _.filter(tasks,function(task){
                return _.map(task.owners,'id').indexOf(ownerId) > -1;
            });
        });
    },

    findByPlan: function(p){
        return Task.find({plan:p}).populateAll();
    },

    create : function(tasks){
        return Task.create(tasks);
    },

    update : function(task){
        var u = function(){
            task.predecessors = _.pluck(task.predecessors,'id');
            return Task.update(task.id,task);
        };
        var p =this._processPredecessors(task);
        return  Promise.all(p).then(u);
    },

    addGroup : function(t,g){
        var me = this;
        return Task.find(t).then(function(tasks){
            var all = _.chain(tasks).filter(function(task){
                return !_.contains(task.groups,g);
            }).map(function(task){
                var groups = _.clone(task.groups);
                    groups.push(g);
                return Task.update(task.id,{groups:groups});
            }).value();
            return Promise.all(all);
        })
    },

    removeGroup : function(t,g){
        var me = this;
        return  me.find(t).then(function(tasks){
            var all = _.map(tasks,function(task){
                var groups = _.without(task.groups,g);
                return Task.update(task.id,{groups:groups});
            });
            return Promise.all(all);
        });
    },

    _processPredecessors : function(task){
        var me = this;
        return _.map(task.predecessors,function(p){
            return me.setExcluded(p.excluded,p.id);
        });
    },

    destroyByPlan : function(id){
        var me = this;
        var query = id ? {plan:id} : undefined;
        return Task.find(query).then(function(tasks){
            if(tasks.length > 0){
                return me.destroy(_.pluck(tasks,'id'));
            }
            return [];
        });
    },

    setActive : function(active,id){
        return Task.update(id,{active:active})
    },

    setExcluded : function(excluded, id){
        return Task.update(id,{excluded:excluded});
    },

    findByPrimaryGroup : function(gid){
        return Task.find({primaryGroup:gid}).populateAll();
    },

    findByGroup : function(gid,populate){

        // skip populate option
        populate = populate == undefined ? true : populate;

        return Task.find().populateAll().then(function(tasks){
            return _.filter(tasks, function(task){
                return _.map(task.groups,'id').indexOf(gid)>-1;
            });
        });
    },

    findByName: function(name){
        return Task.findByName(name);
    },

    searchByName: function(q){
        return Task.find({name : {"contains" : q}}).populateAll();
    },

    findOwnerTasks: function(){
        var index = {};

        var process = function(tasks){
            _.each(tasks,(task)=>{
                _.each(task.owners,(owner)=>{
                    var o = owner.id;
                    if(_.isEmpty(index[o])){
                        index[o] = {owner:owner,tasks:[]};
                    }
                    index[o].tasks.push(task);
                });
            });

            return index;
        };

        return Task.find().populate('owners').then(process);
    },

    download: function(t, format){
        var me = this;
        return me.find(t).populateAll();
    },

    upload: function(content){
        var me = this;
        try{
            var tasks = JSON.parse(content);
        }catch(e){
            throw(e);
        }

        return me.uploadTasks(tasks);
    },

    uploadTasks : function(tasks){

        var me = this;

        var pack = (task) =>{
            var t =  {
                name        : task.name,
                script      : task.script,
                retryCount  : task.retryCount,
                critical    : task.critical,
                excluded    : task.excluded,
                startAfter  : task.startAfter,
                mask        : task.mask,
                restartable : task.restartable,
                description : task.description,
                order       : task.order,
                active      : task.active,
                groups      : _.map(task.groups,'name'),
                owners      : _.map(task.owners,'username'),
                predecessors: _.map(task.predecessors,'name'),
                dependencies: [],
                primaryGroup: task.primaryGroup.name,
                plan        : task.plan.name,
                connection  : task.connection.name
            };

            _.each(t.predecessors,(predecessor)=>{
                if ( _.find(tasks,{name:predecessor}) ){
                    t.dependencies.push(predecessor);
                }
            });

            return t;
        };


        var _tasks = tasks.map(pack);

        var graph = new Toposort();
        _.each(_tasks, (task) =>{
            graph.add(task.name, task.dependencies);

        });

        var taskPack = {
            tasks: _tasks,
            order: graph.sort().reverse()
        };

        var getTask = (task) =>{

            var groups = Group.find({name:task.groups}).then((groups)=>{
                return _.map(groups,'id')
            });
            var owners = User.find({username:task.owners}).then((owners)=>{
                return _.map(owners,'id');
            });
            var predecessors =
                Task.find({name:task.predecessors}).then((tasks)=>{
                    return _.map(tasks,'id');
                });

            var primaryGroup = Group.find({name:task.primaryGroup}).then((g)=>{
                return g[0].id;
            });

            var plan = Plan.findOne({name:task.plan}).then((plan)=>{
                return plan.id;
            });
            var connection = Connection.findOne({name:task.connection}).then((c)=>{
                return c.id;
            });

            return Promise.all([
                groups,owners,predecessors,primaryGroup,plan,connection
            ]).spread((groups,owners,predecessors,primaryGroup,plan,connection)=>{
                var t = {};
                t.name = task.name;
                t.plan = plan;
                t.script = task.script;
                t.retryCount = task.retryCount;
                t.critical = task.critical;
                t.excluded = task.excluded;
                t.startAfter  = task.startAfter;
                t.mask = task.mask;
                t.restartable = task.restartable;
                t.description = task.description;
                t.order = task.order;
                t.active= task.active;
                t.groups = groups;
                t.owners = owners;
                t.predecessors= predecessors;
                t.primaryGroup = primaryGroup;
                t.connection = connection;
                return t;
            },(e)=>{
                throw e
                console.log('error',e);
            });
        };


        var save = (task) => {
            return Task.findOne({name:task.name}).then((oldTask)=>{
                if(oldTask){
                    task.id = oldTask.id;
                    return TaskService.update(task);
                }else {
                    return TaskService.create(task);
                }
            });
        };

        var promises = [];
        var p = Promise.reduce(taskPack.order,(r,taskName)=>{
            var t = _.find(taskPack.tasks,{name:taskName});
            var promise = getTask(t).then(save);
            promises.push(promise);
            return promise;
        },0);

        return p.then(()=>{
            return Promise.all(promises);
        });
    },

    destroy: function(taskId){
        var me = this;
        return TaskInstanceService.destroyByQuery({task:taskId}).then(function(){
            me.removeDependency(taskId);
            return Task.destroy(taskId);
        });
    },

    removeDependency: function(taskId){

        if(!_.isArray(taskId)){
            taskId = [taskId];
        }

        TaskInstanceService.removeDependencyByTask(taskId);

        return Task.find().then(function(tasks){
            var updateList = _.reduce(tasks,(result,task)=>{
                if(!_.chain(task.predecessors).intersection(taskId).isEmpty().value()){
                    result.push(task);
                }
                return result;
            },[]);

            var promises = _.map(updateList, function(task){
                task.predecessors = _.difference(task.predecessors,taskId);
                Task.update(task.id,task).then((task)=>{
                    return task;
                });
            });

            return promises;
        });
    },

    destroyByScheduler: function(sch){
        return Plan.find({scheduler:sch}).then(plans=>{
            if(_.isEmpty(plans)){
                return;
            }
            var planIds = _.map(plans,'id');
            return Task.destroy({plan:planIds});
        });
    },

    destroyByGroup: function(groupId){
        Task.destroy({primaryGroup:groupId}).then(function(){
            return Task.find().then((tasks)=>{
                _.each(tasks,function(task){
                    if(task.groups.indexOf(groupId)>-1){
                        _.remove(task.groups,groupId);
                        Task.update(task.id,task).then(function(){
                            return Task.findOne(task.id);
                        });
                    }
                });
            });
        });
    }


};