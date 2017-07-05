Ext.define('App.view.home.schedulerdetail.HomeSchedulerDetailController',{
  extend: 'Ext.app.ViewController',
  alias : 'controller.homeschedulerdetail',

  listen : {
    controller :{
      '*' : {
        'schedulercardclick': function(c){
          this.onSchedulerCardClick(c);
        }
      }
    },
    store: {
      '#PlanStore': {
        datachanged: function(s){
          var v = this.lookupReference('DetailContainer');
          if(s.getCount() == 0){
            v.getLayout().setActiveItem(0);
          }else{
            v.getLayout().setActiveItem(1);
          }
        }
      }
    }
  },

  onSchedulerCardClick: function(c){
    this.getView().setVisible(true);
  },

  onCreatePlan: function(){
    this.fireEvent('displayplancreate', App.lib.Session.getSchedulerId());
  }

});
