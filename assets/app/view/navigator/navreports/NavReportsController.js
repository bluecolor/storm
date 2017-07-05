Ext.define('App.view.navigator.navreports.NavReportsController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.navreports',

    onNavReportSelection : function(id){

        this.fireEvent('displayReports');

        switch (id){
            case Constants.ID.Reports.systemLogs: this.onSystemLogsReport(); break;
            case Constants.ID.Reports.schedulers: this.onSchedulerReport(); break;
            case Constants.ID.Reports.liveSessions: this.onDisplayLiveSessionsReport(); break;
            case Constants.ID.Reports.owners: this.onDisplayOwnersReport(); break;
        }
    },

    onDisplayOwnersReport: function(){
        this.fireEvent('displayownersreport');
    },

    onSystemLogsReport: function(){
        this.fireEvent('displaysystemlogsreport');
    },

    onSchedulerReport: function(){
        this.fireEvent('displayschedulerreport');
    },

    onDisplayLiveSessionsReport: function(){
        this.fireEvent('displaylivesessionsreport');
    }

});