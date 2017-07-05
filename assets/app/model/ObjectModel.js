Ext.define('App.model.ObjectModel',{
    extend : 'Ext.data.Model',
    idProperty  : 'uid',

    fields : [
        {
            name : 'uid',
            type : 'string',
            convert  : function(v,r){
                return '{0}-$-{1}'.format(r.get('type'),r.get('id'));
            }
        },
        {
            name : 'id',  type : 'string'
        },
        {
            name : 'type', type : 'string'
        },
        {
            name : 'name', type : 'string'
        }
    ]
});