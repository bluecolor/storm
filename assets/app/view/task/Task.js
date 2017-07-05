Ext.define('App.view.task.Task',{
    extend  : 'Ext.window.Window',
    xtype   : 'task',

    requires: [
        'App.view.task.TaskController',
        'App.view.task.TaskModel',
        'App.view.task.TaskPredecessors',
        'App.view.task.TaskDetail',
        'App.view.task.TaskGroups',
        'App.view.task.TaskOwners',
        'App.view.pool.combo.SearchCombo',
        'App.view.task.TaskScript',
        'App.view.widget.TechnoCombo'
    ],

    schedulerId : undefined,

    height      : 550,
    width       : 500,

    modal       : false,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'fit',
    closeAction : 'destroy',
    title       : 'Task',


    controller: 'task',
    viewModel : 'task',

    items : [
        {
            xtype : 'tabpanel',
            bodyPadding : 10,
            tabPosition : 'bottom',
            tbar : {
                name  : 'tbar',
                items : [
                    /*{
                        name    : 'clear',
                        tooltip : 'Clear',
                        iconCls : 'broom',
                        handler : 'onClear'
                    },*/
                    {
                        name    : 'save',
                        tooltip : 'Save',
                        iconCls : 'save',
                        handler : 'onSaveTask',
                        formBind: true
                    },
                    {
                        xtype       : 'searchcombo',
                        name        : 'groupSearch',
                        flex        : 1,
                        emptyText   : 'Add group to task',
                        bind        : {store : '{groups}'},
                        hidden      : true,
                        listeners   : {
                            'afterrender': function(){
                                this.store.load();
                            },
                            select  : 'onAddGroup',
                            'enterkeypress' : function(c,e){
                                if(c.store.findRecord('id',c.getValue()) == null){
                                    Message.growl.error('No task group {0} !'.format(c.getRawValue()));
                                }
                            }
                        }
                    },
                    {
                        xtype       : 'searchcombo',
                        name        : 'predecessorSearch',
                        flex        : 1,
                        emptyText   : 'Add predecessor',
                        bind        : {store : '{predecessors}'},
                        hidden      : true,
                        queryMode   : 'remote',
                        displayField: 'name',
                        valueField  : 'id',
                        listeners   : {
                            select  : 'onAddPredecessor',
                            'enterkeypress' : function(c,e){
                                if(c.store.findRecord('id',c.getValue()) == null){
                                    Message.growl.error('No task {0} !'.format(c.getRawValue()));
                                }
                            }
                        }
                    },
                    {
                        xtype       : 'searchcombo',
                        name        : 'ownerSearch',
                        flex        : 1,
                        emptyText   : 'Add owners',
                        bind        : {store : '{owners}'},
                        hidden      : true,
                        listeners   : {
                            select  : 'onAddOwner',
                            'enterkeypress' : function(c,e){
                                if(c.store.findRecord('id',c.getValue()) == null){
                                    Message.growl.error('No user {0} !'.format(c.getRawValue()));
                                }
                            }
                        }
                    },
                    {
                        reference: 'TechnoCombo',
                        name  : 'technoCombo',
                        hidden: true,
                        xtype : 'technocombo',
                        flex  : 1,
                        listeners: {
                            select: 'onTechnoSelect'
                        }
                    },
                    {
                        tooltip: 'Script Editor',
                        name  : 'popOut',
                        hidden: true,
                        iconCls: 'pop-out',
                        handler: 'onDisplayScriptEditor'
                    }
                ]
            },
            items : [
                {
                    title    : 'Details',
                    xtype    : 'taskdetail',
                    reference: 'TaskDetail'
                },
                {
                    reference: 'TaskScript',
                    title : 'Script',
                    xtype : 'taskscript',
                    name  : 'taskScript',
                    hidden: false
                },
                {
                    title : 'Predecessors',
                    xtype : "taskpredecessors"
                },
                {
                    title : 'Groups',
                    xtype : 'taskgroups',
                    reference: 'TaskGroups'
                },
                {
                    title : 'Owners',
                    xtype : 'taskowners'
                }
            ],
            listeners : {
                tabchange : function(me,p){
                    this.down('[name=tbar] searchcombo[name=groupSearch]')
                        .setVisible(p.name == 'taskGroups');

                    this.down('[name=tbar] searchcombo[name=predecessorSearch]')
                        .setVisible(p.name == 'taskPredecessors');


                    this.down('[name=tbar] searchcombo[name=ownerSearch]')
                        .setVisible(p.name == 'taskOwners');

                    this.down('[name=tbar] combo[name=technoCombo]')
                        .setVisible(p.name == 'taskScript');

                    this.down('[name=tbar] button[name=popOut]')
                        .setVisible(p.name == 'taskScript');

                }
            }
        }
    ],

    setPlan : function(plan){
        this.down('taskdetail').setPlan(plan);
        return this;
    },

    getValues : function() {

        var d = this.down('taskdetail').getValues(),
            p = this.down('taskpredecessors').getValues(),
            o = this.down('taskowners').getValues(),
            g = this.down('taskgroups').getValues(),
            s = this.down('taskscript').getValue(),
            t = this.down('technocombo').getValue();


        var task = {
            id          : d.id,
            name        : d.name,
            plan        : d.plan,
            connection  : d.connection,
            active      : d.active,
            technology  : t,
            script      : s,
            retryCount  : d.retryCount,
            critical    : d.critical,
            excluded    : d.excluded,
            startAfter  : d.startAfter,
            mask        : d.mask,
            restartable : d.restartable,
            taskOrder   : d.taskOrder,
            description : d.description,
            predecessors: p,
            primaryGroup: this.down('taskgroups').getPrimaryGroup(),
            groups      : g,
            owners      : o
        };

        return task;
    },

    markpg : function(task){
        for(var i = 0; i< task.groups.length; i++){
            if(task.groups[i].id == task.primaryGroup.id){
                task.groups[i].primary = true;
                return task.groups;
            }
        }
        return task.groups;
    },

    setReadOnly : function(b){
        b = b == undefined ? true : b;
        this.down('taskdetail').setReadOnly(b);
        this.down('taskpredecessors').setReadOnly(b);
        this.down('taskgroups').setReadOnly(b);
        this.down('taskowners').setReadOnly(b);
        this.down('toolbar[name=tbar]').setVisible(!b);
        return this;
    },

    setValues : function(t) {
        var me = this;
        this.down('taskdetail').setValues(t);
        this.down('taskpredecessors').setValues(t.predecessors);
        this.down('taskgroups').setValues(me.markpg(t));
        this.down('taskowners').setValues(t.owners);
        this.down('technocombo').setValue(t.technology);
        this.down('taskscript').setValue(t.script);
        
        return this;
    },


    view  : function(t){
        this.setReadOnly();
        this.setValues(t);
        return this.show();
    },
    edit  : function(task){
        return this.show().setReadOnly(false).setValues(task);
    },
    create: function(){
        this.setReadOnly(false);
        this.down('taskgroups').initCreate();
        return this.show();
    },

    setScheduler: function(schedulerId){
        this.schedulerId = schedulerId;
        //--------------------------------------------
        var ps = Ext.create('App.store.PlanStore');
        ps.loadByScheduler(schedulerId);
        var c = this.down('combo[name=plan]');
        c.setReadOnly(false);
        c.setStore(ps);
        //--------------------------------------------
        var gs = Ext.create('App.store.GroupStore');
        gs.loadStore(schedulerId);
        this.down('combo[name=groupSearch]').setStore(gs);
        //--------------------------------------------

        return this;
    },

    dup : function(t){
        var task = _.cloneDeep(t);
        delete task.id;
        this.edit(task);
    }

});
