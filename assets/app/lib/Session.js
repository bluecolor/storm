Ext.define('App.lib.Session', {
    singleton: true,
    alternateClassName : ['Session'],

    FIRST_LOAD  : true,

    scheduler   : {
        id      : undefined,
        name    : '',
        status  : 'READY',
        plan    : {
            defaultFinal : {
                plan            : undefined,
                planInstanceId  : undefined,
                ettDate         : undefined
            },
            current : {
                plan            : undefined,
                planInstanceId  : undefined,
                ettDate         : undefined
            }
        }
    },

    /* ------------------------- methods ---------------------------- */

    setScheduler : function(sch){
        var n = Ext.ComponentQuery.query('navigator[name=navigator]')[0];
        if(n){
            n.setTitle(sch.name);
        }
        this.scheduler.name = sch.name;
        this.scheduler.id = sch.id;
    },

    getScheduler : function(){
        return this.scheduler;
    },

    setSchedulerName : function(name) {
        this.scheduler.name = name;
    },

    setSchedulerStatus : function(status) {
        this.scheduler.status = status;
    },

    getSchedulerName:function() {
        return this.scheduler.name;
    },

    getSchedulerId : function(){
        return this.scheduler.id;
    },

    getSchedulerStatus:function() {
        return this.scheduler.status;
    },

    /* - scheduler plan final -------------------------------- */

    setDefaultPlanName : function(p) {
        this.scheduler.plan.defaultFinal.plan = p;
    },

    setDefaultPlanFinalInstanceId : function(i) {
        this.scheduler.plan.defaultFinal.planInstanceId= i;
    },

    setDefaultPlanFinalEttDate : function(d) {
        this.scheduler.plan.defaultFinal.ettDate = d;
    },

    getDefaultPlanName : function() {
        return this.scheduler.plan.defaultFinal.plan;
    },

    getDefaultPlanFinalInstanceId : function() {
        return this.scheduler.plan.defaultFinal.planInstanceId;
    },

    getDefaultPlanFinalEttDate : function() {
        return this.scheduler.plan.defaultFinal.ettDate;
    },

    /* - scheduler plan current -------------------------------- */

    setCurrentPlanName : function(p) {
        this.scheduler.plan.current.plan = p;
    },

    setCurrentPlanInstanceId : function(i) {
        this.scheduler.plan.current.planInstanceId= i;
    },

    setCurrentPlanEttDate : function(d) {
        this.scheduler.plan.current.ettDate = d;
    },

    getCurrentPlanName : function() {
        return this.scheduler.plan.current.plan;
    },

    getCurrentPlanInstanceId : function() {
        return this.scheduler.plan.current.planInstanceId;
    },

    getCurrentPlanEttDate : function() {
        return this.scheduler.plan.current.ettDate;
    },

    /* - SCHEDULER --------------------------- */

    configure : function() {
        var sch = this.getSchedulerName();
        var status=this.getSchedulerStatus();
        Ext.getDoc().dom.title = sch;
    }

});
