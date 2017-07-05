
var pwg = require('password-generator');
var Promise = require('bluebird');
var _ = require('lodash');
var crypto = require ('../lib/crypto');

module.exports = {


    findTasksByStatus: function(userId, status){
        var promise;
        if(status == 'ACTIVE'){
            promise = Task.find({active:true});
        }else if(status == 'INACTIVE'){
            promise = Task.find({active:false});
        }else if(status == 'EXCLUDED'){
            promise = Task.find({active:false});
        }else{
            promise = Task.find();
        }

        return promise.populateAll().then(function(tasks){
            return _.filter(tasks, function(task){
                return _.map(task.owners,'id').indexOf(userId)>-1;
            });
        });
    },

    findByUsername : function(username) {
        return User.find({username:username});
    },

    find   : function(u) {
        if(_.isArray(u) ||_.isEmpty(u)){
            return User.find(u);
        }else{
            return User.findOne(u);
        }
    },

    findSuperUser: function(){
        return User.findBySuperUser(true);
    },

    create : function(u){

        return MailService.isMailServerDefined().then(b=>{
            var pw = b ? pwg(6, true) : u.username;
            u.password = pw;

            var sendMail = function(user) {
                var m = {
                    from    : 'storm ✔ <storm@bluecolor.io>',
                    to      : user.email,
                    subject : 'password for storm ✔',
                    text    : 'username:' + user.username + ' password:' + pw
                };
                MailService.send(m);
                return user;
            };

            return User.create(u).then(sendMail);
        });
    },

    destroy: function(u){
        return User.destroy(u);
    },

    destroyExceptSu: function(){
        return User.destroy({username: {not:'su'}});
    },

    saveOptions: function(u,o){
        var me = this;
        var update = (user)=>{
            return User.update(user.id,{options:o});
        };
        return me.find(u).then(update).then(()=>{
            return me.find(u);
        });
    },

    findTaskOwners: function(){
        var me = this;

        /* stats to be calculated */
        var stats = {
            owner: undefined,
            all: {
                taskCount: 0,
                avgTaskCount: 0,
                totalCriticalTaskCount: 0,
                totalDuration: 0,
                longestTaskDuration: 0,
                longestTaskAvgDuration: 0,
                longestTask: undefined
            },
            owned: {
                taskCount: 0,
                avgDuration: 0,
                totalCriticalTaskCount: 0,
                totalDuration: 0,
                longestAvgDuration: 0,
                longestTask: undefined
            }
        };

        var ownerTaskPromise= TaskService.findOwnerTasks();
        var taskStatPromise = TaskInstanceService.findStats();

        var stats = (owners, tasks) => {

            var taskStats = {
                taskCount: tasks.length,
                avgTaskCount: tasks.length/_.keys(owners).length,
                totalCriticalTaskCount: 0,
                totalDuration: _.chain(tasks).pluck('totalDuration').sum().value(),
                longestTaskDuration: 0,
                longestTaskAvgDuration: 0,
                longestTask: undefined
            };


            return _.chain(owners).keys().reduce((result,ownerId)=>{

                var stat = _.find(result,{owner: {id: ownerId}});

                if(!stat){
                    stat = {
                        owner: owners[ownerId].owner,
                        all  : {},
                        owned: {
                            taskCount: 0,
                            avgDuration: 0,
                            totalCriticalTaskCount: 0,
                            totalDuration: 0,
                            longestAvgDuration: 0,
                            longestTask: undefined
                        }
                    };
                    result.push(stat);
                }

                stat.all = taskStats;

                stat.owned.taskCount =
                    owners[ownerId].tasks.filter(task=>task.active).length;
                stat.owned.totalCriticalTaskCount =
                    owners[ownerId].tasks.filter(task=>task.active&task.critical).length;


                _.each(owners[ownerId].tasks,(task)=>{
                    var t = _.find(tasks,{task:task.id});
                    if(t){
                        stat.owned.totalDuration += t.totalDuration;

                        if(stat.owned.longestAvgDuration < t.avgDuration){
                            stat.owned.longestAvgDuration = t.avgDuration;
                            stat.owned.longestTask = t;
                        }
                    }
                });

                return result;
            },[]).value();


        };

        return Promise.all([ownerTaskPromise,taskStatPromise]).spread(stats);

    },

    update: function(id,user){
        if(!id){
            id = user.id;
        }

        return User.update(id,{
            name: user.name,
            role: user.role,
            email: user.email
        }).then(()=>{return User.findOne(id);});
    },

    changePassword: function(userId, p){
        var me = this;

        return me.find(userId).then(function(user){
            if(crypto.hash(p.currentPassword) != user.password ){
                throw "Invalid Old Password!";
            }else if(p.newPassword != p.reNewPassword){
                throw "New Password Match Exception";
            }else{
                return User.update(userId,{password:crypto.hash(p.newPassword)})
                    .then(function(){
                        return User.findOne(userId);
                    });
            }
        });
    },

    onSchedulerDestroyed: function(schId){
        return User.find().then((users)=>{
            var promises = _.map(users,function(user){
                if(user.options && !_.isEmpty(user.options.schPlan)){
                    var r = _.remove(user.options.schPlan,function(sp){
                        return sp.scheduler == schId;
                    });
                    if(r){
                        return User.update(user.id,user).then(()=>{
                            return user;
                        });
                    }else{
                        return Promise.resolve();
                    }
                }else{
                    return Promise.resolve();
                }
            });
            return promises;
        });
    },

    onPlanDestroyed: function(planId){
        return User.find().then((users)=>{
            var promises = _.map(users,function(user){
                if(user.options && !_.isEmpty(user.options.schPlan)){
                    var sp = _.find(user.options.schPlan, {plan:planId});
                    if(sp){
                        sp.plan = undefined;
                        return User.update(user.id,user).then(()=>user);
                    }else{
                        return Promise.resolve();
                    }
                }else{
                    return Promise.resolve();
                }
            });
            return promises;
        });
    },

    save: function(users){
        return User.find().then((_users)=>{
            return Promise.all(_.map(users,function(user){

                var u = _.find(_users,{username:user.username});

                if(u){
                    return User.update(u.id,user).then(()=>{
                        return User.findOne(u.id);
                    });
                }else{
                    return User.create(user);
                }
            }));
        });
    }


};
