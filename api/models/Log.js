var Log = {

    attributes : {

        level: {
            type: 'string'
        },


        status: {
            type: 'string'
        },

        model: {
            type : 'string'
        },

        modelId: {
            type : 'string'
        },

        owner: {
            model: 'User'
        },

        log: {
            type: 'string'
        }
    }
};

module.exports = Log;