Ext.define('App.view.plan.PlanController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.plan',



    onSideMenuToggle : function(b, s){
        this.lookupReference('PlanList').setVisible(s);
    },

    onSavePlan : function(){
        var me= this,
            v = me.getView(),
            p = v.getValues();

        var o = {
            cb: {
                success : function(){v.close();}
            }
        };

        if(p.id){
            me.fireEvent('updateplan',p,o);
        }else {
            me.fireEvent('createplan',p,o);
        }
    },

    onReloadPlans : function() {
        Ext.getStore(Constants.Store.PLAN).load();
    },

    onSelectPlan : function(g, td, c, r){
        this.getView().setValues(r.data).setReadOnly();
    },

    /**
     * todo extjs BUG in chained store filter
     */
    onSearchPlan : function(f,v) {
        var text = v.toUpperCase(),
            store= this.lookupReference('PlanList').store;

        try {
            store.removeFilter('searchFilter');
        } catch (except) {
            console.log(except);
        }

        store.addFilter({
            id       : 'searchFilter',
            filterFn : function(rec) {
                var reg = new RegExp( ".*{0}.*".format(text) );
                if( !text|| reg.test((rec.get('name')).toUpperCase()) ) {
                    return true;
                }
                return false;
            }});
    },

    onEditPlan : function(g, ri, ci, i ,e, r){
        this.fireEvent('displayplanedit',r.data);
    },
    onDeletePlan : function(g, ri, ci, i ,e, r){
        this.fireEvent('deleteplan',r.data.id);
    },

    onCreatePlan : function(){
        this.getView().clear();
    },
    onClear : function(){
        this.getView().clear();
    }



});
