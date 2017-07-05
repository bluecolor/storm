Ext.define('App.store.IssueTagStore',{
    extend  : 'App.store.BaseStore',
    storeId : 'IssueTagStore',
    alias   : 'store.IssueTagStore',

    model   : 'App.model.IssueTagModel',
    autoLoad: true,

    proxy   : {

        type: 'rest',
        reader  : {
            type  : 'json',
            idProperty:'id'
        },
        writer  : {
            type  : 'json'
        },
        actionMethods: {
            create  : 'POST',
            read    : 'GET',
            update  : 'PUT',
            destroy : 'DELETE'
        },
        api: {
            create  : 'issueTag',
            read    : 'issueTag',
            update  : 'issueTag',
            destroy : 'issueTag'
        }
    },


    sorters: [
        {
            property: 'name',
            direction:'ASC'
        }
    ],

    idField : 'id',
    messageDataProperty  : 'name',

    createSuccessMessage : 'Created connection',
    createErrorMessage   : 'Failed to create connection',

    updateSuccessMessage : 'Updated connection',
    updateErrorMessage   : 'Failed to update connection',

    deleteSuccessMessage : 'Deleted connection',
    deleteErrorMessage   : 'Failed to delete connection'


});
