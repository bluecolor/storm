module.exports = {

    find: function(req, res){
        var respond = function(lg){
            res.send(lg);
        };
        var page = req.param('page');
        page = page?page:1;

        LogService.find(req.param('id'), page).then(respond);
    },

    findByTaskInstance: function(req, res){
        var respond = function(lg){
            res.send(lg);
        };
        var t = req.param('id');
        LogService.findByTaskInstance(t)
            .populate('owner')
            .then(respond);
    },

    destroy: function(req, res){

        var respond = function(lg){
            res.send(lg);
        };
        LogService.destroy().then(respond);
    }


};

