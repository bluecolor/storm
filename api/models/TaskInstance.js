
var Status = require('../constants/Status');

module.exports = {

    attributes: {

        session : {
            model : 'Session',
            index : true
        },

        task : {
            model : 'Task',
            index : true
        },

        startDate : {
            type : 'float'
        },

        endDate : {
            type : 'float'
        },

        duration: {
            type: 'float'
        },

        avgDuration: {
            type: 'float'
        },

        status  : {
            type : 'string',
            defaultsTo  : 'READY'
        },

        /* overrides */
        technology: {
            type  : 'string'
        },

        script : {
            type: 'string'
        },

        critical : {
            defaultsTo: false,
            type : 'boolean'
        },

        order : {
            type : 'integer',
            defaultsTo: 10
        },

        excluded: {
            type : 'boolean',
            defaultsTo : false
        },

        predecessors : {
            collection : 'Task',
            index : true
        },

        predecessorInstances: {
            type : 'json',
            index: true
        },

        connection : {
            model : 'Connection'
        },

        getCommand : function(){
            return this.command ? this.command : this.task.command;
        },

        getDuration: function(){

            if(!this.startDate){
                return 0;
            }
            if(!this.endDate && this.status == Status.RUNNING){
                return _.now() - this.startDate;
            }else if(this.endDate && this.duration){
                return this.duration;
            }
            return 0;
        },

        toJSON: function() {
            var o = this.toObject();
            o.duration = this.getDuration();
            return o;
        }
    }
};

