
var BaseController = require('./BaseController');

var ParameterController = {

    find   : function(req, res){
        var id = req.param('id');
        var respond = function(p){
            res.send(p);
        };

        ParameterService.find(id).then(respond);
    },

    findEval: function(req, res){
        var respond = function(p){
            res.send(p);
        };

        ParameterService.findEval().then(respond);
    },

    findEvalByName: function(req, res){
        var respond = function(p){
            res.send(p);
        };
        var name = req.param('name');
        ParameterService.findEvalByName(name).then(respond);
    },

    create : function(req, res){
        var respond = function(param){
            res.send(param);
        };
        var p  = _.extend(req.body || {});

        ParameterService.create(p).then(respond);
    },

    update : function(req, res){
        var respond = function(param){
            res.send(param);
        };
        var id = this.get(req);
        var p  = _.extend(req.body || {});

        ParameterService.update(id,p).then(respond);
    },

    destroy: function(req, res){
        var respond = function(p){
            res.send(p);
        };
        var id = req.param('id');

        ParameterService.destroy(id).then(respond);
    }

};

module.exports = _.extend(ParameterController,BaseController);

