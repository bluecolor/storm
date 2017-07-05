Ext.define('App.view.home.group.HomeGroupsModel',{
    extend  : 'Ext.app.ViewModel',
    alias   : 'viewmodel.homegroups',
    
    stores : {
        groups: {
            source: Constants.Store.GROUP
        }
    }

});