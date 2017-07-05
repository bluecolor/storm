module.exports = {

    get : function(req,prop){
        prop = prop || 'id';
        var o = [];

        if(req.body && req.body[prop]){
            o = _.isArray(req.body[prop]) ? req.body[prop] : [req.body[prop]];
        }else {
            o = req.param(prop) ? [req.param(prop)] : undefined;
        }

        return o;
    }
};

