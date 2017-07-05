Ext.define('App.controller.ConnectionController',{
    extend: 'Ext.app.Controller',

    views : [
        'App.view.settings.connection.Connection'
    ],

    refs : [
        {
            ref         : 'connection',
            xtype       : 'connection',
            autoCreate  : true,
            selector    : 'connection'
        }
    ],


    init: function() {

        this.listen({
            controller: {
                '*': {
                    'displayconnectionview'  : this.onDisplayConnectionView,
                    'displayconnectionedit'  : this.onDisplayConnectionEdit,
                    'displayconnectioncreate': this.onDisplayConnectionCreate,
                    'createconnection'  : this.onCreateConnection,
                    'updateconnection'  : this.onUpdateConnection,
                    'deleteconnection'  : this.onDeleteConnection,
                    'testconnection'    : this.onTestConnection
                }
            }
        });
    },

    onTestConnection: function(c){
        Message.ext.showWait();
        var promise = AsyncConnection.test(c);
        promise.success(function(){
            Message.growl.success('Connection successful');
        }).error(function(){
            Message.growl.error('Connection error');
        }).always(function(){
            Ext.MessageBox.hide();
        });
    },

    onDisplayConnectionView  : function(c){
        this.getConnection().view(c);
    },
    onDisplayConnectionEdit  : function(c){
        this.getConnection().edit(c);
    },
    onDisplayConnectionCreate: function() {
        this.getConnection().create();
    },

    onCreateConnection : function(c,o){
        AsyncConnection.create(c,o);
    },
    onUpdateConnection : function(c,o){
        AsyncConnection.update(c,o);
    },

    onDeleteConnection : function(c){
        var cb = function(b){
            if(b=='ok'){
                AsyncConnection.destroy(c);
            }
        };
        Message.ext.ask(cb);
    }



});
