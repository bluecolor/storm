Ext.define('App.view.reports.livesession.LiveSessionReportController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.livesessionreport',

    onTaskInstanceFilter: function(status){
        this.getView().store.loadStore(status);
    },
    onReloadTaskInstances: function(){
        this.getView().store.load();
    },
    onCloseReports: function(){
        this.fireEvent('closereports');
    }
});