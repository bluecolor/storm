Ext.define('App.lib.SchedulerManager',{
    singleton: true,
    alternateClassName : ['SchedulerManager'],

    setScheduler: function(schedulerId){
        var me  = this,
            sch = me.getScheduler();

        if(!schedulerId && sch){
            schedulerId = sch.id;
        }

        if(schedulerId){
            App.getApplication()
                .getController('AppController')
                .fireEvent('onescheduler', schedulerId);

            Message.ext.progress('Loading...',Constants.Icon.MULTI_GEAR);
            me.loadStores(schedulerId);
        }
    },

    loadStores: function(schedulerId){

        var me = this;

        /* set scheduler */
        var schStore = Ext.getStore(Constants.Store.SCHEDULER);
        var sch = schStore.getById(schedulerId).data;
        App.lib.Session.setScheduler(sch);

        /* get default or a random plan */
        var planCallback,planId,
            plan = User.getDefaultPlan(sch.id);

        if(!plan){
            planCallback = function(){
                plan = Ext.getStore(Constants.Store.PLAN).getAt(0);
                if(plan){
                    planId = plan.get('id');
                    Ext.getStore(Constants.Store.TASK).setPlan(planId);
                    Ext.getStore(Constants.Store.TASK).removeAll();
                    Ext.getStore(Constants.Store.TASK_INSTANCE).removeAll();
                }
                me.onStoresLoaded();
            };
        }else {
            var promise = AsyncSession.findLastSessionOfPlan(plan);

            promise.success(function(s){
                var session = s[0],
                    ss = Ext.getStore(Constants.Store.SESSION);
                if(session){
                    ss.on('load', function(){
                        var sid = session.id;
                        App.getApplication()
                            .getController('AppController')
                            .fireEvent('navsessionselect',sid,null,true);
                    },this,{single:true});
                }
            }).always(function(){me.onStoresLoaded();});
            /* set plan of task store */
            var taskStore = Ext.getStore(Constants.Store.TASK);
            taskStore.removeAll();
            taskStore.setPlan(planId);
        }
        
        Ext.getStore(Constants.Store.SESSION).loadStore();
        Ext.getStore(Constants.Store.PLAN).loadStore(planCallback);
        Ext.getStore(Constants.Store.GROUP).loadStore(App.lib.Session.getSchedulerId());
    },

    onStoresLoaded: function(){
        Ext.MessageBox.hide();
    },

    getScheduler : function(){
        var sch,
            s = Ext.getStore(Constants.Store.SCHEDULER),
            url = document.location.href;

        if(url.indexOf('#') == -1){

            sch = App.lib.User.getDefaultScheduler();

            if(sch) {
                var scheduler = s.getById(sch);
                if(scheduler){
                    return scheduler.data;
                }
            }
            sch = s.getAt(0);
            if(sch) {
                return sch.data;
            }
        }

        sch = url.slice(url.indexOf('#')+1);
        if(sch) {
            return s.findExactBy('name',sch);
        }
    }


});