Ext.define('App.view.task.TaskController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.task',

    requires: [

    ],

    listen: {
        component: {
        },

        controller: {
            '*' : {
            }
        }
    },

    onTechnoSelect: function(c,r){
        var tech = r.get('id');
        this.lookupReference('TaskScript').down('aceeditor').setMode(tech);
    },


    onDisplayScriptEditor: function(){
        var me = this,
            editor = this.lookupReference('TaskScript').down('aceeditor'),
            script = editor.getValue(),
            o = {
                editor: editor,
                technology: me.lookupReference('TechnoCombo').getValue()
            };


        this.fireEvent('displayscripteditor',script,o);
    },

    onMakeGroupPrimary : function(group, store){

        store.data.items.forEach(function(r){
            r.set('primary',(r.data.id == group.id));
        });

        store.commitChanges();
        Message.growl.success('Group {} made primary'.format(group.name));
    },

    onAddOwner : function(c, r){
        var s = this.lookupReference('TaskOwners').store;

        if(s.findExact('id',r.get('id')) === -1) {
            s.insert(0,r);
        }
        c.reset();
    },

    onRemoveOwner : function(g, ri, ci, i ,e, r) {
        var s = this.lookupReference('TaskOwners').store;
        var ix = s.findExact('id',r.get('id'));
        s.removeAt(ix);
    },

    onAddGroup : function(c, r){
        var s = this.lookupReference('TaskGroups').store;
        if(s.findExact('id',r.get('id')) === -1) {
            r.set('primary',s.count()==0);
            s.insert(0,r);
        }
        c.reset();
    },

    onRemoveGroup: function(g, ri, ci, i ,e, r){
        var s = this.lookupReference('TaskGroups').store;
        var ix = s.findExact('id',r.get('id'));
        s.removeAt(ix);
    },


    validateTask: function(task){

        var me  = this,
            v   = this.getView();


        if(_.chain(task.name).trim().isEmpty().value()){
            Message.growl.warn('Task must have a name!');
            v.down('tabpanel').setActiveTab(me.lookupReference('TaskDetail'));
            return false;
        }

        if(_.chain(task.script).trim().isEmpty().value()){
            Message.growl.warn('Script can not be empty!');
            v.down('tabpanel').setActiveTab(this.lookupReference('TaskScript'));
            return false;
        }

        if(_.isEmpty(task.groups)){
            v.down('tabpanel').setActiveTab(me.lookupReference('TaskGroups'));
            Message.growl.warn('Can not save task without group!');
            return false;
        }

        var techCon = function(){
            var result = {
                tech    : task.technology,
                conType : undefined,
                valid   : false
            };

            var plan = Ext.getStore(Constants.Store.PLAN).getById(task.plan);
            if(!plan){
                return result;
            }

            var scheduler =
                    Ext.getStore(Constants.Store.SCHEDULER).getById(plan.get('schedulerId')),
                connection=
                    Ext.getStore(Constants.Store.CONNECTION).getById(scheduler.get('connection')),
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
            v.down('tabpanel').setActiveTab(this.lookupReference('TaskScript'));
            Message.growl.warn(
                'Technology:{} is NOT supported by ConnectionType:{}'
                    .format(techCon.tech,techCon.conType)
            );
            return false;
        }

        return true;
    },

    onSaveTask : function(){
        var me  = this,
            v   = this.getView(),
            task= v.getValues();

        if(!me.validateTask(task)){
            return;
        }

        var o = {
             cb : {
                 success : function(){
                     v.close();
                 }
             }
        };

        if(!task.id){
            this.fireEvent('createtask',task,o);
        }else{
            this.fireEvent('updatetask',task,o);
        }
    },

    onAddPredecessor : function(c, r) {
        var s = this.lookupReference('TaskPredecessors').store;
        if(s.findExact('id',r.get('id')) === -1) {
            s.insert(0,r);
        }
        c.reset();
    },
    onRemovePredecessor : function(r) {
        var s = this.lookupReference('TaskPredecessors').store;
        _.each(r, function(id){
            s.removeAt(s.findExact('id',id));
        });
    },

    onExclude : function(r){
        this.onSetExcluded(true,r);
    },

    onInclude : function(r){
        this.onSetExcluded(false,r);
    },

    onSetExcluded : function(e,r){
        var ps = this.lookupReference('TaskPredecessors').store;
        _.each(r,function(t){
            ps.getById(t).set('excluded',e);
            ps.commitChanges();
        });
    }

});
