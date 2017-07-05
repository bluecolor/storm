Ext.define('App.view.navigator.navsession.NavSessionController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.navsession',

  requires : [
    'App.view.navigator.navsession.NavSessionMenu'
  ],

  listen : {
    component: {
      'combo[name=sessions]' : {
        'navsessionselect': function (s) {
          this.onSessionSelect(s);
        }
      }
    },
    store : {
      '#TaskInstanceStore' : {
        'datachange' : function(d,s){
          this.onSessionStatsChange(d,s);
        }
      }
    },
    controller :{
      '*' : {
        'nosessionexists' : function(){
          this.getView().getLayout().setActiveItem(0);
        },
        'sessionexists': function(){
          this.getView().getLayout().setActiveItem(1);
        },
        'navsessionselect': function(sid,status,silent){
          var me  = this,
            c   = this.getView().down('combo[name=sessions]'),
            r   = c.store.getById(sid),
            filter = function(){
              var s = Ext.getStore(Constants.Store.TASK_INSTANCE);
              s.on('load',function(){
                  me.onTaskStatusFilter(status);
                  if(!silent){
                    me.fireEvent('sessiontasks');
                  }},this,{single:true}
              );
            };

          if(r){
            c.select(r);
            c.setStatusStyle(r.get('status'));
            filter();
            this.onSessionSelect(sid);
          }
        }
      }
    }
  },

  onNavItemClick : function(label){
    if(label== 'ALL'){
      label = undefined;
    }else if(label == 'TEMPLATE'){
      this.fireEvent('plantasks',undefined,false);
    }

    if(label != 'TEMPLATE'){
      this.fireEvent('sessiontasks',undefined,false);
      this.onTaskStatusFilter(label);
    }

  },

  onTaskStatusFilter : function(status) {
    var me = this,
      v = me.lookupReference('NavSessionDetail'),
      idx = v.store.findExact('val',Constants.ID.Session.getByStatus(status)),
      r = v.store.getAt(idx),
      id= r.get('id'),
      sel = v.store.getNodeById(id);
    v.getSelectionModel().select(sel, false, true);
    this.fireEvent('taskinstancestatusfilter',status);
  },

  onSessionSelect : function(s){
    this.fireEvent('sessionselect',s);
  },

  onSessionStatsChange : function(data,stats){

    var s = this.lookupReference('NavSessionDetail').store;
    var md= _.map(s.data.items,'data');
    var reset = function(r){
      var value = undefined, id = r.val;

      switch (id){
        case Constants.ID.Session.all     : value = stats.all(); break;
        case Constants.ID.Session.success : value = stats.SUCCESS; break;
        case Constants.ID.Session.error   : value = stats.ERROR; break;
        case Constants.ID.Session.blocked : value = stats.BLOCKED; break;
        case Constants.ID.Session.excluded: value = stats.EXCLUDED; break;
        case Constants.ID.Session.killed  : value = stats.KILLED; break;
        case Constants.ID.Session.running : value = stats.RUNNING; break;
        case Constants.ID.Session.ready   : value = stats.READY; break;
      }
      var idx = s.findExact('val',id);
      value = value==0?undefined:value;


      s.getAt(idx).set('count',value);
      s.commitChanges();


    };

    _.each(md,reset);
  },

  onSessionMenu : function(b,e){
    var me= this,
      m = Ext.create('App.view.navigator.navsession.NavSessionMenu');

    m.showAt(e.getXY());
    var sessionId = this.lookupReference('Sessions').getValue();
    if(!sessionId){
      m.setDisabled();
      return;
    }

    var session = Ext.getStore(Constants.Store.SESSION).getById(sessionId);
    if(!session){
      Message.growl.error('Unable to find session!');
      console.log('!!! Unable to find session ' + sessionId);
      m.setDisabled();
      return;
    }
    m.setState(session.get('status'));



    var onMenuItemClick = function(m, i){
      if(!i){return;}

      var o = {
        cb: {
          status: undefined,
          success: function(){
          }
        }
      };

      switch (i.name){
        case 'sessions' : me.fireEvent('showsessions'); break;
        case 'refresh'  : Ext.getStore(Constants.Store.SESSION).load(); break;
        case 'replay'   :
          o.cb.status= Constants.Status.READY;
          me.fireEvent('replaysession',sessionId,o);
          break;
        case 'pause'  :
          o.cb.status= Constants.Status.PAUSED;
          me.fireEvent('pausesession',sessionId,o);
          break;
        case 'play'   :
          o.cb.status= Constants.Status.READY;
          me.fireEvent('playsession', sessionId,o);
          break;
        case 'allSessions':
          me.fireEvent('allsessions');
          break;
      }
    };

    m.on('click',onMenuItemClick);
  }
});
