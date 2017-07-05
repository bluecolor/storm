var BaseController = require('./BaseController');

var MailController = {

    test: function(req, res){
        var respond = (r)=>{
            res.send(r);
        };
        var ms = _.extend(req.body || {});

        AppSettingsService.testMailServer(ms.ms,ms.email).then(respond);
    }


};

module.exports = _.extend(MailController,BaseController);