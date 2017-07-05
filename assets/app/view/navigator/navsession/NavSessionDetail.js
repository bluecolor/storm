Ext.define('App.view.navigator.navsession.NavSessionDetail',{
  extend  : 'Ext.tree.Panel',
  xtype   : 'navsessiondetail',
  requires: [
    'Ext.tree.*',
    'App.view.widget.SessionCombo'
  ],

  reference : 'NavSessionDetail',
  rootVisible : false,
  header    : false,
  bodyPadding : 10,
  border    : false,
  hideHeaders : true,
  columnLines : false,
  rowLines  : false,
  layout    : 'fit',
  autoHeight  : true,

  bind : {
    store : '{list}'
  },
  selModel: {
    ignoreRightMouseSelection: true
  },

  overflowY: 'auto',

  tbar: {
    padding : '6px 5px 10px 5px',
    margin  : '0',
      items   : [
        {
          xtype     : 'sessioncombo',
          name    : 'sessions',
          reference   : 'Sessions',
          flex    : 1,
          bind: {
            store: '{sessions}'
          }
      },'-',
      {
        name  : 'sessionMenu',
        margin  : '0',
        icon  : 'resources/img/gear-16.png',
        handler : 'onSessionMenu'
      }
    ]
  },


  columns : [
    {
      text   : 'Icon',
      name   : 'icon',
      width  : 36,
      renderer : function(v, m, r){
        return '<img src="{0}">'.format( r.get('img') );

      }
    },
    {
      text    : 'Name',
      name    : 'name',
      dataIndex : 'name',
      renderer  : function(v, m){
        m.style = "font-weight:bolder;";
        return v;
      }
    },
    {
      text : 'Count',
      name : 'count',
      flex : 1,
      dataIndex: 'count',
      renderer : function(v, m,r){
        var color=undefined,id = r.get('val');

        switch (id){
          case Constants.ID.Session.all :
            color = Constants.Color.getColor();
            break;
          case Constants.ID.Session.success  :
            color = Constants.Color.getColor(Constants.Status.SUCCESS);
            break;
          case Constants.ID.Session.error:
            color = Constants.Color.getColor(Constants.Status.ERROR);
            break;
        }
        m.style = "font-weight:bolder;color:{0};".format(color);
        return  v ? '({})'.format(v) : undefined;
      }
    }
  ],

  listeners : {
    itemclick : function(v,r) {
      var label = r.get('label');
      this.lookupController().onNavItemClick(label);
    }
  }



});
