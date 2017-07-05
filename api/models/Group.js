module.exports = {

    attributes: {

        name: {
            type    : 'string',
            notEmpty: true,
            unique  : true
        },

        scheduler: {
            model: 'Scheduler',
            notEmpty: true
        },

        connection: {
            model: 'Connection'
        },

        description: {
            type: 'string'
        },

        parallel: {
            type: 'integer',
            defaultsTo: 1,
            min: 1
        }
    }
};

