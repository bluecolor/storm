Ext.define('App.view.task.TaskGridControllerMixin',{
    extend: 'Ext.Mixin',

    onReloadTasks : function(){
        Ext.getStore(Constants.Store.TASK).loadStore();
    },

    onSearchTask : function(text){

        text = text ? text.toUpperCase():text;

        var s = this.getView().store;
        s.removeFilter('searchFilter');
        s.addFilter({
            id       : 'searchFilter',
            filterFn : function(rec) {
                var reg = new RegExp( ".*{0}.*".format(text) );
                if(    !text
                    || reg.test((rec.get('name')).toUpperCase())
                    || reg.test((rec.get('script')).toUpperCase()) ) {
                    return true;
                }

                return false;
            }});
    }

});