Ext.define('App.view.issues.IssuesModel',{
    extend: 'Ext.app.ViewModel',
    alias : 'viewmodel.issues',
    
    stores: {
        tags: {
            source: Constants.Store.ISSUE_TAG
        }
    }
    
});