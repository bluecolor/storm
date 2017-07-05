Ext.define('App.view.session.AllSessionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.allsessions',

    onReloadSessions: function(){
        var s = Ext.getStore(Constants.Store.SESSION);
        s.load();
    },

    /* todo check out if this is a bug */
    onSearchSession: function(f,text){
        var me = this,
            s = me.lookupReference('AllSessionsGrid').store;

        if(text){
            text = text.toUpperCase();
        }
        s.removeFilter('searchFilter');
        s.addFilter({
            id       : 'searchFilter',
            filterFn : function(rec) {
                var reg = new RegExp( ".*{0}.*".format(text) );
                if(    !text
                    || reg.test((rec.get('name')).toUpperCase())
                    || reg.test((rec.get('shortName')).toUpperCase())
                ) {
                    return true;
                }

                return false;
            }});
    },

    onSessionMenu : function(g,ri,e,r){
        this.fireEvent('displaysessionmenu',r.data, e);
    },

    onParallelLevel: function(session){
        var me=this,p = Ext.create('App.view.widget.ParallelPrompt').show();
        p.setValue(session.parallel);
        p.down('button[name=save]').on('click',function(){
            var parallel = p.getValue();
            me.fireEvent('setsessionparallel',session.id,parallel);
            p.close();
        });
    },

    onReplaySession: function(session){
        this.fireEvent('replaysession',session);
    },

    onPlaySession: function(session){
        this.fireEvent('playsession',session);
    },

    onPauseSession: function(session){
        this.fireEvent('pausesession',session);
    },

    onDeleteSession: function(session){
        this.fireEvent('deletesession',session);
    }





});