var format = require('string-format');
var Boot = require('../engine/Boot.js');
var Promise = require('bluebird');
//var session = require('../engine/Session.js');


module.exports = {

    promiseTest : function(req, res){
        var me = this;
        var users = UserService.findAll()
            .then(ConnectionService.findAll)
            .then(SchedulerService.findAll)
            .then(me.findDemo)
            .then(function(data){
                return data;
            })
            .then(function(data){
                res.send(data);
            });
    },

    findDemo : function(schedulers){
        return {a:'demo',sc : schedulers};
    },

    createPlanSession: function(req, res){
        var planId = req.param('id');
        //Plan.find({id:planId}).then(function(plans){
        //    sails.log.info('Creating session for plan '+ plans[0].name);
        //    return plans[0];
        //}).then(session.make);

        res.send('halo');

    },

    test : function(req, res){
        console.log('test success');
        res.send('test success');
    },

    createApple: function(req,res){
        console.log('creating apples...');
        var apples = [
            {
                name : 'apple1',
                color: 'green'
            },{
                name : 'apple2',
                color: 'red'
            }
        ];

        Apple.create(apples).then((a)=>{
            res.send(a);
        });
    },

    linkAppleToTask: function(req, res){
        var taskId = req.param('taskId');
        var apples = Apple.find();
        var task   = Task.find(taskId);
        Promise.all([apples,task]).spread((apples,task)=>{
            return Task.update(task.id,{
                apples: _.pluck(apples,'name')
            })
        }).then(()=>{
            Task.find(taskId).populateAll().then((t)=>{
                res.send(t);
            })
        });
    },

    findApples: function(req, res){
        Apple.find().then((apples)=>{
            res.send(apples);
        });
    },

    testParameters: function(req, res){
        ParameterService.format();
    }

};