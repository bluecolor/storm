Ext.define('App.view.home.Home',{
  extend : 'Ext.panel.Panel',
  xtype  : 'home',

  requires: [
    'App.view.home.scheduler.SchedulerCards',
    'App.view.home.schedulerdetail.HomeSchedulerDetail',
    'App.view.home.HomeController'
  ],


  controller: 'home',

  layout  : {
    type:'card',
    deferredRender:true
  },


  bodyPadding: 20,

  defaults: {
    frame: true,
    bodyPadding: 10
  },
  activeItem: 2,

  items: [
    {
      name: 'welcome',
      layout: {
        align   : 'top',
        pack  : 'center',
        type  : 'hbox'
      },
      items: [
        {
          padding: '100,0',
          layout: {
            type  : 'vbox',
            pack  : 'center',
            align   : 'center'
          },
          items: [
            {
              xtype   : 'container',
              name    : 'tornado',
              padding : '0 0 20 0',
              items   : [
                {
                  width   : 100,
                  height  : 100,
                  xtype   : 'image',
                  src   : 'resources/img/tornado-100.png'
                }
              ]
            },
            {
              xtype   : 'container',
              style   : {
                paddingTop: 50
              },
              items   : [
                {
                  xtype   : 'displayfield',
                  padding : '0 0 50 0',
                  value   : 'Welcome to <span style="color: #F08F90">Storm</span> Scheduler',
                  fieldCls: 'welcome-text'
                }
              ]
            },
            {
              xtype: 'container',
              items: [
                {
                  xtype: 'button',
                  scale: 'large',
                  cls  : 'slick-btn',
                  text : 'Create Scheduler',
                  handler: 'onCreateScheduler'
                }
              ]
            }
          ]
        }

      ]

    },
    {
      layout: {
        type  : 'hbox',
        pack  : 'start',
        align   : 'stretch'
      },
      items: [
        {
          xtype : 'schedulercards',
          flex  : 1
        },
        {
          flex  : 2,
          layout: 'fit',
          xtype : 'homeschedulerdetail'
        }
      ]
    },
    {
      name: 'dummy'
    }
  ],

  listeners: {
    afterrender: function(me){
      var c = Ext.getStore(Constants.Store.SCHEDULER).getCount();
      if(c > 1){
        me.getLayout().setActiveItem(1);
      }
    }
  }



});
