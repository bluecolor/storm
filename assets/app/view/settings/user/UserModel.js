Ext.define('App.view.settings.user.UsersModel', {

    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.user',

    data: {
        title: 'User'
    },

    stores: {
        users: {
            source: 'UserStore'
        },
        userTasks: {
            autoLoad: false,
            groupField: 'primaryGroupName',
            model : 'App.model.TaskModel',
            proxy : {
                type: 'ajax',
                _url: '/task/owner/{}',
                reader: {
                    type: 'json'
                }
            },
            sorters : [
                {
                    property    : 'name',
                    direction   : 'ASC'
                }
            ],
            loadStore: function(userId){
                this.proxy.url = this.proxy._url.format(userId);
                this.load();
            }
        }
    }

});
