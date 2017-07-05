Ext.define('App.lib.Util', {
    singleton: true,
    alternateClassName: ['Util'],


    getParams : function(p) {
        var params = undefined;
        if(!p) {
            try {
                params = $.param(p, true);
            } catch (except) {
                params = undefined;
            }
        }
        return params ? '?{0}'.format(params) : '';

    },

    getConnectionBySch: function(sch){
        sch = sch?sch:Session.getScheduler().id;

        var s = Ext.getStore(Constants.Store.SCHEDULER),
            r = s.getById(sch);

        if(r){
            return r.data.connection;
        }
    }

});