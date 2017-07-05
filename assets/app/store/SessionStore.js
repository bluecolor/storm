Ext.define('App.store.SessionStore', {
    extend: 'App.store.BaseStore',

    id          : 'SessionStore',
    alias       : 'store.SessionStore',
    model       : 'App.model.SessionModel',
    autoLoad    : false,

    schedulerId : undefined,

    proxy : {
        api : {
            create  : 'session',
            read    : 'session',
            update  : 'session',
            destroy : 'session'
        }
    },

    sorters : [
        {
            property: 'date',
            direction:'DESC'
        }
    ],


    displayField    : 'date',
    createSuccess   : 'Created session',
    createError     : 'Failed to create session',

    updateSuccess   : 'Updated session',
    updateError     : 'Failed to update session',

    deleteSuccess   : 'Deleted session',
    deleteError     : 'Failed to delete session',

    setScheduler: function(schedulerId){
        this.schedulerId = schedulerId;
        if(!schedulerId){
            this.schedulerId = App.lib.Session.getSchedulerId();
        }
        this.proxy.api.read = 'session/scheduler/{}'.format(this.schedulerId);
    },

    loadStore : function(schedulerId,callback){
        this.setScheduler(schedulerId);
        this.load(callback);
    },

    findLastSessionOfPlan: function(planId){
        var me = this,
            s = _.chain(me.getRawData()).orderBy('date',['desc']).value();

        if(!_.isEmpty(s)){
            return s[0].id;
        }
    }


});