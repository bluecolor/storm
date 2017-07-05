Ext.define('App.controller.GroupController', {
  extend: 'Ext.app.Controller',

  views : [
    'App.view.group.Group',
    'App.view.group.GroupMenu',
    'App.view.messagebox.CreateSchedulerMessage'
  ],

  refs  : [
    {
      xtype     : 'group',
      ref     : 'group',
      selector  : 'group',
      autoCreate  : true
    },
    {
      xtype     : 'groupmenu',
      ref     : 'groupMenu',
      selector  : 'groupmenu',
      autoCreate  : true
    },
    {
      ref     : 'createSchedulerMessage',
      xtype   : 'createschedulermessage',
      selector  : 'createschedulermessage',
      autoCreate: true,
      forceCreate: true
    }
  ],

  init: function() {
    this.listen({
      controller: {
        '*': {
          'displaygroupmenu'  : this.onDisplayGroupMenu,
          'displaygroupview'  : this.onDisplayGroupView,
          'displaygroupedit'  : this.onDisplayGroupEdit,
          'displaygroupcreate': this.onDisplayGroupCreate,
          'deletegroup'       : this.onDeleteGroup,
          'updategroup'       : this.onUpdateGroup,
          'creategroup'       : this.onCreateGroup,
          'displaygrouptasks' : this.onDisplayGroupTasks
        }
      }
    });
  },

  onDisplayGroupTasks: function(gid,e){
    var me = this,
      pos= e.getXY();

    Message.ext.progress('Finding tasks ...');

    var success = function (tasks) {

      if(tasks.length == 0){
        try{
          var name = Ext.getStore(Constants.Store.GROUP).getById(gid).get('name');
          Message.growl.warn('{} does not have any {} task'.format(name));
        }catch (e){
          console.log(e);
        }
        return;
      }

      var items = _.map(tasks, function(task){

        var iconCls = undefined;
        if(!task.active){
          iconCls = Constants.Icon.getIconClsByStatus(Constants.Status.INACTIVE);
        }else if(task.excluded){
          iconCls = Constants.Icon.getIconClsByStatus(Constants.Status.EXCLUDED);
        }else if(task.active){
          iconCls = Constants.Icon.getIconClsByStatus(Constants.Status.ACTIVE);
        }

        return {
          text  : task.name,
          name  : task.id,
          iconCls : iconCls
        };
      });

      var m = Ext.create('Ext.menu.Menu',{items:items});
      m.showAt(pos);
      m.on('click',function(m,i){
        me.fireEvent('displaytask',i.name);
      });

    };
    var error   = function(){
      Message.growl.error('Failed to get tasks!')
    };
    var always  = function(){
      Ext.MessageBox.hide();
    };

    var promise = AsyncGroup.findTasks(gid);
    promise.success(success).fail(error).always(always);


  },

  onDisplayGroupMenu: function(e,group){
    var me= this;
    var m = me.getGroupMenu();
    m.showAt(e.getXY());

    var onMenuItemClick = function(m,i){
      switch (i.name){
        case 'view'   : me.onDisplayGroupView(group.id); break;
        case 'edit'   : me.onDisplayGroupEdit(group.id); break;
        case 'delete'   : me.onDeleteGroup({force:false,id:group.id});   break;
      }
    };

    m.on('click',onMenuItemClick);
  },

  onUpdateGroup : function(g, o){
    AsyncGroup.update(g,o);
  },

  onCreateGroup : function(g,o){
    AsyncGroup.create(g,o);
  },

  onDisplayGroupView  : function(g){
    var me = this;
    if(_.isObject(g)){
      me.getGroup().view(g);
    }else{
      var success = function(r){
        me.getGroup().view(r);
      };
      var error   = function() {
        Message.growl.error('Unable to find group!');
      };
      var always  = function() {Ext.MessageBox.hide();};
      AsyncGroup.find(g).success(success).error(error).always(always);
    }
  },
  onDisplayGroupEdit  : function(g){
    var me = this;
    if(_.isObject(g)){
      me.getGroup().edit(g);
    }else{
      var success = function(r){
        me.getGroup().edit(r);
      };
      var error   = function(){
        Message.growl.error('Unable to find group!');
      };
      var always  = function(){Ext.MessageBox.hide();}
      AsyncGroup.find(g).success(success).error(error).always(always);
    }
  },

  onDisplayGroupCreate: function(schedulerId) {

    var me = this,
        displaySchedulerCreate =
          !schedulerId &&
          Ext.getStore(Constants.Store.SCHEDULER).getCount() == 0 &&
          App.lib.Session.getSchedulerId() == undefined;

    if(displaySchedulerCreate){
      var cb = function(){
      me.fireEvent('displayschedulercreate');
      };
      me.getCreateSchedulerMessage().display(cb);
    }else{
      this.getGroup().create(schedulerId);
    }
  },

  onDeleteGroup : function(options){

    if(!_.isObject(options)){
      options = {id:options};
    }

    if(!options.force){
      var text =
        'This action <b>CANNOT</b> be undone. This will permanently delete the <br>' +
        '<b>{}</b> {}, tasks, task instances and releted objects';

      var groupName = Ext.getStore(Constants.Store.GROUP).getById(options.id).get('name'),
        be = {
          name    : 'deletegroup',
          objectType  : 'group',
          objectName  : groupName,
          text    : text,
          options   : options
        };
      this.fireEvent('deleteintercept',be);
    }else{
      AsyncGroup.destroy(options.id);
    }
  }


});
