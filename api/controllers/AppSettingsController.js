
module.exports = {


    find: function(req, res){
        var respond = function(s){
            res.send(s);
        };
        var param = req.param('name');
        AppSettingsService.find(param).then(respond);
    }

    //,
    //
    //
    //find : function(req, res){
    //    var respond = function(s){
    //        res.send(s);
    //    };
    //    AppSettingsService.find().then(respond);
    //},
    //
    //save : function(req, res){
    //    var respond = function(s){
    //        res.send(s);
    //    };
    //    var settings = _.extend(req.body || {});
    //
    //    AppSettingsService.save(settings).then(respond);
    //},
    //
    //testMailServer: function(req, res){
    //    var respond = (response)=>{
    //        res.send(response);
    //    };
    //
    //    var ms = _.extend(req.body || {});
    //
    //    AppSettingsService.testMailServer(ms.ms,ms.email).then(respond);
    //}

};

