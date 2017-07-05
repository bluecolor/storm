Ext.define('App.view.intercept.DeleteInterceptController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.deleteintercept',

    onDelete: function(){
        var view = this.getView(),
            be   = view.baseEvent;

        view.close();
        be.options.force = true;
        this.fireEvent(be.name,be.options);
    }

});