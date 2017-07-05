Ext.define('App.view.settings.user.UserController', {
    extend: 'Ext.app.ViewController',
    alias : 'controller.user',

    onSearchTask : function(text){

        text = text ? text.toUpperCase():text;

        var s = this.getView().getViewModel().getStore('userTasks');
        s.removeFilter('searchFilter');
        s.addFilter({
            id       : 'searchFilter',
            filterFn : function(rec) {
                var reg = new RegExp( ".*{0}.*".format(text) );
                if(    !text
                    || reg.test((rec.get('name')).toUpperCase())
                    || reg.test((rec.get('command')).toUpperCase()) ) {
                    return true;
                }

                return false;
            }});
    },

    onClear : function(){
        this.lookupReference('UserDetail').clear();
    },

    onReloadUsers : function() {
        Ext.getStore(Constants.Store.USER).load();
    },

    onSearchUsers : function(f,v) {
        var text = v.toUpperCase(),
            store= Ext.getStore(Constants.Store.USER);

        try {
            store.removeFilter('searchFilter');
        } catch (except) {
            console.log(except);
        }

        store.addFilter({
            id       : 'searchFilter',
            filterFn : function(rec) {
                var reg = new RegExp( ".*{0}.*".format(text) );
                if(    !text
                    || reg.test((rec.get('name')).toUpperCase())
                    || reg.test((rec.get('username')).toUpperCase())) {
                    return true;
                }
                return false;
            }});
    },

    onCreateUser : function() {
        this.getView().create();
    },

    onSaveUser : function(user) {
        var me = this,
            user = this.lookupReference('UserDetail').getValues();

        if(user.username.toLowerCase()=="su"){
            Message.growl.error('"su" is a special user. Choose a different one.');
            return;
        }

        var store = Ext.getStore(Constants.Store.USER);

        var o = {
            cb:{
                success: function(){
                    me.getView().users();
                }
            }
        };


        if(store.getById(user.id)) {
            this.fireEvent('updateuser',user,o);
        }else {
            this.fireEvent('createuser',user,o);
        }
    },

    onEditUser : function(u)  {
        this.getView().edit(u);
    },

    onDeleteUser : function(u){
        this.fireEvent('deleteuser',u);
    },

    onViewUser : function(u){
        this.getView().view(u);
    },

    onViewUserTasks : function(u){
        this.getView().viewUserTasks(u);
    },

    onActivateUserGrid : function(){
        this.getView().users();
    },

    onSetRoleVisible: function(v){
        this.lookupReference('Role').setVisible(v);
    }

});
