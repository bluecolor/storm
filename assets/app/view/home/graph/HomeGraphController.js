Ext.define('App.view.home.graph.HomeGraphController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.homegraph',

    listen: {
        controller: {
            '*': {
                'navsessionselect': function(sessionId,c){
                    this.onSessionSelect(sessionId,c);
                }
            }
        }
    },


    onSessionSelect: function(sessionId,c){
        var silent = true;
        if(c != this){
            var combo  = this.lookupReference('Sessions'),
                record =
                    Ext.getStore(Constants.Store.SESSION).getById(sessionId);

            if(record){
                var status = record.get('status');
                combo.setValue(sessionId);
                combo.setStatusStyle(status);
            }
        }else{ silent = false;}

        this.getView().getViewModel().getStore('sessionTasks').loadStore(sessionId,silent);
    },

    onPreviewTaskInstanceGraph: function () {
        var chart = this.lookupReference('HomeTaskInstanceChart');
        chart.preview();
    },

    onPreviewPlanTaskGraph: function(){
        var chart = this.lookupReference('HomePlanTaskChart');
        chart.preview();
    },

    onBarTipRender: function (tooltip, record, item) {
        var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
            status = item.series.getTitle()[fieldIndex];

        tooltip.setHtml(status.toUpperCase() + ' tasks in ' +
            record.get('plan') + ': ' +
            record.get(item.field));
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('status') + ': ' + record.get('count') );
    },

    loadPlanStatsStore: function(){
        var store = this.getView().getViewModel().getStore('planStats');

        var error = function(){
            Message.growl.error("Unable to compute stats");
        };
        var success= function(stats){
            store.loadStore(stats);
        };
        var promise = AsyncScheduler.planTaskStatusStats();
        promise.success(success).fail(error);
    }

});