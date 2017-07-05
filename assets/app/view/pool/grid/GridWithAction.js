
Ext.define('App.view.pool.grid.GridWithAction', {
    extend  : 'Ext.grid.Panel',
    xtype   : 'gridwithaction',

    requires: [
        'Ext.grid.*'
        //'Ext.ux.grid.FiltersFeature'
    ],

    frame           : false,
    deferRowRender  : true,
    columnLines     : true,



    viewConfig: {
        loadingText :   "Loading...",
        markDirty   : false,
        /**
         * This is added for a quick workaround for the issue
         * EXTJSIV-12373 - Check if this is totally fixed in main
         * api releases.
         */
        mouseOverOutBuffer : false
    },


    listeners: {
        itemmouseenter: function(view, d, node, rowIndex, e) {

            var icons = Ext.DomQuery.select('.x-action-col-icon', node);

            _.chain(icons).filter(function(icon){
                var cls = icon.className;
                return cls.indexOf('static') == -1;
            }).each(function(icon){
                Ext.get(icon).removeCls('x-hidden');
            }).value();
        },
        itemmouseleave: function(view, t, node, rowIndex, e) {
            var icons = Ext.DomQuery.select('.x-action-col-icon', node);
            _.chain(icons).filter(function (icon) {
                var cls = icon.className;
                return cls.indexOf('static') == -1;
            }).each(function (icon) {
                Ext.get(icon).addCls('x-hidden');
            }).value();
        },
        afterrender:function( me, eOpts ) {
            me.getView().loadMask=true;
        }

    }

});