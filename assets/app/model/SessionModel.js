Ext.define('App.model.SessionModel', {

    extend : 'Ext.data.Model',

    idProperty : 'id',

    fields : [
        {
            name : 'id',
            type : 'string'
        },
        {
            name : 'name',
            type : 'string'
        },
        {
            name : 'shortName',
            convert : function(v,r){
                var name = r.get('name'),
                    n = name.split('-');

                if(n.length == 3){
                    n.pop();
                    return n.join('-');
                }

                return name;
            }
        },
        {
            name : 'date',
            type : 'date'
        },
        {
            name : 'taskInstances',
            type : 'auto'
        },
        {
            name : 'plan',
            type : 'auto'
        },
        {
            name : 'status',
            type : 'string',
            convert: function(v,r){
                var stats = r.get('stats');
                if(v == Constants.Status.RUNNING && stats.RUNNING == 0){
                    return App.lib.Constants.Status.IDLE;
                }
                return v;
            }
        },
        {
            name : 'serviceStatus',
            type : 'string',
            mapping: 'status'
        },
        {
            name : 'stats',
            type : 'auto'
        },
        {
            name   : 'all',
            type   : 'int',
            mapping: 'stats.ALL'
        },
        {
            name   : 'ready',
            type   : 'int',
            mapping: 'stats.READY'
        },
        {
            name   : 'running',
            type   : 'int',
            mapping: 'stats.RUNNING'
        },
        {
            name   : 'success',
            type   : 'int',
            mapping: 'stats.SUCCESS'
        },
        {
            name   : 'error',
            type   : 'int',
            mapping: 'stats.ERROR'
        },
        {
            name   : 'blocked',
            type   : 'int',
            mapping: 'stats.BLOCKED'
        },
        {
            name   : 'killed',
            type   : 'int',
            mapping: 'stats.KILLED'
        },
        {
            name   : 'excluded',
            type   : 'int',
            mapping: 'stats.EXCLUDED'
        }

    ]

});