Ext.define('App.view.home.group.HomeGroupsController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.homegroups',

    onGroupActionMenu: function(grid,rowIndex,e,r){
        grid.getSelectionModel().select(r);
        this.fireEvent('displaygroupmenu',e,r.data);
    },

    onCreateGroup: function(){
        this.fireEvent('displaygroupcreate');
    },

    onReloadGroups: function(){
        Ext.getStore(Constants.Store.GROUP).load();
    },

    onSearchGroup: function(text){
        text = text ? text.toUpperCase():text;
        var s = this.lookupReference('HomeGroups').store;
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
    }

});