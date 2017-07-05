Ext.define('App.view.plan.PlanMenu', {
    extend: 'Ext.menu.Menu',
    xtype : 'planmenu',

    items : [
        {
            name : 'view',
            text : 'View'
        },
        {
            name : 'edit',
            text : 'Edit'
        },
        {
            name : 'delete',
            text : 'Delete',
            iconCls: 'delete'
        },'-',
        {
            name : 'activate',
            text : 'Activate'
        },
        {
            name : 'deactivate',
            text : 'Deactivate',
            iconCls : 'cancel'
        },'-',
        {
            name : 'protect',
            text : 'Protect',
            iconCls : 'shield'
        },
        {
            name : 'unprotect',
            text : 'Remove Protection'
        },'-',
        {
            name : 'newTask',
            text : 'New Task',
            iconCls: 'plus'
        },'-',
        {
            name : 'more',
            text : 'More',
            menu : [
                {
                    name: 'validate',
                    text: 'Validate',
                    handler: function(){
                        var m = this.up('planmenu');
                        m.fireEvent('click',m,this);
                    }
                },'-',
                {
                    name: 'uploadTasks',
                    text: 'Upload Tasks',
                    handler: function(){
                        var m = this.up('planmenu');
                        m.fireEvent('click',m,this);
                    }
                },
                {
                    name: 'downloadTasks',
                    text: 'Download Tasks',
                    handler: function () {
                        var m = this.up('planmenu');
                        m.fireEvent('click',m,this);
                    }
                }
            ]
        }

    ]

});