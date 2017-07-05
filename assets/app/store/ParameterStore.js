Ext.define('App.store.ParameterStore',{
    extend  : 'App.store.BaseStore',
    storeId : 'ParameterStore',
    alias   : 'store.ParameterStore',

    model   : 'App.model.ParameterModel',
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
            create  : 'parameter',
            read    : 'parameter',
            update  : 'parameter',
            destroy : 'parameter'
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

    createSuccessMessage : 'Created parameter',
    createErrorMessage   : 'Failed to create parameter',

    updateSuccessMessage : 'Updated parameter',
    updateErrorMessage   : 'Failed to update parameter',

    deleteSuccessMessage : 'Deleted parameter',
    deleteErrorMessage   : 'Failed to delete parameter'


});
