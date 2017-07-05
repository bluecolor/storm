module.exports = {

    testConnection : function(id){
        return Connection.findOne(id).then(function(con){
            return ConnectionService.testDBConnection(con);
        });
    },

    describeQuery : function(query){

    }


};