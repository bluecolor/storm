Ext.define('App.view.issues.IssueTagModel',{
    extend: 'Ext.app.ViewModel',
    alias : 'viewmodel.issuetag',

    stores: {
        issueTags: {
            source: 'IssueTagStore'
        }

    }

});