var logLevel = require('../constants/LogLevel');
var logType =  require('../constants/LogType');
var B = require('bluebird');
var Model = require('../constants/Model');


/*
    todo wee need more 'destroy' errrs
 */
var LogService = {


    destroy: function(){
        return Log.destroy();
    },

    find: function(id, page){
        if(id && _.isString(id)){
            return TaskInstanceLog.findOne(id);
        }

        if(!page){
            return Log.find().populateAll();
        }else{
            return Log.find().paginate({page: page, limit: 20}).populateAll();
        }
    },

    findByTaskInstance: function(id){
        return Log.find({model:Model.TaskInstance,modelId:id});
    },


    findByModel: function(m, id){
        return Log.find({model:m,modelId:id});
    },

    findByOwner: function(o){
        return Log.find({owner:o});
    },

    log: function(lg,level){

        if(level != undefined){
            lg.level = level;
        }else if(lg.level == undefined && level==undefined){
            lg.level = 'WARNING';
            lg.log = lg.log + ' (Log level is not set. Setting to WARNING.)';
        }

        switch (lg.level){
            case logLevel.ERROR: return this.error(lg);
            case logLevel.DEBUG: return this.debug(lg);
            case logLevel.INFO:  return this.info(lg);
            case logLevel.WARNING: return this.warn(lg);
        }
    },

    error: function(lg){
        var log = this._getLog(lg);
        log.level = logLevel.ERROR;
        return Log.create(log).then((l)=>{return l;});
    },

    debug: function(lg){

        var log = this._getLog(lg);
        log.level = logLevel.DEBUG;
        return Log.create(log).then(function(l){return l;});
    },

    info: function(lg){
        var log = this._getLog(lg);
        log.level = logLevel.INFO;
        return Log.create(log).then(function(l){
            return l;
        });
    },

    warn: function(lg){
        var log = this._getLog(lg);
        log.level = logLevel.WARNING;
        return Log.create(log).then((l)=>{return l;});;
    },


    _getLog: function(lg){
        var log = {};

        if(_.isString(lg)){
            lg = {log: lg};
        }

        if(!_.isEmpty(lg.model)){
            log.model = lg.model;
        }

        if(!_.isEmpty(lg.modelId)){
            log.modelId = lg.modelId;
        }

        if(!_.isEmpty(lg.status)){
            log.status = lg.status;
        }
        if(!_.isEmpty(lg.level)){
            log.level = lg.level;
        }
        if(!_.isEmpty(lg.log)){
            log.log = lg.log;
        }


        if(!_.isEmpty(lg.owner)){
            log.owner = lg.owner;
        }else{
            log.owner = 'System';
        }


        return log;
    }


};

module.exports = LogService;