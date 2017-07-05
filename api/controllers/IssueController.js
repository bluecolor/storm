var BaseController = require('./BaseController');

var IssueController = {


    find: function (req, res) {
        var id = req.param('id');
        var respond = function(r){
            res.send(r);
        };

        // IssueService.find(id).then(respond);
    },

    create: function(req, res) {
        var issue       = _.extend(req.body || {});
        var respond     = function(r){
            res.send(r);
        };
        issue.createdBy = req.session.passport.user.id;
        // IssueService.create(issue).then(respond);
    },

    update: function(req, res){
        var issue = _.extend(req.body || {}),
            id    = req.param('id');

        var respond = function(r){
            res.send(r);
        };

        // IssueService.update(id,issue).then(respond);
    },

    destroy: function (req, res) {
        var id = req.param('id');

        var respond = function(r){
            res.send(r);
        };

        // IssueService.destroy(id).then(respond);
    }
};


module.exports = _.extend(IssueController,BaseController);