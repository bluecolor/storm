Ext.define('App.view.pool.column.StatusTagColumn', {

    extend  : 'Ext.grid.column.Column',
    xtype   : 'statustagcolumn',

    dataIndex   : 'status',

    sortable    : false,

    menuDisabled: true,

    menuText    : 'Status Tag',

    width       : 24,

    resizable   : false,

    renderer    : function(v, m, r) {
        v = v.toUpperCase();
        var tag = Constants.Icon.getIconClsByStatus(v);
        m.css=  m.css + ' '+tag+' ';
        m.tdAttr = 'data-qtip="' + v + '"';

        return '';
    }
});
