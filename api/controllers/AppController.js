var parser = require('cron-parser');


module.exports = {

    testCronExp: function(req, res){
        var exp = req.param('exp');

        try{
            parser.parseExpression(exp);
            res.send({
                success: true
            });
        }catch (e){
            res.send({
                success: false,
                message: e.message
            });
        }
    },

    findConf: function(req, res){
        var respond = function(s){
            res.send(s);
        };
        var param = req.param('name');
        AppService.findConf(param).then(respond);
    },

    findAllConf: function(req, res){
        var respond = function(s){
            res.send(s);
        };
        AppService.findAllConf().then(respond);
    },

    saveConf: function(req, res){
        var conf = _.extend(req.body || {}),
            param= req.param('name');

        var respond = function(s){
            res.send(s);
        };

        var user = req.session.passport.user;
        AppService.saveConf(param,conf,user).then(respond);
    },

    saveConfs: function(req, res){
        var confs   = _.extend(req.body || {}),
            user    = req.session.passport.user,
            respond = function(s){
                res.send(s);
            };

        AppService.saveConfs(confs,user).then(respond);
    },



    findObjectsFlat : function(req, res){
        var text = req.param('q'),
            q = text?{name : {contains : text}}:undefined;
        var respond = function(o){
            res.send(o);
        };
        AppService.findObjectsFlat(q).then(respond);
    }

};

