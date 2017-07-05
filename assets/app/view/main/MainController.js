Ext.define('App.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'App.view.task.Task'
    ],

    alias: 'controller.main',

    listen : {
        controller :{
            '*' : {
                'gohome'        : function(){ this.onGoHome();},
                'plantasks'     : function(plan, load){ this.onPlanTasks(plan,load); },
                'sessiontasks'  : function(sid, load, status){ this.onSessionTasks(sid,load); },
                'displayreports': function(){this.onDisplayReports();},
                'closereports'  : function(){this.onCloseReports();},
                'sidemenutoggle': function(){this.onSideMenuToggle();}
            }
        },
        component : {
            'maincenter bootstraptoggle[name=taskSwitch]' : {
                'change' : function(checked){
                    if(!checked){
                        var p,c = Ext.ComponentQuery.query('navsession combo[name=sessions]');
                        if(c){
                            var sid = c[0].getValue();
                            if(sid){
                                var session = Ext.getStore(Constants.Store.SESSION).getById(sid);
                                if(session){
                                    p = session.get('plan').id;
                                }
                            }
                        }

                        var store = Ext.getStore(Constants.Store.TASK),
                            load  =  p!=store.getPlan() || store.getCount()==0;
                        this.onPlanTasks(p,load);
                    }else{
                        this.onSessionTasks();
                    }
                }
            }
        }
    },

    onMainRender: function(){
        var me = this;
        setTimeout(function(){
            me.fireEvent('appready');
        },500);
    },

    onGoHome: function(){
        this.lookupReference('MainCenter')
            .getLayout()
            .setActiveItem(2);
    },

    onCloseReports: function(){
        this.lookupReference('MainCenter')
            .getLayout()
            .setActiveItem(2);
    },

    onDisplayReports : function(){
        this.lookupReference('MainCenter')
            .getLayout()
            .setActiveItem(1);
    },

    onSearchTask : function(f,v){

        var event = this.getView()
            .down('[reference=TaskCenter]')
            .getLayout()
            .getActiveItem()
            .name == 'task' ? 'searchtask' : 'searchtaskinstance';
        this.fireEvent(event,v);
    },

    onNavbarToggle: function(b, state){
        b.setIconCls(state?b.hideNavbarCls:b.showNavbarCls);
        this.lookupReference('SideMenuToggle').setVisible(!state);
        this.fireEvent('changenavbarstate',state);
    },

    onSideMenuToggle : function(){
        var n = this.lookupReference('Navigator');
        n.setVisible(!n.isVisible());
    },

    onDownloadTask : function(){
        var me = this,
            sel= me.getView().down('taskgrid').getSelectionModel().getSelection(),
            tasks = [];

        if(sel && sel.length > 0){
            tasks = _.chain(sel).map('data').map('id').value();
            me.fireEvent('downloadtask',tasks);
        }
    },

    onUploadTask: function(){
        this.fireEvent('uploadtask');
    },

    onTaskGear  : function(b,e){
        var event = this.getView()
            .down('[reference=TaskCenter]')
            .getLayout()
            .getActiveItem()
            .name == 'task' ? 'showtasksmenu' : 'showtaskinstancesmenu';
        this.fireEvent(event,e);
    },

    onPlanTasks : function(p,load){
        this.lookupReference('MainCenter').getLayout().setActiveItem(0);
        load = load == undefined ? true:load;
        var v = this.lookupReference('TaskCenter');
        var s = Ext.getStore(Constants.Store.TASK);
        v.getLayout().setActiveItem(1);
        if(p && load){
            s.loadStore(p);
        }else if(!p && load){
            s.loadStore();
        }
    },

    loadPlanTasks : function(plan){
        Ext.getStore(Constants.Store.TASK).loadStore(plan);
    },


    onSessionTasks : function(sid){
        this.lookupReference('MainCenter').getLayout().setActiveItem(0);
        var v = this.lookupReference('TaskCenter');
        v.getLayout().setActiveItem(0);
    },

    onNewTask : function(){
        this.fireEvent('displaytaskcreate');
    },

    onReloadTaskGrid : function(){
        var n = this.lookupReference('TaskCenter').getLayout().getActiveItem().name;
        switch(n){
            case 'task'         : this.fireEvent('reloadtasks'); break;
            case 'taskInstance' : this.fireEvent('reloadtaskinstances'); break;
        }

    }


});
