Ext.define('App.view.settings.connection.ConnectionController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.connection',

    onShowConnection : function(){
        var s = Ext.getStore(Constants.Store.CONNECTION);
        if(s.count() == 0){
            var b = this.lookupReference('AddConnectionButton').getId();
            $("#{}".format(b)).addClass('animated bounceOut')
                .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass('animated bounceOut');
                });
        }
    },

    onTestConnection : function() {
        var con = this.lookupReference('ConnectionDetail').getValues();
        this.fireEvent('testconnection',con);
    },

    onSearchConnection : function(f,v) {
        var text = v.toUpperCase(),
            store= Ext.getStore(Constants.Store.CONNECTION);

        try {
            store.removeFilter('searchFilter');
        } catch (except){
            console.log(except);
        }


        store.addFilter({
            id       : 'searchFilter',
            filterFn : function(rec) {
                var url     = '',
                    username= '',
                    reg     = new RegExp( ".*{0}.*".format(text) );

                if(rec.get('username')){
                    username = rec.get('username').toUpperCase();
                }
                if(rec.get('url')){
                    url = rec.get('url').toUpperCase();
                }

                if(    !text
                    || reg.test((rec.get('name')).toUpperCase())
                    || reg.test(username)
                    || reg.test(url)) {
                    return true;
                }
                return false;
            }});
    },

    onClear : function(){
        this.lookupReference('ConnectionDetail').clear();
    },


    onAddConnection : function(){
        this.lookupReference('ConnectionDetail')
            .clear()
            .setRadOnly(false);
    },



    onDeleteConnection : function(c){
        this.fireEvent('deleteconnection',c);
    },


    onSaveConnection : function() {
        var event,me=this,c = this.getView().getValues();

        event = _.isEmpty(c.id) ? 'createconnection' : 'updateconnection';
        me.fireEvent(event,c);
    },


    onReloadConnections : function(){
        Ext.getStore(Constants.Store.CONNECTION).load();
    },

    onSideMenuToggle : function(b, s){
        this.lookupReference('ConnectionList').setVisible(s);
    },

    onDisplayConnectionView : function(c){
        this.fireEvent('displayconnectionview',c);
    },
    onDisplayConnectionEdit : function(c){
        this.fireEvent('displayconnectionedit',c);
    },

    onDisplayConnectionCreate : function(){
        this.fireEvent('displayconnectioncreate');
    },

    onConnectionType: function(type){
        var v = this.getView(),
            visible = type.toUpperCase() != Constants.ConnectionType.LOCAL,
            disabled= !visible;

        v.down('[name=username]').setVisible(visible);
        v.down('[name=password]').setVisible(visible);
        v.down('[name=url]').setVisible(visible);
        v.down('[name=port]').setVisible(visible);

        v.down('[name=username]').setDisabled(disabled);
        v.down('[name=password]').setDisabled(disabled);
        v.down('[name=url]').setDisabled (disabled);
        v.down('[name=port]').setDisabled(disabled);

    }


});
