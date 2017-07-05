/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var status = require('../constants/Status.js');

module.exports = {

    attributes: {

        name : {
            type    : 'string',
            notEmpty: true,
            unique  : true
        },

        excluded: {
            type : 'boolean',
            defaultsTo : false
        },

        description : {
            type : 'string'
        },

        technology: {
            type  : 'string'
        },

        script: {
            type : 'string'
        },

        order : {
            type : 'integer',
            defaultsTo: 10
        },

        active : {
            type : 'boolean',
            defaultsTo: true,
            required : true
        },

        critical : {
            defaultsTo: false,
            type : 'boolean'
        },

        groups : {
            collection  : 'Group',
            type        : 'json',
            index: true
        },

        primaryGroup : {
            model   : 'Group',
            index   : true
        },

        owners : {
            collection : 'User'
        },

        plan : {
            model : 'Plan',
            required : true,
            index    : true
        },

        connection : {
            model : 'Connection'
        },

        mask : {
            type : 'string'
        },

        predecessors : {
            collection : 'Task',
            index      : true
        }
    }

};

