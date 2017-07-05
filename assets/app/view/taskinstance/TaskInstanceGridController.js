Ext.define('App.view.taskinstance.TaskInstanceGridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.taskinstancegrid',

    requires : [
    ],

    listen : {
        controller: {
            '*': {
                'searchtaskinstance': function(text){
                    this.onSearchTaskInstance(text);
                },
                'sessionselect': function (session) {
                    this.onSessionSelect(session);
                },
                'reloadtaskinstances' : function(){
                    this.onReloadTaskInstances();
                },
                'showtaskinstancesmenu' : function(e){
                    this.onTaskInstancesMenu(e);
                },
                'taskinstancestatusfilter' : function(s){
                    this.onStatusFilter(s);
                }
            }
        }
    },


    onSearchTaskInstance : function(text){
        var s = this.getView().store;
        s.removeFilter('searchFilter');

        if(text){
            text = text.toUpperCase();
        }


        s.addFilter({
            id       : 'searchFilter',
            filterFn : function(rec) {
                var reg = new RegExp( ".*{0}.*".format(text) );
                if( !text
                    || reg.test((rec.get('name')).toUpperCase())
                    || reg.test((rec.get('script')).toUpperCase()) ) {
                    return true;
                }
                return false;
            }});
    },

    onDisplayLogs: function(t){
        this.fireEvent('displaytaskinstancelogs',t)
    },

    onSessionSelect : function(sid){
        var s = Ext.getStore(Constants.Store.TASK_INSTANCE);
        s.loadStore(sid);
    },

    onStatusFilter : function(status){
        var me = this,
            store = me.getView().store;

        if(status && !_.isArray(status)){
            status = [status]
        }

        var filter =
            Ext.util.Filter({
                id      : 'StatusFilter',
                filterFn: function(r) {
                    if(store.isLoading() || !status || !status[0]){
                        return true;
                    }
                    return  r && (status.indexOf(r.get("status")) !== -1 || status.length === 0);
                }
            });

        store.on('filterchange',function(s){
            store.addFilter(filter);
        },me,{single:true});

        if(store.filters && store.filters.containsKey('StatusFilter')){
            store.removeFilter('StatusFilter');
        }else{
            store.addFilter(filter);
        }



    },

    onReloadTaskInstances : function(){
        var s = Ext.getStore(Constants.Store.TASK_INSTANCE);

        if(!s._getSessionId()){
            Message.growl.warning('No session selected!');
        }else{
            s.loadStore();
        }
    },

    onTaskInstancesMenu : function(e){
        var me      = this,
            o = {
                view    : me.getView(),
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
                    me.getView().getSelectionModel().deselectAll();
                }
            }
        };
    }

});