Ext.define('App.view.reports.owner.OwnerReportModel',{
    extend : 'Ext.app.ViewModel',
    alias  : 'viewmodel.ownerreport',

    stores: {
        owners: {
            autoLoad: true,
            fields: [
                {
                    name: 'owner',
                    type: 'auto'
                },
                {
                    name: 'owned',
                    type: 'auto'
                },
                {
                    name: 'username',
                    type: 'string',
                    calculate: function(r){
                        return r.owner.username;
                    }
                },
                {
                    name: 'name',
                    type: 'string',
                    calculate: function(r){
                        return r.owner.name;
                    }
                },
                {
                    name: 'email',
                    type: 'string',
                    calculate: function(r){
                        return r.owner.email;
                    }
                },
                {
                    name: 'ownedTaskCount',
                    type: 'int',
                    calculate: function(r){
                        return r.owned.taskCount
                    }
                }
            ],
            proxy : {
                type: 'ajax',
                url: '/user/taskOwners',
                reader: {
                    type: 'json'
                }
            },
            sorters : [
                {
                    property: 'name',
                    direction:'ASC'
                }
            ]
        }
    }

});