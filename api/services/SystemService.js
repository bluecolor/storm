var SysParams  = require('../constants/SysParams');

module.exports = {



    getVersion: function(){
        return SysConf.find({parameter:SysParams.VERSION}).then(function(r){
            return r[0];
        });
    },

    getConfig: function(param){
        return SysConf.find({parameter:param}).then(function(params){
            if(params.length>0){
                return params[0];
            }
        });
    }
};