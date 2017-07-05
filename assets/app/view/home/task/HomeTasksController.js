Ext.define('App.view.home.task.HomeTasksController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.hometasks',

    requires: [
        'App.view.task.TaskMenu'
    ],

    mixins: [
        'App.view.task.TaskGridControllerMixin'
    ],

    listen : {
        controller: {
            '*': {
                'schedulerselect': function (schedulerId) {
                    this.onSchedulerSelect(schedulerId);
                }
            }
        }
    },

    onSchedulerSelect: function(){
        var plans = this.lookupReference('Plans');
        plans.setValue('');
    },


    onUploadTask: function(){
        this.fireEvent('uploadtask');
    },

    onNewTask: function(){
        var planId = this.lookupReference('Plans').getValue();
        this.fireEvent('displaytaskcreate',planId);
    },


    onTaskMenu : function(grid,rowIndex,e,r){
        var me      = this,
            view    = me.lookupReference('HomeTasks'),
            o = {
                view    : view,
                event   : e,
                record  : r
            };

        this.fireEvent('displaytaskmenu',o);
    },

    onTasksMenu: function(b,e){

        var me      = this,
            view    = me.lookupReference('HomeTasks'),
            records = view.getSelectionModel().getSelection(),
            o = {
                view    : view,
                event   : e,
                records : records
            };

        this.fireEvent('displaytasksmenu',o);
    },

    onSelectionChange: function(g, r){
        this.lookupReference('TaskGear').setDisabled(r.length==0);
    },

    onHomePlanSelect: function(c,plan){
        var t = this.lookupReference('HomeTasks');
        t.setVisible(true);
        Ext.getStore(Constants.Store.TASK).loadStore(plan.get('id'));
    },

    onSearchTask : function(text){

        text = text ? text.toUpperCase():text;

        var s = this.lookupReference('HomeTasks').store;
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