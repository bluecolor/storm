Ext.define('App.view.issues.IssuesController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.issues',

    onNewIssue: function(){
        this.getView().getLayout().setActiveItem(1);
    },

    onIssues: function(){
        this.getView().getLayout().setActiveItem(0);
    },

    onSaveIssue: function(){
        var issue = this.lookupReference('Issue').getValues();
        console.log(issue);
    },

    onShowIssueTag: function () {
        this.fireEvent('showissuetag');
    }

});