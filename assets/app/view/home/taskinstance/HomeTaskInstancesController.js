Ext.define('App.view.home.taskinstance.HomeTaskInstancesController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.hometaskinstances',


    requires: [
    ],

    listen : {
        controller: {
            '*' : {
                'schedulerselect': function(schedulerId){
                    this.lookupReference('Sessions').clear();
                    var g = this.lookupReference('HomeTaskInstances');
                    g.store.removeAll();
                    g.hide();
                },
                'navsessionselect': function(sessionId){

                    if(!sessionId){
                        return;
                    }
                    var combo  = this.lookupReference('Sessions'),
                        record =
                            Ext.getStore(Constants.Store.SESSION).getById(sessionId);

                    if(record){
                        var status = record.get('status');
                        combo.setValue(sessionId);
                        combo.setStatusStyle(status);
                        this.lookupReference('HomeTaskInstances').setVisible(true);
                    }
                }
            }
        }
    },


    onSelectionChange: function(g, r){
        this.lookupReference('TaskGear').setDisabled(r.length<=0);
    },

    onReloadTaskInstances : function(){
        Ext.getStore(Constants.Store.SESSION).load();
        Ext.getStore(Constants.Store.TASK_INSTANCE).load();
    },

    onDisplayLogs: function(t){
        this.fireEvent('displaytaskinstancelogs',t)
    },

    onTaskInstancesMenu : function(e){
        var me= this,
            o = {
                view    : me.lookupReference('HomeTaskInstances'),
                event   : e
            };
        this.fireEvent('displaytaskinstancesmenu',o);
    },

    onTaskInstanceMenu : function(grid,rowIndex,e,r){

        var me      = this,
            o = {
                view    : grid,
                event   : e,
                record  : r
            };
        this.fireEvent('displaytaskinstancemenu',o);

    },

    showPredecessors : function(p,xy){

        if(_.isEmpty(p)){
            return;
        }
        var me = this;
        var im = function(i){
            return {
                text : i.task.name,
                name : i.id,
                iconCls : Constants.Icon.getIconClsByStatus(i.status, i.excluded)
            };
        };
        var items = _.map(p,im);
        var m = Ext.create('Ext.menu.Menu',{items:items});
        m.showAt(xy);

        var onPredecessorClick = function(m,i){
            me.fireEvent('displaytaskinstanceview',i.name);
        };

        m.on('click',onPredecessorClick);
    },


    _deselectAll: function(){
        var me = this;
        return o = {
            cb : {
                always:function(){
                    me.lookupReference('HomeTaskInstances').getSelectionModel().deselectAll();
                }
            }
        };
    },

    onSearchTask : function(text){

        text = text ? text.toUpperCase():text;

        var s = this.lookupReference('HomeTaskInstances').store;
        s.removeFilter('searchFilter');
        s.addFilter({
            id       : 'searchFilter',
            filterFn : function(rec) {
                var reg = new RegExp( ".*{0}.*".format(text) );
                if(    !text
                    || reg.test((rec.get('name')).toUpperCase())
                    || reg.test((rec.get('script')).toUpperCase()) ) {
                    return true;
                }

                return false;
            }});
    }

});