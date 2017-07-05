Ext.define('App.model.IssueTagModel',{
    extend : 'Ext.data.Model',
    idProperty : 'id',

    fields : [
        {name : 'id',       type : 'string'},
        {name : 'tag',      type : 'string'},
        {name : 'createdBy',type : 'auto'}
    ]

});
