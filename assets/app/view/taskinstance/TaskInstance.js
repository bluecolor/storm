Ext.define('App.view.taskinstance.TaskInstance', {
    extend: 'Ext.window.Window',
    xtype: 'taskinstance',

    requires: [
        'App.view.taskinstance.TaskInstanceController',
        'App.view.taskinstance.TaskInstanceModel',
        'App.view.taskinstance.TaskInstanceDetail',
        'App.view.taskinstance.TaskInstancePredecessors',
        'App.view.taskinstance.TaskInstanceGroups',
        'App.view.taskinstance.TaskInstanceOwners',
        'App.view.taskinstance.TaskInstanceLogs',
        'App.view.taskinstance.TaskInstanceScript',
        'App.view.widget.TechnoCombo'
    ],

    controller: 'taskinstance',
    viewModel : 'taskinstance',

    height: 500,
    width : 500,

    modal: true,
    collapsible: true,
    animCollapse: true,
    maximizable: true,
    minWidth: 300,
    minHeight: 200,
    layout: 'fit',
    closeAction: 'destroy',
    title: 'TaskInstance',
    task : undefined,

    items : [
        {
            xtype: 'tabpanel',
            bodyPadding: 10,
            tabPosition: 'bottom',
            tbar: {
                name  : 'tbar',
                items : [
                    {
                        name    : 'save',
                        tooltip : 'Save',
                        iconCls : 'save',
                        handler : 'onSaveTaskInstance',
                        formBind: true
                    },
                    {
                        name    : 'task',
                        tooltip : 'Task definition',
                        iconCls : 'barcode',
                        handler : 'onDisplayTask',
                        formBind: true
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
                        listConfig  : {
                            getInnerTpl: function() {
                                var img = '<img src="resources/img/status/{status}-16.png" title="{status}" align="center">';
                                return img + ' {name}';
                            }
                        },
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
                        xtype: 'technocombo',
                        name : 'technoCombo',
                        flex : 1,
                        hidden: true,
                        reference: 'TechnoCombo'
                    },
                    {
                        tooltip : 'Script Editor',
                        name    : 'popOut',
                        hidden  : true,
                        iconCls : 'pop-out',
                        handler : 'onDisplayScriptEditor'
                    }
                ]
            },
            items: [
                {
                    name : 'taskInstance',
                    title: 'Details',
                    xtype: 'taskinstancedetail'
                },
                {
                    reference: 'TaskInstanceScript',
                    name : 'taskInstanceScript',
                    title: 'Script',
                    xtype: 'taskinstancescript'
                },
                {
                    name : 'taskInstancePredecessors',
                    title: 'Predecessors',
                    xtype: 'taskinstancepredecessors'
                },
                {
                    name : 'taskInstanceGroups',
                    title: 'Groups',
                    xtype: 'taskinstancegroups'
                },
                {
                    name : 'taskInstanceOwners',
                    title: 'Owners',
                    xtype: 'taskinstanceowners'
                },
                {
                    name : 'logs',
                    title: 'Logs',
                    xtype: 'taskinstancelogs'
                }
            ],
            listeners : {
                tabchange : function(me,p){
                    this.down('[name=tbar] searchcombo[name=predecessorSearch]')
                        .setVisible(p.name == 'taskInstancePredecessors');

                    this.down('[name=tbar] technocombo')
                        .setVisible(p.name == 'taskInstanceScript');
                    this.down('[name=tbar] [name=popOut]')
                        .setVisible(p.name == 'taskInstanceScript');
                }
            }
        }
    ],

    setReadOnly : function(b){
         b = b == undefined ? true : b;
        this.down('taskinstancedetail').setReadOnly(b);
        this.down('taskinstancepredecessors').setReadOnly(b);
        this.down('toolbar[name=tbar]').setVisible(!b);
        return this;
    },

    markpg : function(task){
        for(var i = 0; task.groups&&i< task.groups.length; i++){
            if(task.groups[i].id == task.primaryGroup.id){
                task.groups[i].primary = true;
                return task.groups;
            }
        }
        return task.groups;
    },

    setValues : function(t) {
        var me = this;
        me.task= t.task;
        this.down('taskinstancedetail').setValues(t);
        this.down('taskinstancepredecessors').setValues(t.predecessorInstances);
        this.down('taskinstancegroups').setValues(me.markpg(t));
        this.down('taskinstanceowners').setValues(t.owners);
        this.down('taskinstancescript').setValue(t.script);
        this.down('technocombo').setValue(t.technology);
        return this;
    },


    getValues : function() {

        var d = this.down('taskinstancedetail').getValues(),
            p = this.down('taskinstancepredecessors').getValues(),
            s = this.down('taskinstancescript').getValue(),
            t = this.down('technocombo').getValue();
        

        var instance = {
            id          : d.id,
            technology  : t,
            script      : s,
            retryCount  : d.retryCount,
            critical    : d.critical,
            startAfter  : d.startAfter,
            restartable : d.restartable,
            taskOrder   : d.taskOrder,
            connection  : d.connection,
            predecessors: p
        };


        return instance;
    },



    view : function(t){
        return this.show().setReadOnly().setValues(t);
    },

    edit : function(t){
        return this.show().setReadOnly(false).setValues(t);
    }

});