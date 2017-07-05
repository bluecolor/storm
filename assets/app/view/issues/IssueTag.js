Ext.define('App.view.issues.IssueTag',{
    extend: 'Ext.window.Window',
    xtype : 'issuetag',

    requires: [
        'App.view.issues.IssueTagModel',
        'App.view.issues.IssueTagController',
        'App.view.pool.list.BasicList',
        'App.view.pool.button.RefreshButton'
    ],

    controller  : 'issuetag',
    viewModel   : 'issuetag',

    height      : 550,
    width       : 450,

    layout      : 'fit',

    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    minWidth    : 300,
    minHeight   : 200,
    closeAction : 'destroy',
    title       : 'Tags',

    tbar: {
        name : 'tbar',
        items: [
            {
                xtype:'refreshbutton',
                handler: function(){
                    Ext.getStore(Constants.Store.ISSUE_TAG).reload();
                }
            },'-',
            {
                xtype: 'textfield',
                flex : 1,
                enableKeyEvents: true,
                emptyText: 'Add tag ...',
                listeners: {
                    keyup: function(f,e){
                        var tags = Ext.getStore(Constants.Store.ISSUE_TAG).getRawData(),
                            tag  = _.trim(f.getValue()),
                            exists = false,
                            color  = '#2A2729';

                        for(var i=0; i< tags.length; i++){
                            if(tags[i].tag.toUpperCase() === tag.toUpperCase()){
                                exists = true;
                                break;
                            }
                        }
                        color = exists ? 'red':color;

                        $("#{0}-inputEl".format(f.getId()))
                            .css('color',color)
                            .css('font-weight','bold');

                        if(!exists && e.keyCode == 13){
                            this.lookupController().onAddTag(tag);
                            this.setValue('');
                        }
                    }
                }
            }
        ]
    },

    items: [
        {
            scrollable: true,
            xtype  : 'basiclist',
            bind   : {store:'{issueTags}'},
            columns: [
                {
                    name: 'tag',
                    dataIndex: 'tag',
                    flex: 1
                },
                {
                    name: 'issueCount',
                    dataIndex: 'issueCount'
                },
                {
                    name    : 'edit',
                    xtype   : 'actioncolumn',
                    iconCls : 'x-hidden',
                    icon    : 'resources/img/pencil-16.png',
                    sortable: false,
                    resizable : false,
                    width   : 30,
                    menuDisabled : true,
                    handler : 'onEditTag'
                },
                {
                    name    : 'delete',
                    xtype   : 'actioncolumn',
                    icon    : 'resources/img/minus-16.png',
                    iconCls : 'x-hidden',
                    sortable: false,
                    resizable : false,
                    tooltip : 'Remove tag',
                    width   : 30,
                    menuDisabled : true,
                    handler : 'onRemoveTag'
                }
            ]
        }
    ],


    display:  function(){
        var me = this;
        return me.show();
    }

});