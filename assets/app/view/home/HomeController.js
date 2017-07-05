Ext.define('App.view.home.HomeController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.home',

    listen : {
        controller :{
            '*' : {
                'schedulercardclick': function(c){
                    this.onSchedulerCardClick(c);
                },
                'onescheduler': function(schId){
                    this.onOneScheduler(schId);
                },
                'zeroscheduler': function(){
                    this.onZeroScheduler();
                }
            }
        }
    },

    onOneScheduler: function(schId){
        this.getView().getLayout().setActiveItem(1);
    },

    onZeroScheduler: function(){
        this.getView().getLayout().setActiveItem(0);
    },

    onSchedulerCardClick: function(c){
    },

    onCreateScheduler: function(){
        this.fireEvent('displayschedulercreate');
    }

});