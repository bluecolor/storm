module.exports = function(req, res, next) {

    User.findOne(req.session.passport.user)
        .then(function(u){
            if(u.hasAdminRole()){
                return next();
            }else{
                res.serverError('You are not authorized!');
            }
        }).catch(function(e){
            res.serverError(e);
        });
};