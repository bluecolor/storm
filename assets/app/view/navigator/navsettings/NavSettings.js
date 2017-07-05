Ext.define('App.view.navigator.navsettings.NavSettings',{
    extend  : 'Ext.tree.Panel',
    xtype   : 'navsettings',

    requires: [
        'App.view.navigator.navsettings.NavSettingsController',
        'App.view.navigator.navsettings.NavSettingsModel'
    ],

    rootVisible : false,
    iconCls     : 'settings',

    columnLines : false,
    rowLines    : false,
    border      : false,
    hideHeaders : true,

    controller  : 'navsettings',
    viewModel   : 'navsettings',
    bind : {
        store : '{list}'
    },

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
            text      : 'Name',
            name      : 'name',
            dataIndex : 'name',
            flex      : 1,
            renderer  : function(v, m){
                m.style = "font-weight:bolder;";
                return v;
            }
        }
    ],

    listeners : {
        cellclick : 'onNavSettingSelection'
    }

});
