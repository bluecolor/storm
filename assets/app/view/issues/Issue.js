Ext.define('App.view.issues.Issue',{
    extend: 'Ext.form.Panel',
    xtype : 'issue',

    requires: [
    ],

    defaults: {
        anchor     : '100%',
        labelAlign : 'left'
    },
    bodyPadding: 10,
    tbar : {
        name: 'tbar',
        items: [
            {
                name    : 'back',
                iconCls : 'back',
                tooltip : 'Back to users',
                handler : 'onIssues'
            },
            {
                name    : 'save',
                tooltip : 'Save',
                iconCls : 'save',
                formBind: true,
                handler : 'onSaveIssue'
            }
        ]
    },
    reference: 'Issue',
    
    items: [
        {
            name        : 'id',
            xtype       : 'hidden'
        },
        {
            name        : 'title',
            xtype       : 'textfield',
            fieldLabel  : 'Title'
        },
        {height:10},
        {
            fieldLabel: 'Issue',
            name : 'body',
            xtype: 'textarea',
            grow : true,
            resizable: true,
            growMax: 200
        },
        {height:10},
        {
            xtype : 'fieldcontainer',
            layout: 'hbox',
            fieldLabel: 'Tags',
            flex: 1,
            items : [
                {
                    flex: 1,
                    xtype: 'tagfield',
                    queryMode: 'local',
                    displayField: 'tag',
                    valueField: 'id',
                    bind : {
                        store: '{tags}'
                    }

                },
                {
                    tooltip: 'Create Tag',
                    xtype  : 'button',
                    iconCls: 'plus',
                    style  : {
                        borderLeft  : 0,
                        borderRadius: 0,
                        borderColor : "#CECECE",
                        backgroundColor: 'white'
                    },
                    handler: 'onShowIssueTag'
                }
            ]
        },
        {height:10},
        {
            xtype   : 'checkbox',
            boxLabel: 'Answer your own issue',
            listeners: {
                change: function(c,v){
                    this.up('panel').down('textarea[name=answer]').setVisible(v);
                }
            }
        },
        {height:10},
        {
            fieldLabel: 'Answer',
            name      : 'answer',
            xtype     : 'textarea',
            grow      : true,
            resizable : true,
            growMax   : 200,
            hidden    : true
        }
    ],

    getValues: function(){
        var issue = {
            tags    : [],
            title   : undefined,
            body    : undefined,
            answer  : undefined
        };

        issue.tags  = this.down('tagfield').getValue();
        issue.title = this.down('[name=title]').getValue();
        issue.body  = this.down('[name=body]').getValue();
        issue.answer= this.down('[name=answer]').getValue();

        return issue;
    }


});