Ext.define('App.view.taskinstance.TaskInstanceController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.taskinstance',

    requires: [
    ],

    listen: {
        controller: {
            '*' : {
            }
        }
    },

    onDisplayTask: function(){
        var task = this.getView().task;
        if(!task){
            Message.growl.warn("Unable to find task!");
        }else{
            this.fireEvent('displaytaskview',task.id);
        }
    },

    loadLogs: function(g){
        var me=this,
            id=me.lookupReference('taskInstanceId').getValue(),
            s= me.getStore('logs');
        s.loadStore(id);
    },

    onAddPredecessor : function(c, r) {
        var s = this.lookupReference('TaskInstancePredecessors').store;
        if(s.findExact('id',r.get('id')) === -1) {
            s.insert(0,r);
        }
        c.reset();
    },

    onRemovePredecessor : function(r) {
        var s = this.lookupReference('TaskInstancePredecessors').store;
        _.each(r, function(id){
            s.removeAt(s.findExact('id',id));
        });
    },

    onSaveTaskInstance: function(){
        var v  = this.getView(),
            instance = v.getValues();
        var o = {
            cb : {
                success : function(){
                    v.close();
                }
            }
        };

        var techCon = function(){
            var result = {
                tech    : instance.technology,
                conType : undefined,
                valid   : false
            };


            var connection=
                    Ext.getStore(Constants.Store.CONNECTION).getById(instance.connection),
                connectionType = connection.get('connectionType');

            result.conType = connectionType;
            result.valid =
                Constants
                    .ConnectionType
                    .getTechByConnectionType(connectionType)
                    .indexOf(result.tech)>=0 || !result.tech;
            return result;
        }();
        if(!techCon.valid){
            Message.growl.warn(
                'Technology:{} is NOT supported by ConnectionType:{}'
                    .format(techCon.tech,techCon.conType)
            );
            return;
        }
        
        this.fireEvent('updatetaskinstance',instance,o);
    },

    onDisplayScriptEditor: function(){
        var me = this,
            editor = this.lookupReference('TaskInstanceScript').down('aceeditor'),
            script = editor.getValue(),
            o = {
                editor      : editor,
                technology  : me.lookupReference('TechnoCombo').getValue() 
            };


        this.fireEvent('displayscripteditor',script,o);
    }


});
