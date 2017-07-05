Ext.define('App.view.group.GroupController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.group',

    requires : [
    ],


    onSearchGroup: function(text){
        text = text ? text.toUpperCase():text;
        var s = this.getView().getViewModel().getStore('groups');

        s.removeFilter('searchFilter');
        s.addFilter({
            id       : 'searchFilter',
            filterFn : function(rec) {
                var reg = new RegExp( ".*{0}.*".format(text) );
                if(    !text
                    || reg.test((rec.get('name')).toUpperCase())) {
                    return true;
                }
                return false;
            }});
    },

    onSideMenuToggle : function(b, s){
        this.lookupReference('GroupList').setVisible(s);
    },

    onSaveGroup : function(){
        var me = this,
            g  = me.getView().getValues();

        var o = {cb:{success:function(){me.getView().close()}}};

        if(g.id){
            this.fireEvent('updategroup',g,o);
        }else {
            this.fireEvent('creategroup',g,o);
        }
    },

    onDisplayGroupEdit : function(g){
        this.fireEvent('displaygroupedit',g);
    },

    onDisplayGroupView : function(g){
        this.fireEvent('displaygroupview',g);
    },

    onDeleteGroup : function(g, ri, ci, i ,e, r){
        this.fireEvent('deletegroup',r.data.id);
    },

    onReloadGroups: function(){
        Ext.getStore(Constants.Store.GROUP).load();
    },

    onCreateGroup : function(){
        this.fireEvent('creategroup');
    },

    onTaskMenu: function(grid,rowIndex,e,r){
        var me      = this,
            view    = grid,
            o = {
                view    : view,
                event   : e,
                record  : r
            };

        this.fireEvent('displaytaskmenu',o);
    },

    onAddTaskToGroup: function(c, r){
        var s = this.lookupReference('GroupTasks').store;
        if(s.findExact('id',r.get('id')) === -1) {
            s.insert(0,r);
        }
        c.reset();
    },

    onRemoveTaskFromGroup : function(g, ri, ci, i ,e, r){
        var s = this.lookupReference('GroupTasks').store;
        s.removeAt(s.findExact('id',r.get('id')));
    }


});
