Ext.define('App.view.issues.IssueTagController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.issuetag',

    onEditTag: function(g, ri, ci,i ,e, r){
        
    },

    onAddTag: function(tag){
        this.fireEvent('createissuetag',{tag:tag});
    },

    onRemoveTag: function(g, ri, ci,i ,e, r){
        this.fireEvent('removeissuetag',r.get('id'));
    }


});