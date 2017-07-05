Ext.define('App.view.settings.password.AppPasswordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.apppassword',

    onSavePassword: function(){
        var v = this.getView().getValues();
        this.fireEvent('savepassword',v);
    }

});