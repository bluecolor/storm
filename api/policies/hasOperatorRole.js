module.exports = function(req, res, next) {

    User.findOne(req.session.passport.user)
        .then(function(u){
            if(u.hasOperatorRole()){
                return next();
            }else{
                res.serverError('You are not authorized!');
            }
        }).catch(function(e){
            res.serverError(e);
        });
};