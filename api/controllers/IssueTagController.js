var BaseController = require('./BaseController');

var IssueTagController = {
    
    find: function (req, res) {
        var id = req.param('id');
        var respond = function(r){
            res.send(r);
        };

        IssueTagService.find(id).then(respond);
    },

    create: function(req, res){
        var tag = _.extend(req.body || {});
        var respond = function(r){
            res.send(r);
        };
        tag.createdBy = req.session.passport.user.id;

        IssueTagService.create(tag).then(respond);
    },

    update: function(req, res){
        var tag = _.extend(req.body || {}),
            id  = req.param('id');

        var respond = function(r){
            res.send(r);
        };

        IssueTagService.update(id,tag).then(respond);
    },

    destroy: function (req, res) {
        var id = req.param('id');

        var respond = function(r){
            res.send(r);
        };

        IssueTagService.destroy(id).then(respond);
    }


};


module.exports = _.extend(IssueTagController,BaseController);