
var json2csv = require('json2csv');
var moment = require('moment');
var util = require('util');
var BaseController = require('./BaseController');
var fs = require('fs');

var TaskController = {

  find : function(req, res){
    var id = req.param('id');
    var respond = function(t){
      res.send(t);
    };
    TaskService.find(id).populateAll().then(respond);
  },

  findByOwner: function(req, res){
    var ownerId = req.param('ownerId');
    var respond = function(t){
      res.send(t);
    };
    TaskService.findByOwner(ownerId).then(respond);
  },

  findByPlan: function(req,res) {

    var respond = (t)=>{
      res.send(t);
    };
    var p = req.param('planId');

    TaskService.findByPlan(p).then(respond);
  },

  findByName: function(req, res){

    var respond = (t) => {
      res.send(t);
    };

    var name = req.param('name');

    TaskService.findByName(name).then(respond);
  },

  update : function(req, res){
    var t = _.extend(req.body || {});
    var respond = function(task){
      res.send(task);
    };

    TaskService.update(t).then(this.populate).then(respond);
  },

  create : function(req, res){
    var me = this,
        tasks = _.extend(req.body || {});

    respond = function(t){
      res.send(t);
    };
    TaskService.create(tasks).then(me.populate).then(respond).catch((e)=>{
      res.serverError(e);
    });
  },

  destroy : function(req, res) {
    var id = this.get(req);
    var respond = function(tasks){
      res.send(tasks);
    };
    TaskService.destroy(id).then(respond);
  },

  destroyByPlan : function(req, res){
    var respond = function(t){
      res.send(t);
    };
    TaskService.destroyByPlan(req.param('planId'));
  },

  populate : function(tasks){

    var t = _.isArray(tasks) ? tasks : [tasks];
    var i = _.pluck(t,'id');

    return Task.find(i)
      .populateAll()
      .then(function(tasks){
        return tasks;
      });
  },

  deactivate : function(req, res){

    var id = req.param('id');
    var respond = function(tasks){
      res.send(tasks);
    };
    TaskService.setActive(false,id).then(respond);
  },

  activate : function(req, res){

    var id = this.get(req);
    var respond = function(tasks){
      res.send(tasks);
    };

    TaskService.setActive(true,id).then(respond);
  },

  downloadByTasks : function(req, res){

    var respond = function(t){
      var fileName;
      if(t && t[0].plan){
        fileName = util.format("tasks_%s_%s.json" ,
          t[0].plan.name ,
          moment().format('YYYY.MM.DD HH:mm:ss'));
      }else{
        fileName = util.format("tasks_%s.json" ,
          moment().format('YYYY.MM.DD HH:mm:ss'));
      }
      res.attachment(fileName);
      res.end(new Buffer(JSON.stringify(t), 'UTF-8') );
    };

    var tasks = req.param('tasks').split(',');
    TaskService.download(tasks,'json').then(respond);
  },

  downloadByPlan: function(req, res){
    var respond = function(t){
      var fileName;
      if(t && t[0].plan){
        fileName = util.format("tasks_%s_%s.json" ,
          t[0].plan.name ,
          moment().format('YYYY.MM.DD HH:mm:ss'));
      }else{
        fileName = util.format("tasks_%s.json" ,
          moment().format('YYYY.MM.DD HH:mm:ss'));
      }
      res.attachment(fileName);
      res.end(new Buffer(JSON.stringify(t), 'UTF-8') );
    };

    Task.find({plan:req.param('id')}).then(function(tasks){
      TaskService.download(_.map(tasks,'id'),'json').then(respond);
    });

  },

  exclude : function(req, res){
    var id = this.get(req);
    var respond = function(tasks){
      res.send(tasks);
    };
    TaskService.setExcluded(true,id).then(respond);
  },

  include : function(req, res){
    var id = this.get(req);
    var respond = function(tasks){
      res.send(tasks);
    };
    TaskService.setExcluded(false,id).then(respond);
  },

  findByPrimaryGroup : function(req, res){
    var gid = req.param('gid');
    var respond = function(t){
      res.send(t);
    };
    TaskService.findByPrimaryGroup(gid).then(respond);
  },

  findByGroup : function(req, res){
    var gid = req.param('gid');
    var respond = function(t){
      res.send(t);
    };
    TaskService.findByGroup(gid).then(respond);
  },

  searchByName: function(req, res){
    var respond = function(t){
      res.send(t);
    };

    TaskService.searchByName(req.param('q')).then(respond);
  },

  upload: function(req, res){

    var respond = (tasks) => {
      res.set('Content-Type', 'text/plain');
      res.send({
        success : true,
        tasks   : tasks
      });
    };

    req.file('file').upload(function (err, files) {
      if (err) {
        return res.send(500, err);
      }

      fs.readFile(files[0].fd, 'utf8', function(err, content) {
        TaskService.upload(content).then(respond).catch((e)=>{
          console.log(e);
          res.serverError(e);
        });
      });

    });
  }

};


module.exports = _.extend(TaskController,BaseController);
