Ext.define('App.view.help.updatecheck.UpdateCheckModel',{
    extend: 'Ext.app.ViewModel',
    alias : 'viewmodel.updatecheck',

    stores: {
        changes: {
            fields:[
                {name:'text',type:'string'}
            ],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        }
    }

});