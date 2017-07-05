Ext.define('App.store.IssueStore',{
    extend  : 'App.store.BaseStore',
    storeId : 'IssueStore',
    alias   : 'store.IssueStore',

    model   : 'App.model.IssueModel',
    autoLoad: false,

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
            create  : 'issue',
            read    : 'issue',
            update  : 'issue',
            destroy : 'issue'
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
