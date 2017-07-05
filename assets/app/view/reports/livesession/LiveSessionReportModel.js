Ext.define('App.view.reports.livesession.LiveSessionReportModel',{
    extend: 'Ext.app.ViewModel',
    alias : 'viewmodel.livesessionreport',

    stores: {
        taskInstances: {
            autoLoad: true,
            model   : 'App.model.TaskInstanceModel',
            groupField  : 'sessionName',
            proxy : {
                type: 'ajax',
                url : '/taskInstance/status/SUCCESS',
                _url: '/taskInstance/status/{}',
                reader: {
                    type: 'json'
                }
            },
            sorters : [
                {
                    property: 'name',
                    direction:'ASC'
                }
            ],

            loadStore: function(status){
                if(!status){
                    this.removeAll();
                    return;
                }

                if(!_.isArray(status)){
                    status = [status];
                }

                this.proxy.url =this.proxy._url.format(status.join(','));
                this.load();
            }
        }
    }

});