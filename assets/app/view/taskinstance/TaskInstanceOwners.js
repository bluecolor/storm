Ext.define('App.view.taskinstance.TaskInstanceOwners',{
    extend  : 'App.view.pool.list.BasicList',
    xtype   : 'taskinstanceowners',

    requires: [
    ],


    name : 'taskInstanceOwners',
    reference : 'TaskInstanceOwners',

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
        return _.chain(items).pluck('data').pluck('id').value();
    },

    setReadOnly : function(b){

    },

    constructor : function(){
        this.store = Ext.create('App.store.BaseStore',{
            model : 'App.model.UserModel',
            autoLoad:false});
        this.callParent(arguments);
    }

});
