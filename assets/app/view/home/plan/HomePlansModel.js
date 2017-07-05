Ext.define('App.view.home.plan.HomePlansModel',{
    extend  : 'Ext.app.ViewModel',
    alias   : 'viewmodel.homeplans',


    stores : {
        plans: {
            source: 'PlanStore'
        }
    }

});