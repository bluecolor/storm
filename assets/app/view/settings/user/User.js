Ext.define('App.view.settings.user.User', {
    extend: 'Ext.window.Window',
    xtype: 'user',

    requires  : [
        'App.view.settings.user.UsersModel',
        'App.view.settings.user.UserController',
        'App.view.settings.user.UserGrid',
        'App.view.settings.user.UserDetail',
        'App.view.settings.user.UserTasks'
    ],

    controller  : 'user',
    viewModel   : 'user',

    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 975,
    height      : 575,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'card',
    title       : 'User',

    items : [
        {
            xtype   : 'usergrid',
            margins : '0 0 0 0',
            header  : false
        },
        {
            xtype   : 'userdetail',
            name    : 'userDetail'
        },
        {
            xtype   : 'usertasks',
            name    : 'userTasks'
        }
    ],


    create : function(){
        this.getLayout().setActiveItem(1);
        this.down('userdetail').create();
        return this.show();
    },

    users : function(){
        this.getLayout().setActiveItem(0);
    },

    view : function(u){
        this.getLayout().setActiveItem(1);
        this.down('userdetail').setValues(u).setReadOnly(true);
        return this.show();
    },
    edit : function(u){
        this.getLayout().setActiveItem(1);
        this.down('userdetail').setValues(u).setReadOnly(false);
    },

    viewUserTasks : function(u){
        this.getLayout().setActiveItem(2);
        this.getViewModel().getStore('userTasks').loadStore(u);
    }




});
