module.exports = {


    body: {
        type    : 'string',
        notBlank: true
    },

    createdBy: {
        model : 'User'
    },

    like: {
        type: 'int'
    },

    dislike: {
        type: 'int'
    }

};