Ext.define('App.controller.AppController',{
    extend: 'Ext.app.Controller',

    views : [
        'App.view.widget.MainOptionsTool',
        'App.view.session.Session',
        'App.view.help.tips.Tips'
    ],

    refs : [
        {
            ref         : 'session',
            xtype       : 'session',
            autoCreate  : true,
            selector    : 'session'
        },
        {
            ref         : 'tips',
            xtype       : 'tips',
            autoCreate  : true,
            selector    : 'tips'
        }
    ],


    init: function() {

        this.control({
            'mainoptionstool' : {
                'schedulercreated': this.onSchedulerCreated,
                'schedulerdeleted': this.onSchedulerDeleted,
                'openscheduler' : function(sch){
                    var u = window.location.href;
                    if(u.indexOf('#') > -1) {
                        u = u.substring(0,u.indexOf('#'));
                    }

                    window.open('{0}#{1}'.format(u, sch), '_blank').focus();
                },
                'signout' : function(){
                    var u = window.location.href;
                    if(u.indexOf('#') > -1) {
                        u = u.substring(0,u.indexOf('#'));
                    }
                    window.location.href = '{0}{1}'.format(u, 'login');
                }
            }
        });

        this.listen({
            controller: {
                '*': {
                    'onescheduler'      : this.onOneScheduler,
                    'zeroscheduler'     : this.onZeroScheduler,
                    'showsessions'      : this.onShowSessions,
                    'schedulerselect'   : this.onSchedulerSelect,
                    'appready'          : this.onAppReady
                }
            },
            store: {
                '#SchedulerStore': {
                    datachanged: function(s){
                        var c = s.getCount();
                        if(c == 1){
                            this.fireEvent('onescheduler',s.getAt(0).get('id'));
                        }else if(c == 0){
                            this.fireEvent('zeroscheduler');
                        }
                    }
                },
                '#SessionStore': {
                  datachanged: function(s){
                    var c = s.getCount();
                    if(c > 0){
                      this.fireEvent('sessionexists');
                    }else{
                      this.fireEvent('nosessionexists');
                    }
                  }
                }
            }
        });

        this.listenSocket();

    },

    CONNECTION_STATUS : true,

    listenSocket: function(){
        var me = this;

        io.socket.on('disconnect', function(){
            if(me.CONNECTION_STATUS = true){
                window.location.replace('/logout');
                me.CONNECTION_STATUS = false;
            }
        });
    },


    onOneScheduler: function(schedulerId){

    },

    onZeroScheduler: function(){

    },

    onAppReady: function(){
        var me = this;
        if(App.lib.User.options.tipsOnStart){
            me.getTips().show();
        }

    },

    onSchedulerSelect: function(schedulerId){
        SchedulerManager.setScheduler(schedulerId);
    },

    onShowSessions : function(plan){
        this.getSession().show();
    }

});
