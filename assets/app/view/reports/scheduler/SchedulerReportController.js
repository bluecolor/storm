Ext.define('App.view.reports.scheduler.SchedulerReportController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.schedulerreport',


    onAddScheduler : function(){
        this.fireEvent('displayschedulercreate');
    },

    onSchedulerSelect: function(r){
        var scheduler = r.get('id');
        this.lookupReference('SchedulerSessions').loadStore(scheduler);
    },

    onSessionSelect: function(r){
        var stats = r.data.stats;

        var data =
            _.chain(stats)
                .keys()
                .filter(function(key){
                    return key != 'ALL';
                })
                .map(function(key){
                    return {
                        status : key,
                        count  : stats[key]
                    }
                }).value();

        this.getStore('sessionTaskStats').loadRawData(data);
    },

    onMute: function(){
        var mb = this.lookupReference('MuteButton');
        mb._value = !mb._value;
        mb.setIconCls( mb._value ? mb._soundCls.on: mb._soundCls.off );
    },

    onCloseReports: function(){
        this.fireEvent('closereports');
    }

});