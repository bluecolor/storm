Ext.define('App.view.navbar.NavbarController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.navbar',

    requires: [
        'App.view.navbar.AccountMenu',
        'App.view.navbar.NavbarGearMenu',
        'App.view.navbar.DownloadSchedulerOptions',
        'App.view.profile.Profile',
        'App.view.navbar.HelpMenu',
        'App.view.help.tips.Tips'
    ],

    listen : {
        controller :{
            '*' : {
                'onescheduler': function(schId){
                    this.onOneScheduler(schId);
                },
                'zeroscheduler': function(){
                    this.onZeroScheduler()
                },
                'changenavbarstate': function(state){
                    this.getView().setVisible(state);
                },
                'schedulerselect' : function(schedulerId){
                    var c = this.lookupReference('Schedulers');
                    if(c.getValue()!=schedulerId){
                        c.suspendEvent('schedulerselect');
                        c.setValue(schedulerId);
                        var status =
                            Ext.getStore(Constants.Store.SCHEDULER)
                                .getById(schedulerId)
                                .get('status');
                        c.setStatusStyle(status);
                        c.resumeEvent('schedulerselect');
                    }
                },
                'taskinstanceerrorstackchange' : function(instances){
                    this.onTaskInstanceErrorStackChange(instances);
                }
            }
        },
        component : {
            'combo[name=schedulers]' : {
                'schedulerselect' : function(schedulerId){
                    this.onSchedulerSelect(schedulerId);
                }
            }
        }
    },

    onTaskInstanceErrorStackChange: function(instances){
        var bell = this.lookupReference('NavbarBell');
        bell.setVisible(!_.isEmpty(instances));
        if(!_.isEmpty(instances)){
            bell.setVisible(true);
            bell.setText(instances.length);
            bell.instances = instances;
        }else{
            bell.instances = undefined;
        }
    },

    onNavbarBell: function(b, e){
        var me = this;
        if(!b.instances){
            return;
        }

        var items =
            b.instances.map(function(instance){
                var sch =
                    Ext.getStore(Constants.Store.SCHEDULER)
                        .getById(instance.session.scheduler)
                        .get('name');
                return {
                    text    : '<span style="color:#E74C3C">{}</span>'.format(instance.task.name),
                    name    : instance.id,
                    tooltip : sch
                };
            });
        var m = Ext.create('Ext.menu.Menu',{items:items});
        var pos = b.getPosition();
        pos[1] += b.getHeight();
        m.showAt(pos);

        m.on('click',function(m,i){
            me.fireEvent('displaytaskinstanceview',i.name);
        });

    },

    onOneScheduler: function(schedulerId){
        this.lookupReference('Schedulers').setVisible(true);
        var sch = Ext.getStore(Constants.Store.SCHEDULER).getById(schedulerId);
        this.lookupReference('Schedulers').setValueWithStyle(sch);
    },

    onZeroScheduler: function(){
        this.lookupReference('Schedulers').setVisible(false);
    },

    onNavbarRender: function(){
        var me = this,
            b = this.lookupReference('SideMenuToggle'),
            o = {target:b};
        setTimeout(function(){
            me.fireEvent('displaysidebartip',o);
        },2000);

    },

    onNavbarGear: function(b,e){
        var me = this;
        var m = Ext.create('App.view.navbar.NavbarGearMenu');
        m.showAt(e.getXY());

        m.on('click',function(m,item){

            switch (item.name){
                case 'downloadScheduler': me.onDownloadScheduler();     break;
                case 'uploadScheduler'  : me.onUploadScheduler();       break;
                case 'options': me.fireEvent('displayoptions');         break;
                case 'changePassword': me.fireEvent('changepassword');  break;
                case 'appSettings': me.fireEvent('displayappsettings'); break;
                case 'connections': me.fireEvent('displayconnectioncreate'); break;
                case 'schedulers' : me.fireEvent('displayschedulercreate');  break;
                case 'parameters' : me.fireEvent('displayparametercreate');  break;
                case 'users'      : me.fireEvent('displayuserview');    break;
                case 'sqlEditor'  : me.fireEvent('displaysqleditor');   break;
                case 'issues'     : me.fireEvent('showissues');         break;
            }
        });

    },

    onDownloadScheduler: function(){
        var m = Ext.create('App.view.navbar.DownloadSchedulerOptions');
        m.show();
    },

    onUploadScheduler: function(){
        this.fireEvent('uploadscheduler');
    },


    onNavbarSpeaker: function(b){
        App.lib.Sound.setSoundOn(b.pressed);
        b.setIconCls(b.pressed?'speaker':'mute');
    },

    onSideMenuToggle: function(){
        this.fireEvent('sidemenutoggle');
    },

    onGoHome: function(){
        this.fireEvent('gohome');
    },

    onSchedulerSelect: function(id){
        this.fireEvent('schedulerselect',id);
    },

    onAccountMenu: function(b,e){
        var m = Ext.create('App.view.navbar.AccountMenu');
        var xy= e.getXY();
        xy[0] = xy[0]-m.width;
        m.showAt(xy);
    },

    onHelp: function(b, e){
        var me= this,
            m = Ext.create('App.view.navbar.HelpMenu');
        m.showAt(e.getXY());

        m.on('click',function(m,i){
            switch (i.name){
                case 'tip'          : me.onDisplayTips(); break;
                case 'checkUpdate'  : me.onCheckUpdate(); break;
                case 'about'        : me.onDisplayAbout();break;
            }
        });
    },

    onDisplayTips: function(){
        Ext.create('App.view.help.tips.Tips').show();
    },

    onCheckUpdate: function(){
        this.fireEvent('checkupdate');
    },

    onDisplayAbout: function(){
        this.fireEvent('displayabout');
    }

});