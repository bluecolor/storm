Ext.define('App.store.GroupStore',{
    extend  :'App.store.BaseStore',

    alias   : 'GroupStore',
    model   : 'App.model.GroupModel',
    autoLoad: false,
    autoSync: false,


    messageDataProperty  : 'name',

    createSuccessMessage : 'Created Task Group',
    createErrorMessage   : 'Failed to create Task Group!',

    updateSuccessMessage : 'Updated Task Group',
    updateErrorMessage   : 'Failed to update Task Group!',

    deleteSuccessMessage : 'Deleted Task Group',
    deleteErrorMessage   : 'Failed to delete Task Group!',

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
            create  : 'group',
            read    : 'group',
            update  : 'group',
            destroy : 'group'
        }
    },

    loadStore:function(sch) {
        if(sch){
            this.proxy.api.read = 'group/scheduler/{}'.format(sch);
            this.load();
        }
    },



    sorters : [{
        property: 'name',
        direction:'ASC'
    }]




});
