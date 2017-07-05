Ext.define('App.view.reports.owner.OwnerReportController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.ownerreport',

    onReload: function(){
        this.lookupReference('OwnerList').store.load();
    },

    onCloseReports: function(){
        this.fireEvent('closereports');
    },

    onSearchOwner: function(text){
        text = text.toUpperCase();

        var s = this.lookupReference('OwnerList').store;
        s.removeFilter('searchFilter');
        s.addFilter({
            id       : 'searchFilter',
            filterFn : function(rec) {
                var reg = new RegExp( ".*{0}.*".format(text) );
                if( !text
                    || reg.test((rec.get('name')).toUpperCase())
                    || reg.test((rec.get('username')).toUpperCase())
                    || reg.test((rec.get('email')).toUpperCase()) ) {
                    return true;
                }

                return false;
            }});
    }

});