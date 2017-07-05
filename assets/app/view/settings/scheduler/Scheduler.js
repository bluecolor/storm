Ext.define('App.view.settings.scheduler.Scheduler',{
    extend: 'Ext.window.Window',
    xtype: 'scheduler',

    requires : [
        'App.view.settings.scheduler.SchedulerController',
        'App.view.settings.scheduler.SchedulerModel',
        'App.view.settings.scheduler.SchedulerList',
        'App.view.settings.scheduler.SchedulerDetail'
    ],

    controller : 'scheduler',
    viewModel  : 'scheduler',

    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 975,
    height      : 575,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'border',
    title       : 'Scheduler',

    items : [
        {
            xtype       : 'schedulerlist',
            region      : 'west',
            width       : 300,
            split       : true,
            margins     : '0 0 0 0',
            collapsible : false,
            animCollapse: false,
            header      : false
        },
        {
            xtype       : 'schedulerdetail',
            region      : 'center',
            margins     : '0 0 0 0',
            collapsible : false,
            animCollapse: false
        }
    ],

    listeners : {
        add : function (c, i) {
            if (i.xtype == 'bordersplitter') {
                i.width = Constants.UI.borderSplitter.width;
            }
        },
        show : 'onShowScheduler'
    },

    clear : function(){
        this.down('schedulerdetail').clear();
        return this;
    },
    setValues : function(s){
        if(!s){return this;}
        return this.down('schedulerdetail').setValues(s).show();
    },
    getValues : function(){
        return this.down('schedulerdetail').getValues();
    },
    setReadOnly : function(b){
        b = b==undefined?true:b;
        this.down('schedulerdetail').setReadOnly(b);
        return this;
    },


    view : function(s){
        return this.setValues(s).setReadOnly().show();
    },
    edit : function(s){
        return this.setReadOnly(false).setValues(s).show();
    },
    create : function(){
        return this.clear().setReadOnly(false).show();
    }

});
