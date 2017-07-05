Ext.define('App.lib.ajax.Task',{

  singleton: true,
  alternateClassName: ['AsyncTask'],

  _deselect   : function(){
    try{
      var c = Ext.ComponentQuery.query('taskgrid');
      _.each(c,function(g){
        g.getSelectionModel().deselectAll();
      });

    }catch(e){
      console.log(e);
    }
  },

  find : function(id){
    return $.ajax({
      type    : 'GET',
      url     : 'task/{}'.format(id),
      contentType : 'application/json',
      dataType  : 'json'});
  },

  create : function(t, o){
    var me = this;

    var always = function(){
      try {
        Ext.MessageBox.hide();
      }catch(except) {
        console.log(except.message);
      }
    };
    var error = function(r, o){
      var errm = r.responseJSON.originalError.errmsg;
      Message.growl.error('Failed to create task {}'.format(errm));
      Ext.getStore(Constants.Store.TASK).rejectChanges();
    };

    var success = function(r){

      var store = Ext.getStore(Constants.Store.TASK),
        planId= store.getPlan();

      _.each(r, function(task){
        if(task.plan.id == planId){
          store.loadRawData(r,true);
        }
      });

      Message.growl.success('Created task');
      try {
        if(o && o.cb && o.cb.success){
          o.cb.success();
        }
      }catch(e){
        console.log(e)
      }
    };

    return $.ajax({
      type    : 'POST',
      url     : 'task',
      contentType : 'application/json',
      dataType  : 'json',
      data    : JSON.stringify(t),
      success   : success,
      error     : error}).always(always);
  },

  update    : function(t, o){
    var me = this;

    var always = function(){
      try {
        Ext.MessageBox.hide();
      }catch(except) {
        console.log(except.message);
      }
    };
    var error = function(r){
      Message.growl.error('Failed to update task. {}'.format(r.responseText));
      Ext.getStore(Constants.Store.TASK).rejectChanges();
    };

    var success = function(r){
      var s = Ext.getStore(Constants.Store.TASK);
      s.loadRawData(r,true);
      s.update(_.map(r,'predecessors'));
      Message.growl.success('Updated task');
      try {
        if(o && o.cb && o.cb.success){
          o.cb.success();
        }
      }catch(e){
        console.log(e)
      }
      me._deselect();
    };

    return $.ajax({
      type    : 'PUT',
      url     : 'task/'+t.id,
      contentType : 'application/json',
      dataType  : 'json',
      data    : JSON.stringify(t),
      success   : success,
      error     : error
    }).always(always);
  },

  setActive   : function(active,id, o){
    var me = this;
    Message.ext.showWait();

    var url = undefined,data = {id:id};
    var text= active?'activate':'deactivate';

    if(_.isArray(id)){
      url = 'task/{}'.format(text);
    }else if(_.isString(id)){
      url = 'task/{0}/{1}'.format(text,id);
    }else {
      Message.growl.error('Unexpected Error');
      console.log('String id expected for task instance');
      console.log('Encountered ' + id);
      Ext.MessageBox.hide();
      return;
    }

    var success = function(tasks){
      var s = Ext.getStore(Constants.Store.TASK);
      _.each(tasks,function(task){
        var r = s.getById(task.id);
        if(r){
          r.set('active',active);
          s.commitChanges();
        }
      });
      try {
        if(o && o.cb && o.cb.success){
          o.cb.success();
        }
      }catch(e){console.log(e);}

      Message.growl.success('Saved changes.');
      me._deselect();
    };
    var error   = function(x,o,e){
      Message.growl.error(x.responseText);
      console.log(x);
    };
    var always  = function(){
      try {
        Ext.MessageBox.hide();
      }catch(except) {
        console.log(except.message);
      }
    };
    return $.ajax({
      type : 'PUT',
      url  : url,
      data : JSON.stringify(data),
      dataType  : 'json',
      contentType : 'application/json',
      success : success,
      error   : error
    }).always(always);
  },
  activate  : function(id, o){this.setActive(true, id,o);},
  deactivate  : function(id, o){this.setActive(false,id,o);},
  setExcluded : function(excluded,id, o){
    var me = this;
    Message.ext.showWait();

    var url = undefined,data = {id:id};
    var text= excluded?'exclude':'include';

    if(_.isArray(id)){
      url = 'task/{}'.format(text);
    }else if(_.isString(id)){
      url = 'task/{0}/{1}'.format(text,id);
    }else {
      Message.growl.error('Unexpected Error');
      console.log('String id expected for task instance');
      console.log('Encountered ' + id);
      Ext.MessageBox.hide();
      return;
    }

    var success = function(tasks){
      var s = Ext.getStore(Constants.Store.TASK);
      _.each(tasks,function(task){
        var r = s.getById(task.id);
        if(r){
          r.set('excluded',excluded);
          s.commitChanges();
        }
      });

      if(o && o.cb && o.cb.success){
        o.cb.success();
      }

      Message.growl.success('Saved changes.');
      me._deselect();
    };
    var error   = function(x,st,e){
      Message.growl.error(x.responseText);
      console.log(x);
    };
    var always  = function(){
      try {
        Ext.MessageBox.hide();
      }catch(except) {
        console.log(except.message);
      }
    };

    $.ajax({
      type : 'PUT',
      url  : url,
      data : JSON.stringify(data),
      dataType  : 'json',
      contentType : 'application/json',
      success : success,
      error   : error
    }).always(always);
  },
  exclude : function(id, o){this.setExcluded(true,id,o);},
  include : function(id, o){this.setExcluded(false,id,o);},
  destroy : function(id){

    Message.ext.showWait();
    var me=this,url = undefined,data = {id:id};

    if(_.isArray(id)){
      url = 'task'
    }else if(_.isString(id)){
      url = 'task/{0}'.format(id);
    }else {
      Message.growl.error('Unexpected Error');
      console.log('String id expected for task instance');
      console.log('Encountered ' + id);
      Ext.MessageBox.hide();
      return;
    }

    var success = function(tasks){
      var s = Ext.getStore(Constants.Store.TASK);
      me._removeDependency(_.map(tasks,'id'));

      _.each(tasks,function(task){
        var r = s.getById(task.id);
        if(r){
          s.remove(r);
          s.commitChanges();
        }
      });
      Message.growl.success('Saved changes.');
    };
    var error   = function(x,o,e){
      Message.growl.error(x.responseText);
      console.log(x);
    };
    var always  = function(){
      try {
        Ext.MessageBox.hide();
      }catch(except) {
        console.log(except.message);
      }
    };

    $.ajax({
      type    : 'DELETE',
      url     : url,
      data    : JSON.stringify(data),
      dataType  : 'json',
      contentType : 'application/json',
      success : success,
      error   : error
    }).always(always);
  },
  _removeDependency: function(taskId){
    if(!_.isArray(taskId)){
      taskId = [taskId];
    }

    var store = Ext.getStore(Constants.Store.TASK);

    _.each(store.data.items,function(task){
      _.remove(task.data.predecessors,function(p){
        return taskId.indexOf(p.id)>-1;
      });
    });
    store.commitChanges();

    store = Ext.getStore(Constants.Store.TASK_INSTANCE);

    _.each(store.data.items,function(instance){
      _.remove(instance.data.predecessorInstances,function(p){
        return taskId.indexOf(p.task.id)>-1;
      });
    });

    store.commitChanges();
  },

  download: function(tasks){
    window.location='/task/download/{0}'.format(tasks);
  },

  downloadByPlan: function(planId){
    window.location='/task/download/plan/{0}'.format(planId);
  }




});
