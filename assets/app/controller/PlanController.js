Ext.define('App.controller.PlanController', {
  extend: 'Ext.app.Controller',

  views : [
    'App.view.plan.Plan',
    'App.view.plan.PlanMenu',
    'App.view.messagebox.CreateSchedulerMessage'
  ],

  refs  : [
    {
      ref       : 'plan',
      xtype     : 'plan',
      selector  : 'plan',
      autoCreate: true
    },
    {
      ref     : 'planMenu',
      xtype     : 'planmenu',
      selector  : 'planmenu',
      autoCreate  : true
    },
    {
      ref       : 'createSchedulerMessage',
      xtype     : 'createschedulermessage',
      selector  : 'createschedulermessage',
      autoCreate: true,
      forceCreate: true
    }
  ],

  init: function() {
    this.listen({
      controller: {
        '*': {
          'displayplanmenu'   : this.onDisplayPlanMenu,
          'displayplanview'   : this.onDisplayPlanView,
          'displayplanedit'   : this.onDisplayPlanEdit,
          'displayplancreate' : this.onDisplayPlanCreate,
          'protectplan'       : this.onProtectPlan,
          'unprotectplan'     : this.onUnProtectPlan,
          'activateplan'      : this.onActivatePlan,
          'deactivateplan'    : this.onDeactivatePlan,
          'deleteplan'        : this.onDeletePlan,
          'createplan'        : this.onCreatePlan,
          'updateplan'        : this.onUpdatePlan,
          'validateplan'      : this.onValidatePlan,
          'displayplantasks'  : this.onDisplayPlanTasks
        }
      }
    });
  },

  onDisplayPlanTasks: function(e, planId, status){
    var me = this,
      pos= e.getXY();

    var success = function (tasks) {

      if(tasks.length == 0){
        try{
          var name = Ext.getStore(Constants.Store.PLAN).getById(planId).get('name');
          Message.growl.warn('{} does not have any {} task'.format(name,status));
        }catch (e){
          console.log(e);
        }
        return;
      }

      var items = _.map(tasks, function(task){

        var iconCls = undefined;
        if(!status){
          if(!task.active){
            iconCls = Constants.Icon.getIconClsByStatus(Constants.Status.INACTIVE);
          }else if(task.excluded){
            iconCls = Constants.Icon.getIconClsByStatus(Constants.Status.EXCLUDED);
          }else if(task.active){
            iconCls = Constants.Icon.getIconClsByStatus(Constants.Status.ACTIVE);
          }
        }else{
          iconCls = Constants.Icon.getIconClsByStatus(status);
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

    var promise = AsyncPlan.findTasksByStatus(planId, status);
    promise.success(success).fail(error).always(always);
  },

  onDisplayPlanMenu: function(e,plan){
    var me= this,
      m = this.getPlanMenu();

    me.getPlanTaskStatusStats(plan.id).success(function(stats){
      m.down('[name=activate]').setDisabled(stats.active == 0);
      m.showAt(e.getXY());
    }).fail(function(){
       Message.growl.error('Failed get plan stats for {}'.format(plan.name))
    });

    var onMenuItemClick = function(m,i){
      if(!i.name){return;}
      switch (i.name){
        case 'delete'       : me.onDeletePlan({force:false,id:plan.id}); break;
        case 'view'         : me.onDisplayPlanView(plan); break;
        case 'edit'         : me.onDisplayPlanEdit(plan); break;
        case 'deactivate'   : me.onDeactivatePlan(plan.id);   break;
        case 'activate'     : me.onActivatePlan(plan.id);   break;
        case 'protect'      : me.onProtectPlan(plan.id);  break;
        case 'unprotect'    : me.onUnProtectPlan(plan.id);break;
        case 'newTask'      : me.onNewTask(plan.id);    break;
        case 'validate'     : me.onValidate(plan.id);   break;
        case 'uploadTasks'  : me.fireEvent('uploadtask'); break;
        case 'downloadTasks': me.onDownloadTasksByPlan(plan.id); break;
      }
    };
    m.on('click',onMenuItemClick);
  },

  onDownloadTasksByPlan: function(planId){
    App.lib.ajax.Task.downloadByPlan(planId);
  },

  getPlanTaskStatusStats: function(planId){
    return AsyncPlan.getPlanTaskStatusStats(planId);
  },

  onNewTask: function(planId){
    this.fireEvent('displaytaskcreate',planId);
  },

  onValidatePlan: function(p){
    AsyncPlan.validate(p);
  },

  onUpdatePlan : function(p,o){
    AsyncPlan.update(p,o);
  },

  onCreatePlan : function(p,o){
    AsyncPlan.create(p,o);
  },

  onDisplayPlanView   : function(p){
    this.getPlan().view(p);
  },

  onDisplayPlanEdit   : function(p){
    this.getPlan().edit(p);
  },

  onDisplayPlanCreate : function(schedulerId) {

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
      this.getPlan().create(schedulerId);
    }

  },

  onProtectPlan     : function(p){
    var cb = function(b){
      if(b=='ok'){
        AsyncPlan.protect(p);
      }
    };
    Message.ext.ask(cb);
  },

  onUnProtectPlan   : function(p){
    var cb = function(b){
      if(b=='ok'){
        AsyncPlan.unprotect(p);
      }
    };
    Message.ext.ask(cb);
  },

  onActivatePlan : function(p){
    var cb = function(b){
      if(b=='ok'){
        AsyncPlan.activate(p);
      }
    };
    Message.ext.ask(cb);
  },
  onDeactivatePlan : function(p){

    var cb = function(b){
      if(b=='ok'){
        AsyncPlan.deactivate(p);
      }
    };

    Message.ext.ask(cb);
  },

  onDeletePlan: function(options){

    if(!options.force){
      var text =
        'This action <b>CANNOT</b> be undone. This will permanently delete the <br>' +
        '<b>{}</b> {}, sessions, tasks, task instances and releted objects';

      var planName = Ext.getStore(Constants.Store.PLAN).getById(options.id).get('name'),
        be = {
          name    : 'deleteplan',
          objectType  : 'plan',
          objectName  : planName,
          text    : text,
          options   : options
        };
      this.fireEvent('deleteintercept',be);
    }else{
      AsyncPlan.destroy(options.id);
    }
  }

});
