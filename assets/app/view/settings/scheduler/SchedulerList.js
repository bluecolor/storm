Ext.define('App.view.settings.scheduler.SchedulerList',{
    extend : 'App.view.pool.list.BasicList',
    xtype  : 'schedulerlist',

    requires: [
        'App.view.pool.textfield.SearchTextField'
    ],


    reference : 'SchedulerList',

    bind : {
        store : '{schedulers}'
    },

    tbar : [
        {
            xtype : 'searchtextfield',
            name  : 'search',
            flex  : 1,
            listeners : {
                change : 'onSearchScheduler'
            }
        },
        {
            iconCls : 'reload',
            name    : 'reload',
            handler : 'onReloadSchedulers'
        },
        {
            reference: 'AddSchedulerButton',
            xtype  : 'button',
            iconCls: 'plus',
            tooltip: 'New scheduler',
            handler: 'onDisplaySchedulerCreate',
            hidden : !App.lib.User.hasRole(Constants.Role.ADMIN)
        }
    ],


    columns : [
        {
            name      : 'name',
            dataIndex : 'name',
            flex      : 1,
            renderer  : function(v, m){
                m.style = "font-weight:bolder;";
                return v;
            }
        },
        {
            name    : 'edit',
            xtype   : 'actioncolumn',
            iconCls : 'x-hidden',
            icon    : 'resources/img/pencil-16.png',
            sortable: false,
            resizable : false,
            width   : 30,
            menuDisabled : true,
            handler : function(g, ri, ci,i,e, r) {
                this.lookupController().onEditScheduler(r.data);
            },
            hidden  : !App.lib.User.hasRole(Constants.Role.ADMIN)
        },
        {
            name    : 'delete',
            xtype   : 'actioncolumn',
            icon    : 'resources/img/delete-16.png',
            iconCls : 'x-hidden',
            sortable: false,
            resizable : false,
            width   : 30,
            menuDisabled : true,
            handler : function(g, ri, ci,i,e, r) {
                this.lookupController().onDeleteScheduler(r.data.id);
            },
            hidden  : !App.lib.User.hasRole(Constants.Role.ADMIN)
        }
    ],

    listeners : {
        cellClick : function(g, td, ci, r, tr, ri, e, eo){
            if(ci!=0) { return; }
            this.lookupController().onDisplaySchedulerView(r.data);
        }
    }


});
