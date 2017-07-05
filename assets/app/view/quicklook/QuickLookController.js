Ext.define('App.view.quicklook.QuickLookController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.quicklook',

    requires : [
    ],

    listen : {
        controller :{
            '*' : {
                'sessionselect' : function(sid){
                    this.onSessionSelect(sid);
                }
            }
        }
    },

    onCollapseQuickLook: function(){
        this.getView().collapse();
    },

    onSessionSelect : function(sid){
        var v = this.lookupReference('SessionSnapshotGrid')
            ,s = v.store
            ,r = v.getSelectionModel().getSelection();


        if(!_.isEmpty(r) && r[0].get('id')===sid) {
            /* already selected */
            return;
        }

        r = s.getById(sid);

        v.getSelectionModel().deselectAll(true);
        if(r){
            v.getSelectionModel().select(r);
        }

    },

    onReloadQuickLookSessions : function(){
        Ext.getStore(Constants.Store.SESSION).load();
    },

    onSessionMenu : function(g,ri,e,r){
        this.fireEvent('displaysessionmenu',r.data,e);
    },

    onDisplayTaskInstances : function(sid,status){
        this.fireEvent('navsessionselect',sid,status);
    }


});

