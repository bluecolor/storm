var BaseController  = require('./BaseController'),
    util            = require('util'),
    moment          = require('moment'),
    fs              = require('fs');

var SchedulerController = {

    download: function(req, res){
        var schedulerId = req.param('id');
        var o = req.param('options').split(',');

        var options = _.reduce(o,function(res,opt){
            res[opt] = true;
            return res;
        },{});

        var respond = function(r){
            var file, scheduler = r.scheduler.name;
            if(!options.scheduler){
                delete options.scheduler;
            }
            file = util.format("scheduler_%s_%s.json" ,
                scheduler,
                moment().format('YYYY.MM.DD HH:mm:ss'));
            res.attachment(file);
            res.end(new Buffer(JSON.stringify(r), 'UTF-8') );
        };

        SchedulerService.download(schedulerId,options).then(respond);

    },

    upload: function(req, res){
        var respond = (result) => {
            res.set('Content-Type', 'text/plain');
            res.send({
                success : true,
                tasks   : result
            });
        };

        req.file('file').upload(function (err, files) {
            if (err) {
                return res.send(500, err);
            }
            fs.readFile(files[0].fd, 'utf8', function(err, content) {
                SchedulerService.upload(content).then(respond).catch((e)=>{
                    console.log(e);
                    res.serverError(e);
                });
            });
        });

    },


    planTaskStatusStats: function(req,res){
        var schedulerId = req.param('schedulerId');
        var respond = function(s){
            res.send(s);
        };
        SchedulerService.planTaskStatusStats(schedulerId).then(respond);
    },

    find : function(req, res){
        var id = req.param('id');
        var respond = function(s){
            res.send(s);
        };

        SchedulerService.find(id).then(respond);
    },

    findByName: function(req, res){
        var name = req.param('name'),
            respond = function(r){
                res.send(r);
            };

        SchedulerService.findByName(name).then(respond);


    },



    create : function(req, res){
        var sch = _.extend(req.body || {});
        var respond = function(s){
            res.send(s);
        };
        SchedulerService.create(sch).then(respond);
    },

    update : function(req, res){
        var sch = _.extend(req.body || {});
        var respond = function(s){
            res.send(s);
        };
        SchedulerService.update(sch).then(respond);
    },


    destroy : function(req, res) {

        var id = this.get(req);
        var respond = function(s){
            res.send(s);
        };
        SchedulerService.destroy(id).then(respond);
    }

};

module.exports = _.extend(SchedulerController,BaseController);
