
var Status = require('../constants/Status');
var util = require('util');
var BaseController = require('./BaseController');

var TaskInstanceController = {

    find: function(req, res){
        var id = req.param('id');
        var respond = function(instances){
            res.send(instances);
        };
        TaskInstanceService.find(id).then(respond);
    },

    findBySession: function(req, res){
        var sid = req.param('sid');
        var respond = function(instances){
            if(_.isEmpty(instances)){
                instances = [];
            }
            res.send(instances);
        };
        TaskInstanceService.findBySession(sid).then(respond);
    },

    /**
     * todo handle valid status list
     * @param req
     * @param res
     */
    findByStatus: function(req, res){
        var status = req.param('status');
        var respond = function(t){
            res.send(t);
        };
        status = status.split(',');
        TaskInstanceService.findByStatus(status).then(respond);
    },

    destroy: function(req, res){
        var id = req.param('id');
        var respond = function(r){
            res.send(r);
        };
        TaskInstanceService.destroy(id).then(respond);
    },

    destroyBySession : function(req, res){
        var sid = req.param('sid');
        var respond = function(r){
            res.send(r);
        };
        TaskInstanceService.destroyBySession(sid).then(respond);
    },


    makeReady : function(req, res){

        var respond= function(task){
            res.send(task);
        };
        var onException = function(e){
            res.serverError(e);
        };

        var t = this.get(req);

        var u = req.session.passport.user;

        TaskInstanceService.makeReady(t,u)
            .then(respond)
            .catch(onException);
    },

    block: function(req, res){


        var respond= function(tasks){
            res.send(tasks);
        };
        var onException = function(e){
            res.serverError(util.format('Internal server error! %s',e));
        };
        var t = this.get(req);

        var u = req.session.passport.user;

        TaskInstanceService.block(t,u)
            .then(respond)
            .catch(onException);
    },

    exclude: function(req, res){
        var id = this.get(req);
        var respond = function(t){
            res.send(t);
        };

        var onError = function(e){
            res.serverError(e);
        };

        var u = req.session.passport.user;

        TaskInstanceService
            .exclude(id,u)
            .then(respond)
            .catch(onError);

    },

    include: function(req, res){

        var respond= function(tasks){
            res.send(tasks);
        };
        var onException = function(e){
            res.serverError(e);
        };
        var t = this.get(req);
        var u = req.session.passport.user;

        TaskInstanceService.include(t, u).then(respond).catch(onException);
    },

    searchLatestByName: function(req, res){
        var respond = ( t )=>{
            res.send(t);
        };
        var name = req.param('q');

        TaskInstanceService.searchLatestByName(name).then(respond);
    },

    update: function(req,res){
        var respond = ( instance )=>{
            res.send(instance);
        };
        var t = _.extend(req.body || {});

        TaskInstanceService.update(t).then(respond);
    },

    findErrors: function(req, res){
        var respond = (r)=>{
            res.send(r);
        };

        TaskInstanceService.findErrors().then(respond);
    },

    kill: function(req, res){
        var t = this.get(req),
            u = req.session.passport.user,
            respond = (r)=>{
                res.send(r);
            };
        TaskInstanceService.kill(t,u.username).then(respond);
    }

};

module.exports = _.extend(TaskInstanceController,BaseController);
