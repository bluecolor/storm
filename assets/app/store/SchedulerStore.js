Ext.define('App.store.SchedulerStore',{

    extend      : 'App.store.BaseStore',
    requires    : [
        'App.model.SchedulerModel'
    ],
    storeId     : 'SchedulerStore',
    alias       : 'store.SchedulerStore',
    model       : 'App.model.SchedulerModel',
    autoLoad    : false,

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
            create  : 'scheduler',
            read    : 'scheduler',
            update  : 'scheduler',
            destroy : 'scheduler'
        }
    },

    sorters : [{
        property: 'name',
        direction:'ASC'
    }],


    messageDataProperty  : 'name',

    createSuccessMessage : 'Created scheduler',
    createErrorMessage   : 'Failed to create scheduler',

    updateSuccessMessage : 'Updated scheduler',
    updateErrorMessage   : 'Failed to update scheduler',

    deleteSuccessMessage : 'Deleted scheduler',
    deleteErrorMessage   : 'Failed to delete scheduler',

    findByName : function(name) {
        return this.getAt(this.findExact('name',name));
    }

});
