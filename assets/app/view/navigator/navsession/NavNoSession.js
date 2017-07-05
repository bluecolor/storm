Ext.define('App.view.navigator.navsession.NavNoSession',{
  extend: 'Ext.container.Container',
  xtype : 'navnosession',

  layout: {
      type    : 'vbox',
      pack    : 'center',
      align   : 'center'
  },

  items: [
    {
      xtype   : 'displayfield',
      padding : '0 0 50 0',
      value   : 'No sessions exist yet!',
      fieldCls: 'nav-no-session'
    }
  ]

});
