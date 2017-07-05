Ext.define('App.view.task.TaskOwners',{
    extend  : 'App.view.pool.list.BasicList',
    xtype   : 'taskowners',

    requires: [
    ],


    name : 'taskOwners',
    reference : 'TaskOwners',

    columns : [
        {
            name      : 'name',
            dataIndex : 'name',
            flex      : 1
        },
        {
            name    : 'remove',
            xtype   : 'actioncolumn',
            icon    : 'resources/img/minus-16.png',
            iconCls : 'x-hidden',
            sortable: false,
            resizable : false,
            width   : 30,
            menuDisabled : true,
            handler : 'onRemoveOwner'
        }
    ],

    setValues : function(owners) {
        this.store.add(owners);
        return this;
    },

    getValues : function(){

        var items = this.store.data.items;
        return _.chain(items).map('data').map('id').value();
    },

    setReadOnly : function(b){

    },

    constructor : function(){
        this.store = Ext.create('App.store.BaseStore',{
            model : 'App.model.UserModel',
            autoLoad:false});

        var u = Ext.getStore(Constants.Store.USER).getById(User.id);
        this.store.add(u);
        this.callParent(arguments);
    }

});
