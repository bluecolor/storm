Ext.define('App.view.settings.parameter.ParameterController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.parameter',

    onReloadParameters : function(){
        Ext.getStore(Constants.Store.PARAMETER).load();
    },

    onSideMenuToggle : function(b,s){
        this.lookupReference('ParameterList').setVisible(s);
    },

    onCreateParameter : function(){
        this.fireEvent('displayparametercreate');
    },

    onSaveParameter : function(){
        var p = this.getView().getValues();

        if(p.id){
            this.fireEvent('updateparameter',p);
        }else{
            this.fireEvent('createparameter',p);
        }

    },

    onParameterDetail : function(p){
        this.fireEvent('displayparameterview',p);
    },

    onEditParameter : function(p){
        this.fireEvent('displayparameteredit',p);
    },

    onDeleteParameter: function(p){
        this.fireEvent('deleteparameter',p);
    }


});
