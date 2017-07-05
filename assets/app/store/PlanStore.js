Ext.define('App.store.PlanStore',{
    extend  : 'App.store.BaseStore',

    alias   : 'store.PlanStore',
    storeId : 'PlanStore',
    model   : 'App.model.PlanModel',

    autoLoad: false,
    autoSync: false,

    sch     : undefined,

    messageDataProperty  : 'name',

    createSuccessMessage : 'Created plan',
    createErrorMessage   : 'Failed to create plan',

    updateSuccessMessage : 'Updated plan',
    updateErrorMessage   : 'Failed to update plan',

    deleteSuccessMessage : 'Deleted plan',
    deleteErrorMessage   : 'Failed to delete plan',

    proxy: {
        type: 'rest',
        reader  : {
            type  : 'json'
        },
        writer  : {
            type  : 'json'
        },
        actionMethods: {
            create  : 'POST',
            read    : 'GET',
            update  : 'PUT',
            destroy : 'DELETE'
        },

        api: {
            create  : 'plan',
            update  : 'plan/{0}',
            destroy : 'plan',
            allPlans: 'plan'
        }
    },



    constructor:function() {
        var me = this;
        me.callParent(arguments);
        this.proxy.api.read = 'plan/scheduler/{}'.format(Session.getSchedulerId());
    },

    loadStore: function(callback) {
        this.setScheduler();
        this.load(callback);
    },

    loadByScheduler: function(schedulerId){
        this.setScheduler(schedulerId);
        this.load();
    },

    setScheduler: function(schedulerId){
        schedulerId = schedulerId? schedulerId:Session.getSchedulerId();
        this.proxy.api.read = 'plan/scheduler/{}'.format(schedulerId);
    },

    sorters: [
        {
            property : 'name',
            direction: 'ASC'
    }],

    getIdByName : function(name){
        var plan = this.getAt(this.findExact('name', name));
        if(plan){
            return plan.get('id');
        }
    },

    setProtected: function(p,id){
        var me = this;
        _.each(id,function(i){
            var r = me.getById(i);
            if(r){
                r.set('protected',p);
                me.commitChanges();
            }
        });
    }

});
