Ext.define('App.view.navigator.navreports.NavReports',{
    extend  : 'Ext.tree.Panel',
    xtype   : 'navreports',

    requires: [
        'App.view.navigator.navreports.NavReportsModel',
        'App.view.navigator.navreports.NavReportsController'
    ],

    viewModel : 'navreports',
    controller: 'navreports',
    bind : {
        store : '{list}'
    },

    rootVisible : false,
    iconCls     : 'pulse',

    columnLines : false,
    rowLines    : false,
    border      : false,
    hideHeaders : true,

    columns : [
        {
            text     : 'Icon',
            name     : 'icon',
            width    : 36,
            renderer : function(v, m, r){
                return '<img src="{0}">'.format( r.get('img') );
            }
        },
        {
            text: 'Name',
            name: 'name',
            dataIndex: 'name',
            flex: 1,
            renderer: function (v, m) {
                m.style = "font-weight:bolder;";
                return v;
            }
        }
    ],

    listeners : {
        cellclick : function(g, td, c, r, tr, ri, e, eo){
            this.lookupController().onNavReportSelection(r.get('val'));
        }
    }

});
