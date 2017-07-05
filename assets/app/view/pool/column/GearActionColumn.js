
Ext.define('App.view.pool.column.GearActionColumn', {

    extend  : 'Ext.grid.column.Action',
    xtype   : 'gearactioncolumn',

    name        : 'gearActionColumn',

    resizable   : false,

    iconCls     : 'x-hidden',
    menuDisabled: true,
    menuText    : 'Action',
    cls         : 'grid-icon-column-header grid-action-column-header',

    width       : 24,
    sortable    : false,
    icon        : 'resources/img/gear-16.png',

    handler : function(g, ri, ci,i,e, r) {
        this.fireEvent('actionclick',g,ri,e,r);
    }

});
