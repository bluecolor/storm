Ext.define('App.model.TaskModel', {
    extend: 'Ext.data.Model',

    idProperty:'id',
    fields: [
        {
            name    : 'id',
            type    : 'string'
        },
        {
            name    : 'plan',
            type    : 'auto'
        },
        {
            name    : 'planName',
            type    : 'string',
            mapping : 'plan.name'
        },
        {
            name    : 'name',
            type    : 'string'
        },
        {
            name    : 'excluded',
            type    : 'boolean'
        },
        {
            name    : 'mask',
            type    : 'string'
        },
        {
            name    : 'technology',
            type    : 'string'
        },
        {
            name    : 'script',
            type    : 'string'
        },
        {
            name    : 'primaryGroup',
            type    : 'auto'
        },
        {
            name    : 'primaryGroupName',
            type    : 'string',
            mapping : 'primaryGroup.name'
        },
        {
            name    : 'primaryGroupId',
            type    : 'string',
            mapping : 'primaryGroup.id'
        },
        {
            name    : 'groups',
            type    : 'auto'
        },
        {
            name    : 'critical',
            type    : 'boolean',
            convert : function(v){
                return v || false;
            }
        },
        {
            name    : 'active',
            type    : 'boolean'
        },
        {
            name : 'predecessors',
            type : 'auto'
        },
        {
            name : 'order',
            type : 'int'
        },
        {
            name    : 'schedulerName',
            type    : 'string',
            mapping : 'plan.scheduler',
            convert : function(v){
                var r = Ext.getStore(Constants.Store.SCHEDULER).getById(v);
                if(r){
                    return r.get('name');
                }
            }
        }
    ]
});


