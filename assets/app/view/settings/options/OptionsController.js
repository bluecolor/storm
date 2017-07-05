Ext.define('App.view.settings.options.OptionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.options',

    changeOptions: function(){
        this.lookupReference('SaveButton').setDisabled(false);
    },

    onSaveOptions: function(){
        var o = this.getView().getValues();
        this.fireEvent('saveoptions',o);
    }

});
