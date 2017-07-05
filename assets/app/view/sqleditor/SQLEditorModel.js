Ext.define('App.view.sqleditor.SQLEditorModel',{
    extend: 'Ext.app.ViewModel',
    alias : 'viewmodel.sqleditor',
    
    stores: {
        connections: {
            source : App.lib.Constants.Store.CONNECTION,
            filters: [
                function(con) {
                    return con.get('connectionType') == 'DB';
                }
            ]
        }
    }
    
});