Ext.define('App.view.home.plan.HomePlansController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.homeplans',

    requires: [
    ],

    onPlanActionMenu: function(grid,rowIndex,e,r){
        grid.getSelectionModel().select(r);
        this.fireEvent('displayplanmenu',e,r.data);
    },

    onCreatePlan: function(){
        this.fireEvent('displayplancreate');
    },

    onSearchPlan: function(text){
        text = text ? text.toUpperCase():text;
        var s = this.lookupReference('HomePlans').store;
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

    onReloadPlans: function(){
        Ext.getStore(Constants.Store.PLAN).loadStore();
    }


});