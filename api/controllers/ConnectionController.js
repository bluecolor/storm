var BaseController = require('./BaseController');

var ConnectionController = {


    find : function(req, res){
        var id = req.param('id');
        var respond = function(r){
            res.send(r);
        };

        ConnectionService.find(id).then(respond);
    },

    findByName: function(req, res) {
        var name = req.param('name');
        var respond = (r) => {
            res.send(r);
        };

        ConnectionService.findByName(name).then(respond);
    },

    create : function(req, res){
        var c = _.extend(req.body || {});
        var respond = function(r){
            res.send(r);
        };
        ConnectionService.create(c).then(respond);
    },

    update : function(req, res){
        var c = _.extend(req.body || {});
        var respond = function(r){
            res.send(r);
        };
        ConnectionService.update(c).then(respond);
    },

    destroy : function(req, res) {
        var id = req.param('id');
        var respond = function(r){
            res.send(r);
        };
        ConnectionService.destroy(id).then(respond);
    },

    test : function(req, res){
        var respond = (r)=>{
            res.send({success:r});
        };
        var onError = function(e){
            res.serverError(e);
        };
        var id = req.param('id');
        var c = _.extend(req.body || {});
        ConnectionService.test(c).then(respond).catch(onError);
    }
};

module.exports = _.extend(ConnectionController,BaseController);


