Ext.define('App.view.home.schedulerdetail.EmptyScheduler',{
  extend  : 'Ext.container.Container',
  xtype   : 'emptyscheduler',


  layout: {
    align   : 'top',
    pack  : 'start',
    type  : 'vbox'
  },

  items: [
    {
      layout: {
        align   : 'center',
        pack  : 'start',
        type  : 'hbox',
        padding : '0 0 0 20'
      },
      items: [
        {
          xtype: 'button',
          scale: 'medium',
          cls  : 'slick-btn',
          text : 'Create Plan',
          handler: 'onCreatePlan'
        },
        {
          xtype   : 'displayfield',
          padding : '0 0 0 20',
          value   : 'Start by Creating a Plan',
          fieldCls: 'welcome-text'
        }
      ]
    }
  ]

});
