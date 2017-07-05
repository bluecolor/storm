
var Promise = require('bluebird');

module.exports = {


    findConf: function(name){
        return AppConf.find({parameter: name}).then(confs=> {
            return confs[0].value;
        });
    },

    findAllConf: function(){
        return AppConf.find().then(confs=>{
            return confs;
        });
    },

    saveConf: function(param, value, user){

        return AppConf.find({parameter:param}).then(function(confs){

            var promise;
            if(_.isEmpty(confs)){
                promise = AppConf.create({
                    modifiedBy: user,
                    parameter : param,
                    value     : value
                });
            }else{
                promise = AppConf.update(confs[0].id,{
                    modifiedBy: user,
                    parameter : param,
                    value     : value
                });
            }
            return promise.then(function(){
                return AppConf.find({parameter:param}).then(confs=>{
                    return confs[0];
                });
            });
        });
    },

    saveConfs: function(confs,user){
        var me = this;
        return Promise.reduce(confs,function(result, conf){
            return me.saveConf(conf.parameter,conf.value,user).then(function(conf){
                result.push(conf);
                return result;
            });
        },[]).then(function(result){
            return result;
        });
    },


    findObjects : function(q){
        var models = [
            {
                model : Plan,
                type  : 'plan'
            },{
                model : Group,
                type  : 'group'
            }];
        var objects = [];
        var all = _.map(models,function(m){

            return m.model.find(q).then(function(o){
                return {
                    type    : m.type,
                    objects : o
                }
            });
        });

        return Promise.all(all).then(function(o){
            return o;
        });
    },

    findObjectsFlat : function(q){
        return this.findObjects(q).then(function(o){
            var objects = [];
            objects = _.map(o, function(m){
                return _.map(m.objects, function(object){
                    return {
                        type : m.type,
                        id   : object.id,
                        name : object.name
                    };
                });
            });
            return _.flatten(objects);
        });
    }
};