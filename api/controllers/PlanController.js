
var BaseController = require('./BaseController');


var PlanController = {


    findAll : function(req, res){
        Plan.find().populateAll().then(function(plans){
            res.send(plans);
        });
    },

    find : function(req, res){
        Plan.find({id:req.param('id')}).then(function(plan){
            res.send(plan);
        });
    },

    findByName: function(req, res){
        var name = req.param('name'),
            respond = function(r){
                res.send(r);
            };
        
        PlanService.findByName(name).then(respond);
    },

    findTasksByStatus: function(req, res){
        var planId = req.param('id'),
            status = req.param('status'),
            respond= function(r){
                res.send(r);
            };

        PlanService.findTasksByStatus(planId,status).then(respond);

    },

    create : function(req, res){
        var plans = _.extend(req.body || {}),
            respond = (plans)=>{
                res.send(plans);
            };

        PlanService.create(plans).then(respond);
    },

    update : function(req, res){
        var plan    = _.extend(req.body || {}),
            id      = req.param('id'),
            respond = (plan)=>{
                res.send(plan);
            };

        PlanService.update(id,plan).then(respond);
    },

    destroy : function(req, res) {
        var id = req.param('id');
        var respond = function(p){
            res.send(p);
        };
        PlanService.destroy(id).then(respond);
    },

    findByScheduler : function(req, res){

        var respond = (p) => {
            res.send(p);
        };
        var schedulerId = req.param('schedulerId');

        PlanService.findByScheduler(schedulerId).then(respond);
    },

    deactivate : function(req, res){
        var respond = function(p){
            res.send(p);
        };
        var id = this.get(req);
        PlanService.setActive(false,id).then(respond);
    },

    activate : function(req, res){
        var respond = function(p){
            res.send(p);
        };
        var id = this.get(req);
        PlanService.setActive(true,id).then(respond);
    },

    protect : function(req, res){
        var id = this.get(req);
        var respond = function(p){
            res.send(p);
        };
        PlanService.protect(id).then(respond);
    },

    unprotect : function(req, res){
        var id = this.get(req);
        var respond = function(p){
            res.send(p);
        };
        PlanService.unprotect(id).then(respond);
    },

    validate : function(req, res){
        var p = req.param('id');
        var respond = (result) =>{
            res.send(result);
        };

        PlanService.validate();
    },

    taskStatusStats: function(req, res){
        var planId = req.param('id');
        var respond = (result) =>{
            res.send(result);
        };

        PlanService.findPlanTaskStatusStats(planId).then(respond);
    }


};

module.exports = _.extend(PlanController,BaseController);
