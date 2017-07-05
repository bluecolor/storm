Ext.define('App.view.group.Group', {
    extend: 'Ext.window.Window',
    xtype: 'group',

    requires  : [
        'App.view.group.GroupModel',
        'App.view.group.GroupController',
        'App.view.group.GroupList',
        'App.view.group.GroupDetail',
        'App.view.group.GroupTasks',
        'App.view.pool.combo.SearchCombo'
    ],

    schedulerId : undefined,


    viewModel   : {type : 'group'},
    controller  : 'group',

    modal       : false,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 975,
    height      : 575,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'border',
    title       : 'Group',

    items : [
        {
            xtype       : 'grouplist',
            region      : 'west',
            width       : 300,
            split       : true,
            header      : false,
            hidden      : true
        },
        {
            name        : 'groupInfo',
            xtype       : 'tabpanel',
            region      : 'center',
            margins     : '0 0 0 0',
            collapsible : false,
            animCollapse: false,
            reference   : 'GroupInfo',
            tabPosition : 'bottom',
            tbar        : {
                name  : 'tbar',
                items : [
                    {
                        iconCls : 'menu',
                        tooltip : 'Sidebar',
                        enableToggle: true,
                        pressed: false,
                        toggleHandler : 'onSideMenuToggle'
                    },
                    {
                        name    : 'save',
                        tooltip : 'Save',
                        iconCls : 'save',
                        handler : 'onSaveGroup',
                        formBind: true
                    },
                    {
                        xtype       : 'searchcombo',
                        hidden      : true,
                        queryMode   : 'remote',
                        displayField: 'name',
                        valueField  : 'id',
                        flex        : 1,
                        emptyText   : 'Add task to group',
                        bind        : {store : '{tasks}'},
                        listeners   : {
                            select  : 'onAddTaskToGroup',
                            'enterkeypress' : function(c,e){
                                if(c.store.findExact('id',c.getValue())==-1){
                                    Message.growl.error('No task group {0} !'.format(c.getRawValue()));
                                }
                            }
                        }
                    }
                ]
            },
            items : [
                {
                    xtype: 'groupdetail',
                    margins: '0 0 0 0',
                    collapsible: false,
                    animCollapse: false,
                    title: 'Details',
                    listeners: {
                        validitychange: function (form, valid) {
                            var saveButton = this.up('window').down('button[name=save]');
                            saveButton.setDisabled(!valid);
                        }
                    }
                },
                {
                    name  : 'groupTasks',
                    xtype : 'grouptasks',
                    title : 'Tasks',
                    reference : 'GroupTasks'
                }
            ],
            listeners   : {
                tabchange : function(me,p){
                    this.down('[name=tbar] searchcombo')
                        .setVisible(p.name == 'groupTasks');
                }
            },
            getValues   : function() {
                var me = this;
                return {
                    d : me.down('groupdetail').getValues(),
                    t : me.down('grouptasks').getValues()
                };
            },
            setValues   : function(v){
                this.down('groupdetail').setValues(v);
                return this;
            },
            clear       : function() {
                var me = this;
                me.down('groupdetail').clear();
                return me;
            },
            setReadOnly : function(b){
                var me = this;
                b = b==undefined ? true : b;
                me.down('groupdetail').setReadOnly(b);
                this.down('toolbar[name=tbar]').setVisible(!b);
                return me;
            },
            reset       : function() {
                this.setActiveTab(this.down('groupdetail'));
                return this;
            }
        }
    ],

    listeners : {
        add : function (c, i) {
            if (i.xtype == 'bordersplitter') {
                i.width = Constants.UI.borderSplitter.size;
            }
        }
    },

    setValues : function(v){
        this.down('[name=groupInfo]').setValues(v);
        this.down('grouptasks').setValues(v.tasks);
        return this;
    },

    getValues : function(){
        var v = this.down('[name=groupInfo]').getValues(),
            o = {};
        o = _.extend(o,v.d);
        o.tasks = v.t;
        return o;
    },


    setReadOnly : function(b){
        b = b != undefined ? b : true;
        this.down('[name=groupInfo]').setReadOnly(b);
        return this;
    },


    view  : function(group) {
        return this.setReadOnly().setValues(group).show();
    },

    edit  : function(group){
        var me = this;
        me.setReadOnly(false)
            .setValues(group)
            .show()
            ._select(group.id);
        return me;
    },

    create: function(schedulerId) {
        this.schedulerId = schedulerId;
        this.clear();
        this.setReadOnly(false);
        return this.show();
    },

    clear : function(){
        this.down('[name=groupInfo]').clear();
    },

    _select : function(id){
        var g = this.down('grouplist'),
            s = this.lookupViewModel().getStore('groups');
        g.getSelectionModel().select(s.getById(id), false, true);
        return this;
    }



});
