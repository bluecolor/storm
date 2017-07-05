Ext.define('App.model.ConnectionModel',{
    extend : 'Ext.data.Model',
    idProperty : 'id',

    fields : [
        {name : 'connectionType', type : 'string'},
        {name : 'id',       type : 'string'},
        {name : 'name',     type : 'string'},
        {name : 'username', type : 'string'},
        {name : 'password', type : 'string'},
        {name : 'url',      type : 'string'},
        {name : 'port',     type : 'int'},
        {name : 'active',   type : 'boolean'}
    ]

});