var BaseController = require('./BaseController');

var SystemController = {

    getVersion: function(req, res){
        var respond = function (r) {
            res.send(r);
        };
        SystemService.getVersion().then(respond);
    },

    getConfig: function(req, res) {
        var respond = function (r) {
            res.send(r);
        };
        var param = req.param('name');
        SystemService.getConfig(param).then(respond);
    }
};

module.exports = _.extend(SystemController,BaseController);