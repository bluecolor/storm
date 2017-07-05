Ext.define('App.view.pool.column.ClickableStatusTagColumn', {
    extend : 'App.view.pool.column.StatusTagColumn',
    xtype  : 'clickablestatustagcolumn',


    renderer    : function(v, m) {
        var tag = Icon.getIconClsByStatus(v);
        m.css   = '{0} {1} {2}'.format(m.css,tag,'tag-task-status');
        m.tdAttr= 'data-qtip="{0}"'.format(v);
    }

});
