Ext.define('App.model.UserModel',{
    extend : 'Ext.data.Model',

    idProperty:'id',

    fields : [
        {name : 'id',       type : 'string'},
        {name : 'username', type : 'string'},
        {name : 'password', type : 'string'},
        {name : 'name'    , type : 'string'},
        {name : 'email'   , type : 'string'},
        {name : 'role'    , type : 'string'},
        {name : 'active'  , type : 'boolean'}
    ]

});
