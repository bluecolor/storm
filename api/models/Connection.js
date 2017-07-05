
var ConnectionType = require('../constants/ConnectionType.js');

module.exports = {

    types : {
        isValidConnectionType : function(t){
            return ConnectionType.isValid(t);
        }
    },

    attributes: {

        connectionType: {
            type        : 'string',
            defaultsTo  : ConnectionType.SSH,
            notEmpty    : true,
            isValidConnectionType : true
        },

        name : {
            type    : 'string',
            notEmpty: true,
            unique  : true
        },

        /*
            - hostname or IP for SSH connections
            - jdbc url for db connections
         */
        url : {
            type : 'string'
        },

        className: {
            type : 'string'
        },

        port : {
            type : 'integer',
            max  : 65535,
            defaultsTo : 22
        },

        username : {
            type : 'string'
        },

        password : {
            type : 'string'
        },

        active : {
            type : 'boolean',
            defaultsTo  : true
        }

    }
};

