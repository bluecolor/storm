Ext.define('App.view.widget.PagingBar',{
    extend: 'Ext.toolbar.Toolbar',
    xtype : 'pagingbar',

    dock  : 'bottom',
    
    items : [
        {
            disabled    : true,
            reference   : 'PreviousButton',
            name        : 'previous',
            iconCls     : 'previous',
            tooltip     : 'Previous Page',
            handler     : 'onPreviousPage'
        },'-',
        {
            xtype       : 'displayfield',
            value       : 'Page'
        },
        {
            xtype       : 'numberfield',
            minValue    : 1
        },'-',
        {
            disabled    : true,
            reference   : 'NextButton',
            name        : 'next',
            iconCls     : 'next',
            tooltip     : 'Next Page',
            handler     : 'onNextPage'
        }
    ]


});