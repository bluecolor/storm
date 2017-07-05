Ext.define('App.view.issues.Issues',{

    xtype : 'issues',
    extend: 'Ext.window.Window',

    requires: [
        'App.view.pool.textfield.SearchTextField',
        'App.view.issues.Issue',
        'App.view.issues.IssuesController',
        'App.view.issues.IssuesModel'
    ],

    controller  : 'issues',
    viewModel   : 'issues',


    height      : 550,
    width       : 700,

    modal       : false,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'card',
    closeAction : 'destroy',
    title       : 'Issues',

    items       : [
        {
            name    : 'issues',
            tbar    : {
                name : 'tbar',
                items: [
                    {
                        xtype: 'searchtextfield',
                        flex : 1
                    },
                    {
                        text : 'New Issue',
                        name : 'newIssue',
                        handler: 'onNewIssue'
                    }
                ]
            }
        },
        {
            name    : 'issue',
            xtype   : 'issue'
        }
    ],


    display: function(o){
        var me = this;
        me.show();
        return me;
    }

});