Ext.define('App.model.GroupModel', {
    extend      : 'Ext.data.Model',
    idProperty  : 'id',

    fields: [
        {
            name : 'id',
            type : 'string'
        },
        {
            name : 'name',
            type : 'string'
        },
        {
            name : 'scheduler',
            type : 'auto'
        },
        {
            name : 'parallelLimit',
            type : 'int'
        },
        {
            name : 'taskCount',
            type : 'int'
        },
        {
            name : 'description',
            type : 'string'
        }
    ]

});

