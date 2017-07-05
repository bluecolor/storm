Ext.define('App.view.group.GroupTasks',{
    extend: 'App.view.pool.grid.GridWithAction',
    xtype : 'grouptasks',

    requires : [
        'App.view.pool.column.GearActionColumn'
    ],

    columnLines : false,
    reference   : 'GroupTasks',
    name        : 'groupTasks',

    viewConfig: {
        markDirty : false,
        mouseOverOutBuffer : false,

        getRowClass : function(r) {
            var active = r.get('active');
            if(!active){
                return 'inactive';
            }
        }
    },

    columns : [
        {
            text : 'Name',
            name : 'name',
            dataIndex : 'name',
            flex : 1
        },
        {
            name     : 'primary',
            text     : 'Primary?',
            dataIndex: 'primaryGroupId',
            align    : 'center',
            renderer : function(v,m, r){
                var primary = v == this.up('group').down('groupdetail [name=id]').getValue(),
                    css = primary ? 'primary-group' : 'non-primary-group';
                m.css = '{0} {1}'.format(m.css,css);
                return primary ? 'Yes' : 'No';
            }
        },
        {
            xtype : 'gearactioncolumn',
            listeners : {
                'actionclick' : 'onTaskMenu'
            }
        },
        {
            name    : 'edit',
            hidable : false,
            xtype   : 'actioncolumn',
            iconCls : 'x-hidden',
            tooltip : 'Edit task',
            icon    : 'resources/img/pencil-16.png',
            sortable: false,
            resizable : false,
            width   : 30,
            menuDisabled : true,
            handler : function(g, ri, ci,i ,e, r){
                this.lookupController().onEditTask(r.data)
            }

        },
        {
            name    : 'remove',
            hidable : false,
            xtype   : 'actioncolumn',
            tooltip : 'Remove from group',
            icon    : 'resources/img/minus-16.png',
            iconCls : 'x-hidden',
            sortable: false,
            resizable : false,
            width   : 30,
            menuDisabled : true,
            handler : 'onRemoveTaskFromGroup'
        }
    ],

    load : function(gid){
        var me = this;
        var loadStore = function(){
            var s = me.getStore();
            s.proxy.api.read='/task/group/{}'.format(gid);
            s.load();
        };

        var name = me.up('[name=groupInfo]').getActiveTab().name;
        if(name && name === me.name){
            loadStore();
        }else {
            me.on('activate',loadStore,this,{single:true});
        }


    },

    setValues : function(tasks){
        this.store.loadRawData(tasks);
    },

    getValues : function(){
        var items = this.store.data.items;
        return _.chain(items).map('data.id').value();
    },

    constructor : function(){
        this.store = Ext.create('Ext.data.Store',{
            model : 'App.model.TaskModel',
            autoLoad : false,
            pageSize : 0,
            proxy : {
                type: 'ajax',
                url: '/task/group/{}',
                reader: {
                    type: 'json'
                }
            }
        });
        this.callParent(arguments);
    }


});
