Ext.define('App.view.settings.connection.ConnectionModel',{
    extend : 'Ext.app.ViewModel',
    alias  : 'viewmodel.connection',


    data : {
        connectionType: 'SSH',
        db : {
            emptyText : 'jdbc:oracle:thin:@<host>:<port>:<service_name>',
            urlLabel  : 'Jdbc Url'
        },
        ssh: {
            emptyText : 'IP or HostName',
            urlLabel  : 'Host'
        },
        local: {

        }
    },

    formulas: {
        urlEmptyText : function (get) {
            var t = get('connectionType');

            switch(t){
                case 'SSH' : return get('ssh').emptyText;
                case 'DB'  : return get('db').emptyText;
            }
            return get('ssh').emptyText;
        },
        urlLabel : function (get) {
            var t = get('connectionType');

            switch(t){
                case 'SSH' : return get('ssh').urlLabel;
                case 'DB'  : return get('db').urlLabel;
            }
            return get('ssh').urlLabel;
        },
        portHidden : function(get){
            return get('connectionType') != 'SSH';
        }
    },


    stores : {
        connections: {
            source: 'ConnectionStore'
        }
    }

});