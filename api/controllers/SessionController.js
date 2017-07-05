
var BaseController = require('./BaseController');

var SessionController = {

    findTasksByStatus: function(req, res){

        var id      = req.param('id'),
            status  = req.param('status'),
            respond = function(t){
                res.send(t);
            };

        SessionService.findTasksByStatus(id,status).then(respond);
    },


    find: function(req, res){
        var respond = function(s){
            res.send(s);
        };
        var id = this.get(req);

        SessionService.find(id).populateAll().then(respond);
    },

    findLiveSessions: function(req, res){
        var sch = req.param('sid');
        var respond = function(s){
            res.send(s);
        };
        SessionService.findLiveSessions(sch).then(respond);
    },

    findSchedulerSessions : function(req,res){
        var scheduler = req.param('scheduler');
        var respond = function(s){
            res.send(s);
        };

        SessionService.findSchedulerSessions(scheduler).then(respond);
    },

    destroy: function(req, res){

        var id = req.param('id');
        var respond = function(r){
            res.send(r);
        };

        SessionService.destroy(id).then(respond);
    },

    play: function(req, res){
        var respond = function(s){
            res.send(s);
        };
        var s = this.get(req);
        SessionService.play(s).then(respond);
    },

    replay: function(req, res){
        var respond = function(s){
            res.send(s);
        };
        var s = this.get(req);
        SessionService.replay(s).then(respond);
    },

    pause: function(req, res){
        var respond = function(s){
            res.send(s);
        };
        var s = req.param('id');
        SessionService.pause(s).then(respond);
    },

    findLastSessionOfPlan : function(req,res){
        var p = req.param('pid');
        var respond = function(s){
            res.send(s);
        };
        SessionService.findLastSessionOfPlan(p).then(respond);
    },

    setParallel: function(req, res){
        var respond = function(s){
            res.send(s);
        };
        var reqBody = _.extend(req.body || {});
        var id = req.param('id');
        SessionService.setParallel(id,reqBody.parallel).then(respond);
    }

};

module.exports = _.extend(SessionController,BaseController);
