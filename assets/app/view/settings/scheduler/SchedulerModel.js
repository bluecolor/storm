Ext.define('App.view.settings.scheduler.SchedulerModel',{
    extend : 'Ext.app.ViewModel',
    alias  : 'viewmodel.scheduler',

    stores : {
        schedulers: {
            source: 'SchedulerStore'
        },
        connections: {
            source: 'ConnectionStore'
        }
    }
});