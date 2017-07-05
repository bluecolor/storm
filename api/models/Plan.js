/**
* Plan.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {

        name : {
            type    : 'string',
            unique  : true
        },

        parallel : {
            type        : 'integer',
            defaultsTo  : 1,
            min         : 1
        },

        active : {
            type : 'boolean'
        },

        description : {
            type : 'string'
        },

        schedule : {
            type : 'string'
        },

        protected : {
            type        : 'boolean',
            defaultsTo  : true
        },

        scheduler : {
            model: 'Scheduler'
        },

        connection: {
            model: 'Connection'
        },

        startAfter: {
            type : 'date'
        },

        tasks: {
            collection  : 'Task',
            via         : 'plan'
        },

        toJSON: function() {
            var o = this.toObject();
            delete o.tasks;
            return o;
        }

    }
};

