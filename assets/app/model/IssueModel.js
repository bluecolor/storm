Ext.define('App.model.IssueModel',{
    extend : 'Ext.data.Model',
    idProperty : 'id',

    fields : [
        {name : 'id',       type : 'string'},
        {name : 'tags',     type : 'auto' },
        {name : 'title',    type : 'string'},
        {name : 'body',     type : 'string'},
        {name : 'like',     type : 'int'},
        {name : 'dislike',  type : 'int'},
        {name : 'createdBy',type : 'auto'},
        {name : 'answers',  type : 'auto'}
    ]

});
