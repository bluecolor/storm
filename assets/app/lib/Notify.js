Ext.define('App.lib.Notify',{
    singleton: true,
    alternateClassName: ['_Notify'],

    error: function(err){
        var n = {
            title   : err.title,
            body    :  err.body,
            icon    : 'resources/img/bell-red.png',
            notifyClick: err.notifyClick
        };

        this.notify(n);
    },

    info: function(err){
        var n = {
            title: err.title,
            body: err.body,
            icon: 'resources/img/info.png'
        };

        this.notify(n);
    },


    notify: function(n){

        var deno = new Notify(n.title,{
            body: n.body,
            icon: n.icon,
            notifyClick: n.notifyClick
        });

        var onPermissionGranted = function(){
            deno.show();
        };

        var onPermissionDenied = function(){
            console.log('Permission not granted for notifications!');
        };

        if (!Notify.needsPermission) {
            deno.show();
        } else if (Notify.isSupported()) {
            Notify.requestPermission(onPermissionGranted, onPermissionDenied);
        }
    }


});