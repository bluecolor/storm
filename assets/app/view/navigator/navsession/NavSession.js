Ext.define('App.view.navigator.navsession.NavSession',{
    extend  : 'Ext.panel.Panel',
    xtype   : 'navsession',

    requires: [
      'App.view.navigator.navsession.NavSessionModel',
      'App.view.navigator.navsession.NavSessionController',
      'App.view.navigator.navsession.NavSessionDetail',
      'App.view.navigator.navsession.NavNoSession'
    ],

    controller: 'navsession',
    viewModel : 'navsession',
    iconCls   : 'glasses',
    layout    : 'card',

    items : [
      {
        xtype: 'navnosession'
      },
      {
        xtype: 'navsessiondetail'
      }
    ]

});
