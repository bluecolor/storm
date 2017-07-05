Ext.define('App.view.settings.parameter.ParameterModel',{
    extend : 'Ext.app.ViewModel',
    alias  : 'viewmodel.parameter',

    requires : [
        'App.model.ObjectModel'
    ],

    stores : {
        schedulers: {
            source: 'SchedulerStore'
        },
        parameters: {
            source: 'ParameterStore'
        }
    }
});