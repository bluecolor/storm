Ext.define('App.view.reports.ReportsController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.reports',

    listen : {
        controller :{
            '*' : {
                'displaysystemlogsreport' : function(){
                    this.onDisplaySystemLogsReport();
                },
                'displayschedulerreport': function(){
                    this.onDisplaySchedulerReport();
                },
                'displaylivesessionsreport': function(){
                    this.onDisplayLiveSessionsReport();
                },
                'displayownersreport': function(){
                    this.onDisplayOwnersReport();
                }
            }
        }
    },

    onDisplaySystemLogsReport: function(){
        this.getView().getLayout().setActiveItem(0);
        var t = this.lookupReference('Title');
        t.setValue(t._value.format('System Logs'));
    },
    onDisplaySchedulerReport: function(){
        this.getView().getLayout().setActiveItem(1);
        var t = this.lookupReference('Title');
        t.setValue(t._value.format('Schedulers'));
    },
    onDisplayLiveSessionsReport: function(){
        this.getView().getLayout().setActiveItem(2);
        var t = this.lookupReference('Title');
        t.setValue(t._value.format('Live Sessions'));
    },
    onDisplayOwnersReport: function(){
        this.getView().getLayout().setActiveItem(3);
        var t = this.lookupReference('Title');
        t.setValue(t._value.format('Owners'));
    },

    onCloseReports: function(){
        this.fireEvent('closereports');
    },

    onSideMenuToggle: function(b,s){
        this.fireEvent('sidemenutoggle');
    },

    onMute: function(){
        var mb = this.lookupReference('MuteButton');
        mb._value = !mb._value;
        mb.setIconCls( mb._value ? mb._soundCls.on: mb._soundCls.off );
    }
});