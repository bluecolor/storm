module.exports = {

    attributes: {

        tags  : {
            collection: 'IssueTag',
            notEmpty: true
        },

        title   : {
            type: 'string'
        },

        body: {
            type: 'string'
        },

        createdBy   : {
            model: 'User'
        },

        like: {
            type: 'int'
        },

        dislike: {
            type: 'int'
        },

        answers: {
            collection: 'IssueAnswer',
            unique    : true
        }
    }

};