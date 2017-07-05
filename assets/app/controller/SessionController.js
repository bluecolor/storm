Ext.define('App.controller.SessionController', {
    extend: 'Ext.app.Controller',

    views: [
        'App.view.session.SessionMenu',
        'App.view.session.Session',
        'App.view.session.AllSessions',
        'App.view.widget.ParallelPrompt'
    ],

    refs: [
        {
            ref         : 'session',
            xtype       : 'session',
            selector    : 'session',
            autoCreate  : true
        },
        {
            ref         : 'allSessions',
            xtype       : 'allsessions',
            selector    : 'allsessions',
            autoCreate  : true
        },
        {
            ref         : 'sessionMenu',
            xtype       : 'sessionmenu',
            selector    : 'sessionmenu',
            autoCreate  : true,
            forceCreate : true
        }
    ],

    init: function () {
        this.listen({
            controller: {
                '*': {
                    'displaysessionmenu'    : this.onDisplaySessionMenu,
                    'allsessions'           : this.onDisplayAllSessions,
                    'displaysessionview'    : this.onDisplaySessionView,
                    'playsession'           : this.onPlaySession,
                    'replaysession'         : this.onReplaySession,
                    'pausesession'          : this.onPauseSession,
                    'deletesession'         : this.onDeleteSession,
                    'setsessionparallel'    : this.onSetSessionParallel,
                    'sessionparallelprompt' : this.onSessionParallelPrompt,
                    'displaysessiontasks'   : this.onDisplaySessionTasks
                }
            }
        });
    },

    onDisplaySessionTasks: function(e, sid, status){
        var me = this,
            pos= e.getXY();
        status = status == 'ALL' ? undefined : status;

        Message.ext.progress('Processing ...');

        var success = function (instances) {

            if(instances.length == 0){
                try{
                    var name = Ext.getStore(Constants.Store.SESSION).getById(sid).get('shortName');
                    Message.growl.warn('{} does not have any {} task'.format(name,status));
                }catch (e){
                    console.log(e);
                }
                return;
            }

            var items = _.map(instances, function(instance){

                var status = instance.excluded ? Constants.Status.EXCLUDED : instance.status;

                return {
                    text    : instance.task.name,
                    name    : instance.id,
                    iconCls : Constants.Icon.getIconClsByStatus(status)
                };
            });

            var m = Ext.create('Ext.menu.Menu',{items:items});
            m.showAt(pos);
            m.on('click',function(m,i){
                me.fireEvent('displaytaskinstanceview',i.name);
            });

        };
        var error   = function(){
            Message.growl.error('Failed to get tasks!')
        };
        var always  = function(){
            Ext.MessageBox.hide();
        };

        var promise = AsyncSession.findTasksByStatus(sid, status);
        promise.success(success).fail(error).always(always);
    },

    onDisplaySessionMenu: function(session,e){
        var me=this,
            m = this.getSessionMenu();

        m.showAt(e.getXY());

        m.on('click',function(m,i){
            switch(i.name){
                case 'delete'   : me.onDeleteSession(session.id);       break;
                case 'view'     : me.onDisplaySessionView(session);     break;
                case 'parallel' : me.onSessionParallelPrompt(session);  break;
                case 'play'     : me.onPlaySession(session.id);         break;
                case 'replay'   : me.onReplaySession(session.id);       break;
                case 'pause'    : me.onPauseSession(session.id);        break;
            }
        });
    },

    onSessionParallelPrompt: function(session){
        var me      = this,
            prompt  = Ext.create('App.view.widget.ParallelPrompt').show();

        prompt.setValue(session.parallel);
        prompt.down('button[name=save]').on('click',function(){
            me.onSetSessionParallel(session.id,prompt.getValue());
            prompt.close();
        });
    },

    onDisplayAllSessions: function(){
        this.getAllSessions().show();
    },

    onSetSessionParallel: function(id,parallel,o){
        var cb = function(b){
            if(b=='ok'){
                AsyncSession.setParallel(id,parallel,o);
            }
        };
        Message.ext.ask(cb);
    },

    onDisplaySessionView : function(s){
        this.getSession().view(s);
    },

    onPlaySession : function(s,o){
        var cb = function(b){
            if(b=='ok'){
                AsyncSession.play(s,o);
            }
        };
        Message.ext.ask(cb);
    },

    onReplaySession : function(s,o){
        var cb = function(b){
            if(b=='ok'){
                AsyncSession.replay(s,o);
            }
        };
        Message.ext.ask(cb);
    },

    onPauseSession: function(s,o){
        var cb = function(b){
            if(b=='ok'){
                AsyncSession.pause(s,o);
            }
        };
        Message.ext.ask(cb);
    },

    onDeleteSession: function(o){
        var options = {};

        if(_.isString(o)){
            options.force = false;
            options.id = o;
        }else{
            options = o;
        }


        if(!options.force){
            var text =
                'This action <b>CANNOT</b> be undone. This will permanently delete the <br>' +
                '<b>{}</b> {}, session and task instances of it';

            var sessionName =
                    Ext.getStore(Constants.Store.SESSION).getById(options.id).get('shortName'),

                be = {
                    name        : 'deletesession',
                    objectType  : 'session',
                    objectName  : sessionName,
                    text        : text,
                    options     : options
                };
            this.fireEvent('deleteintercept',be,{validate:false});
        }else{
            AsyncSession.destroy(options.id);
        }

    }

});