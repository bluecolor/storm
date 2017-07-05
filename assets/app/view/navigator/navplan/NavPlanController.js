Ext.define('App.view.navigator.navplan.NavPlanController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.navplan',

    requires : [
        'App.view.plan.PlanMenu'
    ],

    onSelectPlan : function(g, td, c, r, tr, rIdx, e, eOpts){
        if( !r.get('id') ) return;
        this.fireEvent('plantasks',r.get('id'));
    },

    onReloadPlans: function() {
        Ext.getStore(Constants.Store.PLAN).loadStore();
    },

    onSearchPlan : function(f,v) {
        var text = v.toUpperCase(),
            s= Ext.getStore(Constants.Store.PLAN);

        try {
            s.removeFilter('searchFilter');
        } catch (except) {
            console.log(except);
        }

        var filterFn = function(r){
            var reg = new RegExp( ".*{0}.*".format(text) );
            if( !text|| reg.test((r.get('name')).toUpperCase()) ) {
                return true;
            }
            return false;
        };

        s.addFilter({
            id       : 'searchFilter',
            filterFn : filterFn});
    },

    onNavPlanActionMenu : function(g,ri,e,r){
        this.fireEvent('displayplanmenu',e,r.data);
    }


});
