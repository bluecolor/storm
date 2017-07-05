Ext.define('App.controller.UserController', {
    extend: 'Ext.app.Controller',

    views : [
        'App.view.settings.user.User',
        'App.view.settings.password.AppPassword'
    ],

    refs  : [
        {
            ref         : 'user',
            xtype       : 'user',
            selector    : 'user',
            autoCreate  : true
        },
        {
            ref         : 'AppPassword',
            xtype       : 'apppassword',
            autoCreate  : true,
            selector    : 'apppassword'
        }
    ],

    init: function() {
        this.listen({
            controller: {
                '*': {
                    'displayuserview'   : this.onDisplayUserView,
                    'displayuseredit'   : this.onDisplayUserEdit,
                    'displayusercreate' : this.onDisplayUserCreate,
                    'deleteuser'        : this.onDeleteUser,
                    'updateuser'        : this.onUpdateUser,
                    'createuser'        : this.onCreateUser,
                    'changepassword'    : this.onDisplayPassword,
                    'savepassword'      : this.onSavePassword,
                    'displayusertasks'  : this.onDisplayUserTasks
                }
            }
        });
    },

    onDisplayUserTasks: function(e, userId, status){

        var me = this,
            pos= e.getXY();

        var success = function (tasks) {

            if(tasks.length == 0){
                try{
                    var name = Ext.getStore(Constants.Store.USER).getById(userId).get('name');
                    Message.growl.warn('{} does not have any {} task'.format(name,status));
                }catch (e){
                    console.log(e);
                }
                return;
            }

            var items = _.map(tasks, function(task){

                var iconCls = undefined;
                if(!status){
                    if(!task.active){
                        iconCls = Constants.Icon.getIconClsByStatus(Constants.Status.INACTIVE);
                    }else if(task.excluded){
                        iconCls = Constants.Icon.getIconClsByStatus(Constants.Status.EXCLUDED);
                    }else if(task.active){
                        iconCls = Constants.Icon.getIconClsByStatus(Constants.Status.ACTIVE);
                    }
                }else{
                    iconCls = Constants.Icon.getIconClsByStatus(status);
                }
                return {
                    text    : task.name,
                    name    : task.id,
                    iconCls : iconCls
                };
            });

            var m = Ext.create('Ext.menu.Menu',{items:items});
            m.showAt(pos);
            m.on('click',function(m,i){
                me.fireEvent('displaytask',i.name);
            });

        };
        var error   = function(){
            Message.growl.error('Failed to get tasks!')
        };
        var always  = function(){
            Ext.MessageBox.hide();
        };

        var promise = AsyncUser.findTasksByStatus(userId, status);
        promise.success(success).fail(error).always(always);
    },

    onDisplayUserView : function(){
        this.getUser().show();
    },

    onDisplayUserEdit : function(user){
        this.getUser().edit(user);
    },

    onDisplayUserCreate : function(){
        this.getUser().create();
    },

    onCreateUser: function(u,o){
        AsyncUser.create(u,o);
    },

    onUpdateUser: function(u,o){
        var cb = function(b){
            if(b=='ok'){
                AsyncUser.update(u,o);
            }
        };
        Message.ext.ask(cb);
    },

    onDeleteUser: function(u,o){
        var cb = function(b){
            if(b=='ok'){
                AsyncUser.destroy(u,o);
            }
        };
        Message.ext.ask(cb);
    },

    onDisplayPassword: function(){
        this.getAppPassword().show();
    },

    onSavePassword: function(p){
        AsyncUser.savePassword(p);
    }




});