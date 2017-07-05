Ext.define('App.store.UserStore',{

    extend      : 'App.store.BaseStore',
    requires    : ['App.model.UserModel'],

    model       : 'App.model.UserModel',

    autoLoad    : false,

    id          : 'UserStore',
    alias       : 'store.UserStore',

    sorters: [
        {
            property: 'name',
            direction:'ASC'
        }
    ],


    idField : 'username',
    messageDataProperty  : 'username',

    createSuccessMessage : 'Created user',
    createErrorMessage   : 'Failed to create user',

    updateSuccessMessage : 'Updated user',
    updateErrorMessage   : 'Failed to update user',

    deleteSuccessMessage : 'Deleted user',
    deleteErrorMessage   : 'Failed to delete user',


    constructor : function() {
        this.callParent(arguments);
        this.proxy.api= {
            create  : 'user',
            read    : 'user',
            update  : 'user',
            destroy : 'user'
        };

        this.load();
    }
});
