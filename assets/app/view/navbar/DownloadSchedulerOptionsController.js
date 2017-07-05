Ext.define('App.view.navbar.DownloadSchedulerOptionsController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.downloadscheduleroptions',

    onOptionSelectionChange: function(cg,v){
        var b = this.lookupReference('DownloadButton');
        b.setDisabled(_.isEmpty(v));
    },

    checkAll: function(){
        var c = this.lookupReference('Options');
        c.items.items.forEach(function(item){
            item.setValue(true);
        });
    },

    unCheckAll: function(){
        var c = this.lookupReference('Options');
        c.items.items.forEach(function(item){
            item.setValue(false);
        });
    },

    onDownloadScheduler: function(){
        var o = this.lookupReference('Options').getValue();
        this.fireEvent('downloadscheduler',o)
    }

});