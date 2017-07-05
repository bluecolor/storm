module.exports = {

    testConnection: function(req, res){

        var respond = (r)=>{
            res.send({success:r});
        };
        var onError = function(e){
            res.serverError(e);
        };
        var id = req.param('id');

        SQLService.testConnection(id).then(respond).catch(onError);
    },

    describeQuery: function(req, res){
        var query   = _.extend(req.body || {}).query;
        var respond = function(r){
            res.send(r);
        };
        var onError = function(e){
            res.serverError(e);
        };

        SQLService.describeQuery(query).then(respond).catch(onError);
    }

};