Ext.define('App.controller.ScriptEditorController',{
    extend: 'Ext.app.Controller',

    views : [
        'App.view.scripteditor.ScriptEditor',
        'App.view.scripteditor.options.General'
    ],

    refs : [
        {
            ref         : 'scriptEditor',
            xtype       : 'scripteditor',
            autoCreate  : true,
            selector    : 'scripteditor'
        },
        {
            ref         : 'scriptEditorGeneralOptions',
            xtype       : 'scripteditorgeneraloptions',
            autoCreate  : true,
            selector    : 'scripteditorgeneraloptions'
        }
    ],


    init: function() {

        this.listen({
            controller: {
                '*': {
                    'displayscripteditor'   : this.onDisplayScriptEditor,
                    'displaygeneraloptions' : this.onDisplayGeneralOptions
                }
            }
        });
    },
    onDisplayGeneralOptions: function(){
        this.getScriptEditorGeneralOptions().display();
    },

    onDisplayScriptEditor: function(script,options){
        this.getScriptEditor().display(script,options);
    }
});
