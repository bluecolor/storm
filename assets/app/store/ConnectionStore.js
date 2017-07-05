Ext.define('App.store.ConnectionStore',{
    extend  : 'App.store.BaseStore',
    storeId : 'ConnectionStore',
    alias   : 'store.ConnectionStore',

    model   : 'App.model.ConnectionModel',
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
            create  : 'connection',
            read    : 'connection',
            update  : 'connection',
            destroy : 'connection'
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
