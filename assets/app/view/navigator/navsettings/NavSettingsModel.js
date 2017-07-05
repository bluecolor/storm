Ext.define('App.view.navigator.navsettings.NavSettingsModel',{
    extend  : 'Ext.app.ViewModel',
    alias   : 'viewmodel.navsettings',
    data: {
        title : 'Settings'
    },

    stores : {
        list : {

            autoLoad: true,
            type    : 'tree',
            root: {
                expanded: true
            },
            fields: [
                {name : 'val',  type : 'string'},
                {name : 'name', type : 'string'},
                {name : 'img' , type : 'string'}
            ],
            data  : [
                {
                    val     : Constants.ID.Settings.options,
                    name    : 'Options',
                    img     : "resources/img/control-16.png"
                },
                {
                    val     : Constants.ID.Settings.password,
                    name    : 'Change Password',
                    img     : "resources/img/key-16.png"
                },
                {
                    val     : Constants.ID.Settings.system,
                    name    : 'Application Settings',
                    img     : "resources/img/advanced-16.png"
                },
                {
                    val     : Constants.ID.Settings.connections,
                    name    : 'Connections',
                    img     : "resources/img/connected-16.png"
                },
                {
                    val     : Constants.ID.Settings.schedulers,
                    name    : 'Schedulers',
                    img     : "resources/img/alarm-clock-16.png"
                },
                {
                    val     : Constants.ID.Settings.parameters,
                    name    : 'Parameters',
                    img     : "resources/img/hash-16.png"
                },
                {
                    val     : Constants.ID.Settings.users,
                    name    : 'Users',
                    img     : "resources/img/user-16.png"
                }
            ]
        }
    }

});
