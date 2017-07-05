module.exports = {

    tag : {
        type  : 'string',
        unique: true
    },

    description: {
        type  : 'string'
    },

    createdBy: {
        model   : 'User',
        notBlank: true
    }

};