Ext.define('App.view.navigator.navgroup.NavGroupController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.navgroup',

    requires : [
    ],

    listen: {
        component: {
            '#': {
                'displaygroup': function(r){
                    this.onDisplayGroupView(r.data)
                }
            }
        }
    },

    onDeleteGroup : function(g){
        this.fireEvent('deletegroup',g);
    },

    onDisplayGroupCreate : function(){
        this.fireEvent('displaygroupcreate');
    },


    onReloadGroups : function() {
        Ext.getStore(Constants.Store.GROUP).load();
    },

    onDisplayGroupEdit : function(g){
        this.fireEvent('displaygroupedit', g);
    },

    onDisplayGroupView : function(g){
        this.fireEvent('displaygroupview', g);
    },

    onNavGroupActionMenu : function(g,ri,e,r){
        this.fireEvent('displaygroupmenu',e,r.data);
    }


});
