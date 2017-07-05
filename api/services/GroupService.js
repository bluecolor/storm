
var Promise = require('bluebird');

module.exports = {

    findByScheduler: function(schId){

        var handler = function(groups,tasks){
            return _.map(groups,function(group){
                group.taskCount = 0;
                _.each(tasks,function(task){
                    if(_.map(task.groups,'id').indexOf(group.id) > -1){
                        group.taskCount++;
                    }
                });
                return group;
            });
        };

        return Promise.join(
            Group.find({scheduler:schId}),
            Task.find().populateAll(),
            handler
        );

    },


    find : function(g){

        var me = this;
        if(!_.isString(g)){
            return Group.find(g);
        }

        return Promise.props({
            g : Group.findOne(g),
            t : me.findTasks(g)
        }).then(function(r){
            var o = {};
            o = _.extend(o,r.g);
            o.tasks = r.t;
            return o;
        });
    },

    findByName: function(name){
        var me = this;
        return Group.find({name:name}).limit(1).then(function(g){
            return me.findTasks(g.id).then(function(t){
                var o = {};
                o = _.extend(o,g[0]);
                o.tasks = t;
                return o;
            });
        });
    },

    findTasks : function(g){
        return TaskService.findByGroup(g);
    },

    _findTasks: function(g){
        var pluck = function(t){
            return _.pluck(t,'id');
        };
        return Task.find().where({groups:{contains:g}}).then(pluck);
    },

    update : function(ng){
        var me = this;

        var add = function(t){
            return TaskService.addGroup(t,ng.id);
        };
        var remove = function(t){
            return TaskService.removeGroup(t,ng.id);
        };

        return Group.update(ng.id, ng).then(function(){
            return me._findTasks(ng.id).then(function(t){
                return remove(_.difference(t, ng.tasks)).then(function(){
                    return add(_.difference(ng.tasks, t));
                });
            });
        })
    },

    create: function(group){
        var add = function(g){
            var t = group.tasks;
            return TaskService.addGroup(t,g.id);
        };

        var ng = Group.create(group);

        return ng.then(add).then(function(){
            return ng;
        });
    },

    upload: function(groups){

        var scheduler = function(name){
            return Scheduler.findOne({name:name});
        };
        var connection= function(name){
            return Connection.findOne({name:name});
        };


        return Group.find().then((_groups)=>{
            return Promise.all(_.map(groups,function(group){

                var sch = scheduler(group.scheduler.name),
                    con = group.connection?connection(group.connection.name):Promise.resolve(),
                    g   = _.find(_groups,{name:group.name});

                return Promise.all([con,sch]).spread((connection,scheduler)=>{
                    var newGroup = {
                        scheduler   : scheduler.id,
                        name        : group.name,
                        parallel    : group.parallel,
                        description : group.description
                    };

                    if(connection){
                        newGroup.connection = connection.id;
                    }

                    if(g){
                        newGroup.id = g.id;
                        return Group.update(g.id,newGroup).then(()=>{
                            return Group.findOne(g.id);
                        });
                    }else{
                        return Group.create(newGroup).then((group)=>{
                            return group;
                        });
                    }
                });
            }));
        });

    },

    destroy: function(groupId){
        return Group.find(groupId).then((group)=>{
            Group.destroy(groupId).then(()=>{
                TaskInstanceService.destroyByGroup(groupId).then(()=>{
                    TaskService.destroyByGroup(groupId);
                });
            });
            return group;
        });

    },

    destroyByScheduler: function(schId){
        return Group.destroy({scheduler:schId});
    }




};