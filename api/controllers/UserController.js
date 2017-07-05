var BaseController = require('./BaseController');

var UserController = {


    me: function(req, res){
        var u = req.session.passport.user;
        var respond = function(user){
            res.send(user);
        };
        UserService.find(u).then(respond);
    },

    findTasksByStatus: function(req, res){
        var id      = req.param('id'),
            status  = req.param('status'),
            respond = function(r){
                res.send(r);
            };

        UserService.findTasksByStatus(id,status).then(respond);

    },

    findSuperUSer: function(req, res){
        var respond = function(u){
            res.send(u);
        };
        UserService.findSuperUser().then(respond);
    },

    findByUsername : function(req, res){
        var username = req.param('username');
        var respond = function(u){
            res.send(u);
        };
        UserService.findByUsername(username).then(respond);
    },

    find : function(req, res){

        var id = req.param('id');
        var respond = function(u){
            res.send(u);
        };

        UserService.find(id).then(respond);
    },

    create : function(req, res){
        var respond = function(u){
            res.send(u);
        };
        var onError = function(e){
            res.serverError(e);
        };
        var user = _.extend(req.body || {});
        UserService.create(user).then(respond).catch(onError);
    },


    destroy : function(req, res) {

        var u = this.get(req);
        var respond = (user)=>{
            res.send(user);
        };
        UserService.destroy(u).then(respond);
    },

    destroyExceptSu: function(req, res){
        var respond = (u)=>{
            res.send(u);
        };
        UserService.destroyExceptSu().then(respond);
    },

    saveOptions: function(req, res){
        var respond = function(u){
            res.send(u);
        };
        var o = _.extend(req.body || {});
        var u = req.session.passport.user;
        UserService.saveOptions(u,o).then(respond);
    },

    findTaskOwners: function(req, res){
        var respond = function(owners){
            res.send(owners);
        };
        UserService.findTaskOwners().then(respond);
    },

    update: function(req, res){
        var respond = function(u){
            res.send(u);
        };

        var user = _.extend(req.body || {});
        var id = this.get(req);

        UserService.update(id,user).then(respond);
    },

    changePassword: function(req, res){
        var respond = function(r){
            res.send(r);
        };
        var onError = function(e){
            res.serverError(e);
        };

        var userId = req.session.passport.user;
        var p = _.extend(req.body || {});
        console.log(p);
        UserService.changePassword(userId,p).then(respond).catch(onError);
    }

};


module.exports = _.extend(UserController,BaseController);
