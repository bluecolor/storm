

module.exports = {

    find : function(req, res){
        var me = this,id = req.param('id');
        var respond = function(r){
            res.send(r);
        };
        GroupService.find(id).then(respond);
    },

    findByName: function(req, res){
        var name = req.param('name'),
            respond = function(r){
                res.send(r);
            };
        GroupService.findByName(name).then(respond);
    },

    create : function(req, res){
        var group  = _.extend(req.body || {});
        var respond= function(g){
            res.send(g);
        };

        GroupService.create(group).then(respond);
    },

    update: function(req, res) {
        var group = _.extend(req.body || {});
        var respond = function(g){
            res.send(g);
        };
        GroupService.update(group).then(respond);
    },

    destroy : function(req, res) {

        var respond = function(g){
            res.send(g);
        };
        var id = req.param('id');

        GroupService.destroy(id).then(respond);
    },

    findByScheduler : function(req, res){
        var schId   = req.param('schedulerId'),
            respond = function(r){
                res.send(r);
            };
        
        GroupService.findByScheduler(schId).then(respond);
    },

    findTasks : function(req, res){
        var g = req.param('id');
        var respond = function(t){
            res.send(t);
        };
        GroupService.findTasks(g).then(respond);
    }

};

