Ext.define('App.controller.ParameterController',{
    extend: 'Ext.app.Controller',

    views : [
        'App.view.settings.parameter.Parameter'
    ],

    refs : [
        {
            ref         : 'parameter',
            xtype       : 'parameter',
            autoCreate  : true,
            selector    : 'parameter'
        }
    ],


    init: function() {

        this.listen({
            controller: {
                '*': {
                    'displayparameterview'  : this.onDisplayParameterView,
                    'displayparameteredit'  : this.onDisplayParameterEdit,
                    'displayparametercreate': this.onDisplayParameterCreate,
                    'createparameter' : this.onCreateParameter,
                    'updateparameter' : this.onUpdateParameter,
                    'deleteparameter' : this.onDeleteParameter
                }
            }
        });
    },

    onDisplayParameterView  : function(p){
        this.getParameter().view(p);
    },
    onDisplayParameterEdit  : function(p){
        this.getParameter().edit(p);
    },
    onDisplayParameterCreate: function() {
        this.getParameter().create();
    },

    onCreateParameter : function(p,o){
        AsyncParameter.create(p,o);
    },
    onUpdateParameter : function(p,o){
        AsyncParameter.update(p,o);
    },
    onDeleteParameter : function(p){
        var cb = function(b){
            if(b=='ok'){
                AsyncParameter.destroy(p);
            }
        };
        Message.ext.ask(cb);
    }

});